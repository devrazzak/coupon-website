import { MetadataRoute } from 'next';

import { locales } from '@/i18n';
import { getPublicStores } from '@/utils/api/store';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://savewise.example';

    const routes = ['', '/about', '/stores'];

    const sitemapEntries: MetadataRoute.Sitemap = [];

    for (const route of routes) {
        for (const locale of locales) {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}${route}`,
                lastModified: new Date(),
                changeFrequency: route === '' ? 'daily' : 'weekly',
                priority: route === '' ? 1.0 : 0.8,
                alternates: {
                    languages: Object.fromEntries(
                        locales.map(loc => [loc, `${baseUrl}/${loc}${route}`]),
                    ),
                },
            });
        }
    }

    try {
        const response = await getPublicStores({ page: 1, limit: 500 });
        const stores = response?.data?.data ?? [];

        for (const store of stores) {
            for (const locale of locales) {
                sitemapEntries.push({
                    url: `${baseUrl}/${locale}/stores/${store.slug}`,
                    lastModified: new Date(),
                    changeFrequency: 'weekly',
                    priority: 0.7,
                });
            }
        }
    } catch {
        // Keep the static sitemap available when the public API is unavailable.
    }

    return sitemapEntries;
}
