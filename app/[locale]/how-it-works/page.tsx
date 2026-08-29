import Link from 'next/link';

import {
    ArrowRight,
    BadgeCheck,
    CircleCheckBig,
    Copy,
    Search,
    ShoppingBag,
    Store,
} from 'lucide-react';

import { PageHeader, PublicPageShell } from '@/components/public/page-layout';

const steps = [
    {
        title: 'Find a store',
        description:
            'Discover your favorite retailer or browse categories across fashion, travel, beauty and home essentials.',
        icon: Store,
    },
    {
        title: 'Browse available coupons',
        description:
            'Compare live deals and review the terms so you know what qualifies before checkout.',
        icon: Search,
    },
    {
        title: 'Choose a coupon',
        description:
            'Select the best offer for your cart and confirm the discount type, validity and merchant rules.',
        icon: ShoppingBag,
    },
    {
        title: 'Reveal or copy the code',
        description:
            'Use our verified code reveal and copy flow to keep the offer ready before you buy.',
        icon: Copy,
    },
    {
        title: 'Visit the merchant',
        description:
            'Open the merchant through the provided link to complete your purchase on the retailer site.',
        icon: ArrowRight,
    },
    {
        title: 'Apply the code at checkout',
        description:
            'Paste the coupon during checkout to redeem the offer exactly as the merchant allows.',
        icon: CircleCheckBig,
    },
];

export default function HowItWorksPage() {
    return (
        <PublicPageShell>
            <PageHeader
                eyebrow="How it works"
                title="Coupon discovery that keeps things simple"
                description="Coupello helps shoppers discover verified codes, compare deals and redeem savings on the merchant website. It does not auto-apply coupons or use browser automation."
            />

            <section className="container-page py-8 md:py-10">
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {steps.map(({ title, description, icon: Icon }, index) => (
                        <div
                            key={title}
                            className="relative rounded-3xl border border-border bg-card p-5 shadow-soft"
                        >
                            <div className="flex items-center justify-between">
                                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-light text-primary">
                                    <Icon className="h-5 w-5" />
                                </span>
                                <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                                    0{index + 1}
                                </span>
                            </div>
                            <h2 className="mt-4 font-display text-[22px] font-bold text-foreground">
                                {title}
                            </h2>
                            <p className="mt-2 text-[14px] leading-7 text-muted-foreground">
                                {description}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-10 rounded-3xl border border-border bg-surface p-6 shadow-soft md:p-8">
                    <div className="flex items-start gap-3">
                        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-50 text-emerald-600">
                            <BadgeCheck className="h-5 w-5" />
                        </span>
                        <div>
                            <h2 className="font-display text-[28px] font-extrabold tracking-tight text-foreground">
                                Important note
                            </h2>
                            <p className="mt-3 text-[15px] leading-8 text-muted-foreground">
                                Coupello currently provides coupon discovery and verified promo
                                codes for shoppers. It does not automatically apply discounts, use
                                browser automation or install Chrome extensions. Users can browse
                                offers, reveal or copy a valid code and then complete the purchase
                                on the merchant website as intended.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-10 rounded-3xl border border-primary/20 bg-primary-light p-6 text-center shadow-soft md:p-8">
                    <h2 className="font-display text-[28px] font-extrabold tracking-tight text-foreground">
                        Start saving with a smarter approach
                    </h2>
                    <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-8 text-muted-foreground">
                        Explore fresh deals, compare verified offers and complete your purchase with
                        confidence on the retailer website.
                    </p>
                    <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                        <Link
                            href="/coupons"
                            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-[13px] font-bold text-primary-foreground hover:bg-primary-hover"
                        >
                            Browse coupons
                        </Link>
                        <Link
                            href="/shops"
                            className="inline-flex items-center justify-center rounded-full border border-border bg-background px-5 py-3 text-[13px] font-semibold text-foreground hover:bg-muted"
                        >
                            Find stores
                        </Link>
                    </div>
                </div>
            </section>
        </PublicPageShell>
    );
}
