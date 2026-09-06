import type { Metadata } from 'next';

import { BlogSection } from '@/components/BlogSection';
import { Categories } from '@/components/Categories';
import { CouponSection } from '@/components/CouponSection';
import { HeroSection } from '@/components/HeroSection';
import { PopularStores } from '@/components/PopularStores';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import siteConfig from '@/utils/SiteConfig';

export const metadata: Metadata = {
    title: `${siteConfig.company_name} - Verified Promo Codes, Coupons & Deals`,
    description: `Discover working coupon codes, promo offers, and money-saving tips to help you pay less at your favorite online stores.`,
    keywords: [
        'coupons',
        'promo codes',
        'discount codes',
        'cashback deals',
        'verified coupons',
        'online shopping discounts',
        'free promo codes',
        'store vouchers',
    ],
    openGraph: {
        title: `${siteConfig.company_name} - Verified Promo Codes, Coupons & Deals`,
        description: `Discover working coupon codes, promo offers, and money-saving tips to help you pay less at your favorite online stores.`,
        url: '/',
        siteName: siteConfig.company_name,
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: `${siteConfig.company_name} - Verified Promo Codes, Coupons & Deals`,
        description: `Discover working coupon codes, promo offers, and money-saving tips to help you pay less at your favorite online stores.`,
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function Home() {
    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
            <Header />
            <main>
                <HeroSection />
                <PopularStores />
                <CouponSection />
                <Categories />
                <BlogSection />
            </main>
            <Footer />
        </div>
    );
}
