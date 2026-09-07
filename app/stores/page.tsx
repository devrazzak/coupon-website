import type { Metadata } from 'next';

import siteConfig from '@/utils/SiteConfig';

import StoresPageClient from './StoresPageClient';

export const metadata: Metadata = {
    title: 'Stores | Verified Coupons & Deals',
    description: `Discover popular online stores and find verified coupon codes, promo offers, and money-saving deals to help you shop smarter every day with ${siteConfig.company_name}.`,
    alternates: {
        canonical: '/stores',
    },
    openGraph: {
        title: 'Stores | Verified Coupons & Deals',
        description: `Discover popular online stores and find verified coupon codes, promo offers, and money-saving deals to help you shop smarter every day with ${siteConfig.company_name}.`,
        url: '/stores',
        siteName: siteConfig.company_name,
        type: 'website',
        images: [
            {
                url: '/images/Coupola-logo-social.png',
                alt: `${siteConfig.company_name} Logo`,
            },
        ],
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function StoresPage() {
    return <StoresPageClient />;
}
