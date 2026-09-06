import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://coupola.com/'.replace(/\/$/, '');

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
