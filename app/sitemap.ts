import { MetadataRoute } from 'next';

import siteConfig from '@/utils/SiteConfig';
import { getPublicBlogs } from '@/utils/api/blog';
import { getPublicCategories } from '@/utils/api/category';
import { getPublicStores } from '@/utils/api/store';

const PAGE_SIZE = 500;

async function getAllStores() {
    const items = [];
    let page = 1;

    while (true) {
        const response = await getPublicStores({ page, limit: PAGE_SIZE });
        const data = response?.data?.data ?? [];
        const meta = response?.data?.meta;
        items.push(...data);

        if (!meta || data.length === 0 || page * PAGE_SIZE >= meta.totalCount) break;
        page += 1;
    }

    return items;
}

async function getAllCategories() {
    const items = [];
    let page = 1;

    while (true) {
        const response = await getPublicCategories(page, PAGE_SIZE);
        const data = response?.data?.data ?? [];
        const meta = response?.data?.meta;
        items.push(...data);

        if (!meta || data.length === 0 || page * PAGE_SIZE >= meta.totalCount) break;
        page += 1;
    }

    return items;
}

async function getAllBlogs() {
    const items = [];
    let page = 1;

    while (true) {
        const response = await getPublicBlogs({ page, limit: PAGE_SIZE });
        const data = response?.data?.data ?? [];
        const meta = response?.data?.meta;
        items.push(...data);

        if (!meta || data.length === 0 || page * PAGE_SIZE >= (meta.totalCount || 0)) break;
        page += 1;
    }

    return items;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = siteConfig.site_url;

    if (!baseUrl) {
        throw new Error('NEXT_PUBLIC_SITE_URL must be configured to generate the sitemap.');
    }

    const routes = [
        '',
        '/about',
        '/stores',
        '/categories',
        '/coupons',
        '/blog',
        '/contact',
        '/faqs',
        '/how-it-works',
        '/privacy-policy',
        '/terms-and-conditions',
        '/affiliate-disclosure',
        '/cookie-policy',
    ];

    const sitemapEntries: MetadataRoute.Sitemap = routes.map(route => ({
        url: `${baseUrl}${route || '/'}`,
        changeFrequency: route === '' ? 'daily' : 'weekly',
        priority: route === '' ? 1.0 : 0.8,
    }));

    try {
        const [stores, categories, blogs] = await Promise.all([
            getAllStores(),
            getAllCategories(),
            getAllBlogs(),
        ]);

        sitemapEntries.push(
            ...stores.map(store => ({
                url: `${baseUrl}/stores/${store.slug}`,
                changeFrequency: 'weekly' as const,
                priority: 0.7,
            })),
            ...categories.map(category => ({
                url: `${baseUrl}/categories/${category.slug}`,
                changeFrequency: 'weekly' as const,
                priority: 0.7,
            })),
            ...blogs.map(blog => ({
                url: `${baseUrl}/blog/${blog.slug}`,
                changeFrequency: 'monthly' as const,
                priority: 0.6,
            })),
        );
    } catch {
        // Keep the static sitemap available when the public API is unavailable.
    }

    return sitemapEntries;
}
