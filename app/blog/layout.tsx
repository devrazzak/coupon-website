import type { Metadata } from 'next';

import siteConfig from '@/utils/SiteConfig';

export const metadata: Metadata = {
    title: 'Savings Guides & Tips | Coupons, Deals & Shopping Advice',
    description: `Read practical shopping guides, coupon tips, and money-saving advice to find better deals and shop smarter with ${siteConfig.company_name}.`,
    alternates: {
        canonical: '/blog',
    },
    openGraph: {
        title: 'Savings Guides & Tips | Coupons, Deals & Shopping Advice',
        description: `Read practical shopping guides, coupon tips, and money-saving advice to find better deals and shop smarter with ${siteConfig.company_name}.`,
        url: '/blog',
        siteName: siteConfig.company_name,
        type: 'website',
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return children;
}
