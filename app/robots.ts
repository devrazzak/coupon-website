import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://savewise.example';

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/*/admin/', '/*/admin/*', '/*/user/', '/*/user/*'],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
