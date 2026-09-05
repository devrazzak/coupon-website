import type { Metadata } from 'next';

import { StoreDetailClient } from '@/components/public/StoreDetailClient';
import { PublicPageShell } from '@/components/public/page-layout';
import { type PublicStore, getPublicStoreBySlug, getPublicStores } from '@/utils/api/store';

type ResolvedStore = Pick<PublicStore, 'name' | 'slug'> &
    Partial<
        Pick<
            PublicStore,
            | 'id'
            | 'logo'
            | 'seo_title'
            | 'short_description'
            | 'description'
            | 'how_to_use'
            | 'category'
            | 'categories'
            | 'meta_description'
        >
    >;

async function resolveStore(slug: string, queryStoreId?: string | null): Promise<ResolvedStore> {
    try {
        const detailResponse = await getPublicStoreBySlug(slug);
        if (detailResponse?.data?.data) {
            return detailResponse.data.data;
        }
    } catch {
        /* fall back to the public store list */
    }

    try {
        const res = await getPublicStores({ search: '', page: 1, limit: 500 });
        const store = res?.data?.data?.find(item => item.slug === slug);
        if (store) {
            return store;
        }
    } catch {
        /* fall through */
    }

    // Keep the explicit id available when the public store lookup fails.
    if (queryStoreId && !Number.isNaN(Number(queryStoreId))) {
        return { id: Number(queryStoreId), name: slug, slug };
    }

    return { id: undefined, name: slug, slug };
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { slug } = await params;
    const store = await resolveStore(slug);

    const title = store.seo_title || `${store.name} Coupons & Deals | Coupello`;
    const description =
        store.meta_description ||
        `Browse verified coupon codes, promo offers, and the latest deals for ${store.name}.`;

    return {
        title,
        description,
        alternates: {
            canonical: `/stores/${slug}`,
        },
        openGraph: {
            title,
            description,
            url: `/stores/${slug}`,
            siteName: 'Coupello',
            type: 'website',
        },
        robots: {
            index: true,
            follow: true,
        },
    } satisfies Metadata;
}

export default async function StoreDetailPage({
    params,
    searchParams,
}: {
    params: Promise<{ locale: string; slug: string }>;
    searchParams: Promise<{ store_id?: string | null }>;
}) {
    const [{ slug }, sp] = await Promise.all([params, searchParams]);
    const store = await resolveStore(slug, sp.store_id);

    return (
        <PublicPageShell>
            <StoreDetailClient
                storeId={store.id}
                storeName={store.name}
                storeDescription={store.short_description}
                storeFullDescription={store.description}
                storeHowToUse={store.how_to_use}
                storeCategories={store.categories || (store.category ? [store.category] : [])}
            />
        </PublicPageShell>
    );
}
