import type { Metadata } from 'next';

import StoresPageClient from './StoresPageClient';

export const metadata: Metadata = {
    title: 'Stores | Verified Coupons & Deals',
    description:
        'Discover popular online stores and find verified coupon codes, promo offers, and money-saving deals to help you shop smarter every day with Coupello.',
    alternates: {
        canonical: '/stores',
    },
    openGraph: {
        title: 'Stores | Verified Coupons & Deals',
        description:
            'Discover popular online stores and find verified coupon codes, promo offers, and money-saving deals to help you shop smarter every day with Coupello.',
        url: '/stores',
        siteName: 'Coupello',
        type: 'website',
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function StoresPage() {
    return <StoresPageClient />;
}
