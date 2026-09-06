import { MetadataRoute } from 'next';

import siteConfig from '@/utils/SiteConfig';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = siteConfig.site_url;

    if (!baseUrl) {
        throw new Error('NEXT_PUBLIC_SITE_URL must be configured to generate robots.txt.');
    }

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/admin/',
                    '/admin/*',
                    '/user/',
                    '/user/*',
                    '/auth/',
                    '/auth/*',
                    '/register',
                ],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
