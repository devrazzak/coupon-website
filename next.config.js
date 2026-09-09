/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        optimizePackageImports: ['lucide-react', '@tanstack/react-query', 'clsx', 'tailwind-merge'],
    },
    compiler: {
        removeConsole:
            process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
    },
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'logo.clearbit.com',
            },
        ],
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin',
                    },
                    {
                        key: 'Permissions-Policy',
                        value: 'camera=(), microphone=(), geolocation=()',
                    },
                ],
            },
            // Document (HTML) and RSC payload responses must never be held by the
            // hosting/CDN cache for a long TTL. Without this, a stale homepage keeps
            // being served after every deploy (404s on removed routes, old layout).
            // We scope to text/html + RSC flight requests so hashed static assets
            // (_next/static/*) still stay cached forever.
            {
                source: '/:path*',
                has: [
                    {
                        type: 'header',
                        key: 'accept',
                        value: '.*(text/html|application/rsc\\+json).*',
                    },
                ],
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, no-cache, must-revalidate',
                    },
                ],
            },
        ];
    },
};

module.exports = nextConfig;
