import type { Metadata } from 'next';

import siteConfig from '@/utils/SiteConfig';

import CouponsPageClient from './CouponsPageClient';

export const metadata: Metadata = {
    title: 'Top Coupons & Promo Codes | Verified Deals',
    description: `Find verified coupon codes, promo offers, and money-saving deals from popular online stores. Browse, compare, and save more with ${siteConfig.company_name}.`,
    alternates: {
        canonical: '/coupons',
    },
    openGraph: {
        title: 'Top Coupons & Promo Codes | Verified Deals',
        description: `Find verified coupon codes, promo offers, and money-saving deals from popular online stores. Browse, compare, and save more with ${siteConfig.company_name}.`,
        url: '/coupons',
        siteName: siteConfig.company_name,
        type: 'website',
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function CouponsPage() {
    return <CouponsPageClient />;
}
