import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import {
    Tag,
    Sparkles,
    ShieldCheck,
    Zap,
    ArrowRight,
    Percent,
    ArrowUpRight,
} from 'lucide-react';

export default function Home() {
    const t = useTranslations('LandingPage');

    const featuredDeals = [
        {
            id: 1,
            brand: 'TechStore',
            category: 'Electronics',
            discount: '25% OFF',
            code: 'TECH25',
            description: 'Save 25% on selected laptops and smart accessories.',
            expires: 'Valid until Sunday',
            bgGradient: 'from-blue-600 to-indigo-700',
        },
        {
            id: 2,
            brand: 'FashionHub',
            category: 'Apparel',
            discount: '$30 OFF',
            code: 'SUMMER30',
            description: 'Get $30 off on all summer collections over $100.',
            expires: '3 days left',
            bgGradient: 'from-emerald-600 to-teal-700',
        },
        {
            id: 3,
            brand: 'TravelGo',
            category: 'Travel & Hotels',
            discount: '15% CASHBACK',
            code: 'TRAVEL15',
            description: 'Exclusive cashback for flight & resort reservations.',
            expires: 'Limited offer',
            bgGradient: 'from-purple-600 to-pink-600',
        },
    ];

    return (
        <div className="min-h-screen bg-[#fcfbf7] text-[#18352b] selection:bg-[#d7ed65] selection:text-[#18352b]">
            <Header />

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-[#18352b] pt-32 pb-24 text-white lg:pt-40 lg:pb-32">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(215,237,101,0.15),transparent_50%)]" />
                <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
                    <div className="mx-auto max-w-3xl text-center">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-[#d7ed65] backdrop-blur-md">
                            <Sparkles className="h-3.5 w-3.5" />
                            <span>Save smarter every single day</span>
                        </div>
                        <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
                            {t('hero.title')}
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-[#d3dfd5] sm:text-xl">
                            {t('hero.subtitle')}
                        </p>
                        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                            <Link
                                href="/auth/login"
                                className="inline-flex items-center gap-2 rounded-xl bg-[#d7ed65] px-7 py-3.5 text-sm font-bold text-[#18352b] shadow-lg transition hover:bg-[#cbe254] hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2"
                            >
                                <span>{t('hero.cta')}</span>
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                            <Link
                                href="/about"
                                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Deals */}
            <section id="services" className="py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
                    <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-widest text-[#18352b]/60">
                                Top Verified Offers
                            </span>
                            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
                                Today&apos;s Featured Deals
                            </h2>
                        </div>
                        <Link
                            href="/auth/login"
                            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#18352b] hover:underline"
                        >
                            <span>View all coupons</span>
                            <ArrowUpRight className="h-4 w-4" />
                        </Link>
                    </div>

                    <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
                        {featuredDeals.map((deal) => (
                            <div
                                key={deal.id}
                                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                            >
                                <div>
                                    <div className="flex items-center justify-between">
                                        <span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-700">
                                            {deal.category}
                                        </span>
                                        <span className="text-xs font-medium text-gray-500">
                                            {deal.expires}
                                        </span>
                                    </div>
                                    <h3 className="mt-4 text-xl font-bold">
                                        {deal.brand}
                                    </h3>
                                    <div className="mt-2 text-3xl font-black text-emerald-600">
                                        {deal.discount}
                                    </div>
                                    <p className="mt-3 text-sm text-gray-600">
                                        {deal.description}
                                    </p>
                                </div>

                                <div className="mt-6 pt-4 border-t border-dashed border-gray-200">
                                    <div className="flex items-center justify-between rounded-xl bg-gray-50 p-2.5 border border-gray-200">
                                        <span className="font-mono text-sm font-bold tracking-wider text-gray-800">
                                            {deal.code}
                                        </span>
                                        <button
                                            type="button"
                                            className="rounded-lg bg-[#18352b] px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-[#234d3f]"
                                        >
                                            Copy Code
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us / Features */}
            <section className="bg-white py-20 border-y border-gray-100 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
                    <div className="mx-auto max-w-2xl text-center">
                        <span className="text-xs font-bold uppercase tracking-widest text-[#18352b]/60">
                            Why Savewise
                        </span>
                        <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
                            {t('features.title')}
                        </h2>
                    </div>

                    <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
                        <div className="rounded-2xl bg-[#fcfbf7] p-8 border border-gray-100">
                            <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#d7ed65] text-[#18352b]">
                                <Tag className="h-6 w-6" />
                            </div>
                            <h3 className="mt-6 text-xl font-bold">
                                {t('features.feature1.title')}
                            </h3>
                            <p className="mt-3 text-sm leading-6 text-gray-600">
                                {t('features.feature1.description')}
                            </p>
                        </div>

                        <div className="rounded-2xl bg-[#fcfbf7] p-8 border border-gray-100">
                            <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#d7ed65] text-[#18352b]">
                                <Zap className="h-6 w-6" />
                            </div>
                            <h3 className="mt-6 text-xl font-bold">
                                {t('features.feature2.title')}
                            </h3>
                            <p className="mt-3 text-sm leading-6 text-gray-600">
                                {t('features.feature2.description')}
                            </p>
                        </div>

                        <div className="rounded-2xl bg-[#fcfbf7] p-8 border border-gray-100">
                            <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#d7ed65] text-[#18352b]">
                                <ShieldCheck className="h-6 w-6" />
                            </div>
                            <h3 className="mt-6 text-xl font-bold">
                                {t('features.feature3.title')}
                            </h3>
                            <p className="mt-3 text-sm leading-6 text-gray-600">
                                {t('features.feature3.description')}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
                    <div className="rounded-3xl bg-[#18352b] p-8 sm:p-12 lg:p-16 text-white relative overflow-hidden">
                        <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-[#d7ed65]/10 blur-3xl" />
                        <div className="max-w-2xl">
                            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#d7ed65]">
                                <Percent className="h-3.5 w-3.5" />
                                <span>Our Mission</span>
                            </span>
                            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
                                {t('about.title')}
                            </h2>
                            <p className="mt-6 text-base leading-7 text-[#d3dfd5]">
                                {t('about.description')}
                            </p>
                            <div className="mt-8 flex gap-4">
                                <Link
                                    href="/auth/admin-login"
                                    className="rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#18352b] transition hover:bg-gray-100"
                                >
                                    Admin Dashboard
                                </Link>
                                <Link
                                    href="/auth/login"
                                    className="rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                                >
                                    Partner Portal
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section id="testimonials" className="py-16 text-center">
                <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
                    <h2 className="text-3xl font-black tracking-tight sm:text-4xl">
                        {t('cta.title')}
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl text-base text-gray-600">
                        {t('cta.subtitle')}
                    </p>
                    <div className="mt-8 flex justify-center">
                        <Link
                            href="/auth/login"
                            className="inline-flex items-center gap-2 rounded-xl bg-[#18352b] px-8 py-3.5 text-sm font-bold text-white shadow transition hover:bg-[#244c3e]"
                        >
                            <span>{t('cta.button')}</span>
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
