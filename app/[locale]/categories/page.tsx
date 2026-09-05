import type { Metadata } from 'next';

import CategoriesPageClient from './CategoriesPageClient';

export const metadata: Metadata = {
    title: 'Categories | Coupons, Promo Codes & Deals',
    description:
        'Browse shopping categories to discover verified coupons, promo codes, and money-saving deals on Coupello.',
    alternates: {
        canonical: '/categories',
    },
    openGraph: {
        title: 'Categories | Coupons, Promo Codes & Deals',
        description:
            'Browse shopping categories to discover verified coupons, promo codes, and money-saving deals on Coupello.',
        url: '/categories',
        siteName: 'Coupello',
        type: 'website',
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function CategoriesPage() {
    return <CategoriesPageClient />;
}
