import Image from 'next/image';
import Link from 'next/link';

import { ArrowRight, BadgeCheck, ExternalLink, MapPin, ShieldCheck, Store } from 'lucide-react';

import {
    Breadcrumbs,
    CouponCard,
    PublicPageShell,
    StatCard,
} from '@/components/public/page-layout';
import { coupons, stores } from '@/utils/public-content';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { slug } = await params;
    const store = stores.find(item => item.slug === slug) ?? stores[0];

    return {
        title: `${store.name} Coupons & Deals | Coupello`,
        description: store.description,
        alternates: {
            canonical: `/shops/${slug}`,
        },
    };
}

export default async function StoreDetailPage({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { slug } = await params;
    const store = stores.find(item => item.slug === slug) ?? stores[0];
    const storeCoupons = coupons.filter(coupon => coupon.store === store.name);

    return (
        <PublicPageShell>
            <section className="container-page py-8 md:py-10">
                <Breadcrumbs
                    items={[
                        { label: 'Home', href: '/' },
                        { label: 'Stores', href: '/shops' },
                        { label: store.name },
                    ]}
                />

                <div className="rounded-3xl border border-border bg-card p-6 shadow-soft md:p-8">
                    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border border-border bg-surface p-3">
                                <Image
                                    src={`https://logo.clearbit.com/${store.domain}`}
                                    alt={`${store.name} logo`}
                                    width={100}
                                    height={100}
                                    className="max-h-12 max-w-[100px] object-contain"
                                />
                            </div>
                            <div>
                                <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                                    Store
                                </p>
                                <h1 className="mt-1 font-display text-[30px] font-extrabold text-foreground md:text-[36px]">
                                    {store.name}
                                </h1>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 sm:flex-row">
                            <a
                                href={`https://www.${store.domain}`}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-[13px] font-bold text-primary-foreground hover:bg-primary-hover"
                            >
                                Visit Store
                                <ExternalLink className="h-4 w-4" />
                            </a>
                            <Link
                                href="/shops"
                                className="inline-flex items-center justify-center rounded-full border border-border bg-background px-4 py-2.5 text-[13px] font-semibold text-foreground hover:bg-muted"
                            >
                                View all stores
                            </Link>
                        </div>
                    </div>

                    <div className="mt-6 grid gap-4 md:grid-cols-3">
                        <StatCard value={`${store.couponCount}`} label="Live offers" />
                        <StatCard value="Verified" label="Coupon quality" />
                        <StatCard value="Fresh" label="Updated this week" />
                    </div>

                    <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                        <div>
                            <h2 className="font-display text-[22px] font-bold text-foreground">
                                About {store.name}
                            </h2>
                            <p className="mt-3 text-[14px] leading-7 text-muted-foreground">
                                {store.description}
                            </p>
                            <div className="mt-5 flex flex-wrap items-center gap-2 text-[12px] text-muted-foreground">
                                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-700">
                                    <BadgeCheck className="h-3.5 w-3.5" />
                                    Verified deals
                                </span>
                                <span className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-2.5 py-1">
                                    <Store className="h-3.5 w-3.5" />
                                    {store.category}
                                </span>
                                <span className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-2.5 py-1">
                                    <MapPin className="h-3.5 w-3.5" />
                                    Online retailer
                                </span>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-border bg-surface p-4">
                            <h3 className="font-display text-[18px] font-bold text-foreground">
                                Store highlights
                            </h3>
                            <ul className="mt-4 space-y-3 text-[13px] text-muted-foreground">
                                <li className="flex items-start gap-2">
                                    <ShieldCheck className="mt-0.5 h-4 w-4 text-emerald-600" /> Live
                                    discount verification and fresh tracking
                                </li>
                                <li className="flex items-start gap-2">
                                    <ShieldCheck className="mt-0.5 h-4 w-4 text-emerald-600" />{' '}
                                    Swipe-ready deals for fashion, beauty, tech and travel
                                </li>
                                <li className="flex items-start gap-2">
                                    <ShieldCheck className="mt-0.5 h-4 w-4 text-emerald-600" />{' '}
                                    Transparent terms so you know exactly what’s eligible
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-10">
                    <div className="mb-5 flex items-center justify-between gap-3">
                        <h2 className="font-display text-[28px] font-extrabold tracking-tight text-foreground">
                            Available coupons & deals
                        </h2>
                        <span className="text-[13px] font-semibold text-muted-foreground">
                            {storeCoupons.length} active offers
                        </span>
                    </div>

                    <div className="grid gap-4 lg:grid-cols-2">
                        {storeCoupons.map(coupon => (
                            <CouponCard key={coupon.slug} item={coupon} />
                        ))}
                    </div>
                </div>

                <div className="mt-10 rounded-3xl border border-border bg-surface/50 p-5">
                    <div className="flex items-center justify-between gap-3">
                        <h2 className="font-display text-[26px] font-extrabold text-foreground">
                            Popular offers
                        </h2>
                        <Link
                            href="/coupons"
                            className="inline-flex items-center gap-1 text-[13px] font-semibold text-primary hover:text-primary-hover"
                        >
                            See more <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                    </div>
                    <div className="mt-5 grid gap-4 lg:grid-cols-3">
                        {coupons.slice(0, 3).map(coupon => (
                            <CouponCard key={coupon.slug} item={coupon} />
                        ))}
                    </div>
                </div>
            </section>
        </PublicPageShell>
    );
}
