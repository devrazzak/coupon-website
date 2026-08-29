import { useTranslations } from 'next-intl';

import { BlogSection } from '@/components/BlogSection';
import { Categories } from '@/components/Categories';
import { CouponSection } from '@/components/CouponSection';
import { HeroSection } from '@/components/HeroSection';
import { PopularStores } from '@/components/PopularStores';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

export default function Home() {
    const t = useTranslations('LandingPage');

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
            <Header />
            <HeroSection />
            <PopularStores />
            <CouponSection />
            <Categories />
            <BlogSection />
            <Footer />
        </div>
    );
}
