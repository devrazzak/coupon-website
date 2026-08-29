import Link from 'next/link';

import { ArrowRight, BadgeCheck, Sparkles } from 'lucide-react';

import {
    Breadcrumbs,
    CouponCard,
    PublicPageShell,
    StatCard,
    StoreCard,
} from '@/components/public/page-layout';
import { categories, coupons, stores } from '@/utils/public-content';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { slug } = await params;
    const category = categories.find(item => item.slug === slug) ?? categories[0];

    return {
        title: `${category.name} Coupons & Deals | Coupello`,
        description: category.description,
        alternates: {
            canonical: `/categories/${slug}`,
        },
    };
}

export default async function CategoryDetailPage({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { slug } = await params;
    const category = categories.find(item => item.slug === slug) ?? categories[0];
    const categoryCoupons = coupons.filter(
        coupon => coupon.category === category.name || category.name === 'All Categories',
    );
    const relatedStores = stores.filter(store => store.category === category.name).slice(0, 3);

    return (
        <PublicPageShell>
            <section className="container-page py-8 md:py-10">
                <Breadcrumbs
                    items={[
                        { label: 'Home', href: '/' },
                        { label: 'Categories', href: '/categories' },
                        { label: category.name },
                    ]}
                />

                <div className="rounded-3xl border border-border bg-card p-6 shadow-soft md:p-8">
                    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-4">
                            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-primary-light text-primary">
                                <Sparkles className="h-8 w-8" />
                            </div>
                            <div>
                                <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                                    Category
                                </p>
                                <h1 className="mt-1 font-display text-[30px] font-extrabold text-foreground md:text-[36px]">
                                    {category.name}
                                </h1>
                            </div>
                        </div>
                        <Link
                            href="/coupons"
                            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-[13px] font-bold text-primary-foreground hover:bg-primary-hover"
                        >
                            View all {category.name.toLowerCase()} deals
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>

                    <div className="mt-6 grid gap-4 md:grid-cols-3">
                        <StatCard value={`${category.couponCount}+`} label="Available coupons" />
                        <StatCard value={`${relatedStores.length}`} label="Popular stores" />
                        <StatCard value="Live" label="Updated daily" />
                    </div>

                    <div className="mt-8">
                        <h2 className="font-display text-[22px] font-bold text-foreground">
                            Why shoppers love this category
                        </h2>
                        <p className="mt-3 max-w-3xl text-[14px] leading-7 text-muted-foreground">
                            {category.description}
                        </p>
                        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-2.5 py-1.5 text-[12px] font-semibold text-emerald-700">
                            <BadgeCheck className="h-4 w-4" />
                            Fresh coupons checked for current validity
                        </div>
                    </div>
                </div>

                <div className="mt-10">
                    <h2 className="mb-5 font-display text-[28px] font-extrabold tracking-tight text-foreground">
                        Available coupons
                    </h2>
                    <div className="grid gap-4 lg:grid-cols-2">
                        {categoryCoupons.map(coupon => (
                            <CouponCard key={coupon.slug} item={coupon} />
                        ))}
                    </div>
                </div>

                <div className="mt-10 rounded-3xl border border-border bg-surface/50 p-5">
                    <h2 className="font-display text-[26px] font-extrabold text-foreground">
                        Popular stores in this category
                    </h2>
                    <div className="mt-5 grid gap-4 md:grid-cols-3">
                        {relatedStores.map(store => (
                            <StoreCard key={store.slug} item={store} />
                        ))}
                    </div>
                </div>
            </section>
        </PublicPageShell>
    );
}
