import type { Metadata } from 'next';

import { BlogSection } from '@/components/BlogSection';
import { Categories } from '@/components/Categories';
import { CouponSection } from '@/components/CouponSection';
import { HeroSection } from '@/components/HeroSection';
import { PopularStores } from '@/components/PopularStores';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

export const metadata: Metadata = {
    title: 'Coupello - 250,000+ Verified Promo Codes, Coupons & Cash Back Deals',
    description:
        'Never pay full price. Coupello automatically finds, tests & applies verified coupon codes, promo codes, and discount deals across 50,000+ top online stores.',
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
        title: 'Coupello - 250,000+ Verified Promo Codes, Coupons & Cash Back Deals',
        description:
            'Never pay full price. Coupello automatically finds, tests & applies verified coupon codes, promo codes, and discount deals across 50,000+ top online stores.',
        url: '/',
        siteName: 'Coupello',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Coupello - 250,000+ Verified Promo Codes, Coupons & Cash Back Deals',
        description:
            'Never pay full price. Coupello automatically finds, tests & applies verified coupon codes, promo codes, and discount deals across 50,000+ top online stores.',
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
