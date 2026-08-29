import { BlogSection } from '@/components/BlogSection';
import { Categories } from '@/components/Categories';
import { CouponSection } from '@/components/CouponSection';
import { HeroSection } from '@/components/HeroSection';
import { PopularStores } from '@/components/PopularStores';

const Home = () => {
    return (
        <div className="min-h-screen bg-background">
            <main>
                <HeroSection />
                <PopularStores />
                <CouponSection />
                <Categories />
                <BlogSection />
            </main>
        </div>
    );
};

export default Home;
