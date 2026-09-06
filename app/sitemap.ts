import { MetadataRoute } from 'next';

import siteConfig from '@/utils/SiteConfig';
import { getPublicBlogs } from '@/utils/api/blog';
import { getPublicCategories } from '@/utils/api/category';
import { getPublicStores } from '@/utils/api/store';

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
        const [storesResponse, categoriesResponse, blogsResponse] = await Promise.all([
            getPublicStores({ page: 1, limit: 500 }),
            getPublicCategories(1, 500),
            getPublicBlogs({ page: 1, limit: 500 }),
        ]);

        const stores = storesResponse?.data?.data ?? [];
        const categories = categoriesResponse?.data?.data ?? [];
        const blogs = blogsResponse?.data?.data ?? [];

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
