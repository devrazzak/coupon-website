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
import type { Metadata } from 'next';

import { PageHeader, PublicPageShell } from '@/components/public/page-layout';
import siteConfig from '@/utils/SiteConfig';

export const metadata: Metadata = {
    title: 'How Coupola Works | Find and Use Coupons',
    description:
        'See how Coupola helps you find store deals, compare coupon offers, copy a code, and redeem it yourself at checkout.',
    alternates: {
        canonical: '/how-it-works',
    },
    openGraph: {
        title: 'How Coupola Works | Find and Use Coupons',
        description:
            'See how Coupola helps you find store deals, compare coupon offers, copy a code, and redeem it yourself at checkout.',
        url: '/how-it-works',
        siteName: siteConfig.company_name,
        type: 'website',
    },
    robots: {
        index: true,
        follow: true,
    },
};

const steps = [
    {
        title: 'Start with a store or category',
        description:
            'Search for a retailer you already use, or browse categories to find offers for your next purchase.',
        icon: Store,
    },
    {
        title: 'Compare the available offers',
        description:
            'Read the discount, expiry date, and any visible conditions before choosing an offer.',
        icon: Search,
    },
    {
        title: 'Pick the offer that fits',
        description:
            'Choose the code or deal that best matches your items and the store rules for your order.',
        icon: ShoppingBag,
    },
    {
        title: 'Reveal or copy the code',
        description:
            'Use the button to reveal a code when needed, then copy it so it is ready at checkout.',
        icon: Copy,
    },
    {
        title: 'Open the store',
        description:
            'Follow the offer link and complete your shopping on the retailer&apos;s own website.',
        icon: ArrowRight,
    },
    {
        title: 'Apply it at checkout',
        description:
            'Paste the code in the store&apos;s coupon field and check that the discount appears before paying.',
        icon: CircleCheckBig,
    },
];

export default function HowItWorksPage() {
    return (
        <PublicPageShell>
            <PageHeader
                eyebrow="How it works"
                title="Coupon discovery that keeps things simple"
                description={`${siteConfig.company_name} helps shoppers discover verified codes, compare deals and redeem savings on the merchant website. It does not auto-apply coupons or use browser automation.`}
            />

            <section className="container-page py-8 md:py-10">
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {steps.map(({ title, description, icon: Icon }, index) => (
                        <div
                            key={title}
                            className="relative rounded-xl border border-border bg-card p-5 shadow-soft"
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

                <div className="mt-10 rounded-xl border border-border bg-surface p-6 shadow-soft md:p-8">
                    <div className="flex items-start gap-3">
                        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-50 text-emerald-600">
                            <BadgeCheck className="h-5 w-5" />
                        </span>
                        <div>
                            <h2 className="font-display text-[28px] font-semibold tracking-tight text-foreground">
                                A quick note before you shop
                            </h2>
                            <p className="mt-3 text-[15px] leading-8 text-muted-foreground">
                                {`${siteConfig.company_name} helps you find and compare offers, but it does not apply codes automatically or complete purchases for you. You stay in control: reveal or copy the code here, then use it yourself on the store's website.`}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-10 rounded-xl border border-primary/20 bg-primary-light p-6 text-center shadow-soft md:p-8">
                    <h2 className="font-display text-[28px] font-semibold tracking-tight text-foreground">
                        Ready to look for a deal?
                    </h2>
                    <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-8 text-muted-foreground">
                        Browse a store or category and see what offers are available before you
                        check out.
                    </p>
                    <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                        <Link
                            href="/coupons"
                            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-[13px] font-bold text-primary-foreground hover:bg-primary-hover"
                        >
                            Browse coupons
                        </Link>
                        <Link
                            href="/stores"
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
