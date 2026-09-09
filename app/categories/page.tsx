import type { Metadata } from 'next';

import siteConfig from '@/utils/SiteConfig';

import CategoriesPageClient from './CategoriesPageClient';

export const metadata: Metadata = {
    title: 'Categories | Coupons, Promo Codes & Deals',
    description: `Browse shopping categories to discover verified coupons, promo codes, and money-saving deals on ${siteConfig.company_name}.`,
    alternates: {
        canonical: '/categories',
    },
    openGraph: {
        title: 'Categories | Coupons, Promo Codes & Deals',
        description: `Browse shopping categories to discover verified coupons, promo codes, and money-saving deals on ${siteConfig.company_name}.`,
        url: '/categories',
        siteName: siteConfig.company_name,
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
