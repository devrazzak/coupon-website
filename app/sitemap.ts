import { MetadataRoute } from 'next';

import { locales } from '@/i18n';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://savewise.example';

    const routes = ['', '/about'];

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

    return sitemapEntries;
}
