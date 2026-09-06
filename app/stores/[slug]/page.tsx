import { notFound } from 'next/navigation';

import type { Metadata } from 'next';

import { StoreDetailClient } from '@/components/public/StoreDetailClient';
import { PublicPageShell } from '@/components/public/page-layout';
import { JsonLd } from '@/components/seo/JsonLd';
import siteConfig from '@/utils/SiteConfig';
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

async function resolveStore(slug: string): Promise<ResolvedStore | null> {
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

    return null;
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { slug } = await params;
    const store = await resolveStore(slug);

    if (!store) {
        return {
            title: `Store coupons | ${siteConfig.company_name}`,
            robots: { index: false, follow: true },
        } satisfies Metadata;
    }

    const title = store.seo_title || `${store.name} Coupons & Deals | ${siteConfig.company_name}`;
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
            siteName: siteConfig.company_name,
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
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { slug } = await params;
    const store = await resolveStore(slug);

    if (!store) {
        notFound();
    }

    const pageUrl = `${siteConfig.site_url}/stores/${store.slug}`;
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.site_url },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Stores',
                item: `${siteConfig.site_url}/stores`,
            },
            { '@type': 'ListItem', position: 3, name: store.name, item: pageUrl },
        ],
    };

    return (
        <PublicPageShell>
            <JsonLd data={breadcrumbSchema} />
            <StoreDetailClient
                storeSlug={store.slug}
                storeName={store.name}
                storeDescription={store.short_description}
                storeFullDescription={store.description}
                storeHowToUse={store.how_to_use}
                storeCategories={store.categories || (store.category ? [store.category] : [])}
            />
        </PublicPageShell>
    );
}
