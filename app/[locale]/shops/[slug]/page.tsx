import { StoreDetailClient } from '@/components/public/StoreDetailClient';
import { PublicPageShell } from '@/components/public/page-layout';
import { getPublicStores } from '@/utils/api/store';

async function resolveStore(slug: string, queryStoreId?: string | null) {
    // Prefer the explicit id passed via query param (e.g. from Popular Stores).
    if (queryStoreId && !Number.isNaN(Number(queryStoreId))) {
        const id = Number(queryStoreId);
        return { id, name: slug, slug };
    }
    try {
        const res = await getPublicStores({ search: '', page: 1, limit: 500 });
        const store = res?.data?.data?.find(item => item.slug === slug);
        if (store) {
            return { id: store.id, name: store.name, slug: store.slug };
        }
    } catch {
        /* fall through */
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

    return {
        title: `${store.name} Coupons & Deals | Coupello`,
        description: `Browse the latest verified coupons and deals for ${store.name}.`,
        alternates: {
            canonical: `/shops/${slug}`,
        },
    };
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
            <StoreDetailClient storeId={store.id} storeName={store.name} />
        </PublicPageShell>
    );
}
