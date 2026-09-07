import Link from 'next/link';

import { BadgeCheck, ShieldCheck, Target, TrendingUp } from 'lucide-react';
import type { Metadata } from 'next';

import { PageHeader, PublicPageShell } from '@/components/public/page-layout';
import siteConfig from '@/utils/SiteConfig';

export const metadata: Metadata = {
    title: 'About Coupola | Find Coupons and Store Deals',
    description:
        'Learn how Coupola helps shoppers find coupons, compare store offers, and make informed savings decisions without automatic code application.',
    alternates: {
        canonical: '/about',
    },
    openGraph: {
        title: 'About Coupola | Find Coupons and Store Deals',
        description:
            'Learn how Coupola helps shoppers find coupons, compare store offers, and make informed savings decisions without automatic code application.',
        url: '/about',
        siteName: siteConfig.company_name,
        type: 'website',
        images: [
            {
                url: '/images/Coupola-logo-social.png',
                alt: `${siteConfig.company_name} Logo`,
            },
        ],
    },
    robots: {
        index: true,
        follow: true,
    },
};

const trustPoints = [
    {
        title: 'Offers worth checking',
        description:
            'We collect current offers and show the important details, so you can decide which ones are worth trying.',
        icon: BadgeCheck,
    },
    {
        title: 'Easy to compare',
        description:
            'Compare stores, categories, and discount types in one place instead of searching across several sites.',
        icon: TrendingUp,
    },
    {
        title: 'You stay in control',
        description:
            'Find an offer here, then use it on the store&apos;s website. We never apply codes or complete a purchase for you.',
        icon: ShieldCheck,
    },
];

export default function AboutPage() {
    return (
        <PublicPageShell>
            <PageHeader
                eyebrow={`About ${siteConfig.company_name}`}
                title="A simpler way to find a good deal"
                description={`${siteConfig.company_name} brings coupons and store offers together so you can spend less time searching and more time deciding what works for you.`}
            />

            <section className="container-page py-8 md:py-10">
                <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                    <div className="rounded-xl border border-border bg-card p-6 shadow-soft md:p-8">
                        <h2 className="font-display text-[28px] font-semibold tracking-tight text-foreground">
                            What you&apos;ll find here
                        </h2>
                        <p className="mt-4 text-[15px] leading-8 text-muted-foreground">
                            {`${siteConfig.company_name} is a place to look for coupons, promo codes, and store deals before you shop. We organise offers by store and category, making it easier to find something relevant to what you are buying.`}
                        </p>
                        <p className="mt-4 text-[15px] leading-8 text-muted-foreground">
                            We know a coupon is only useful when it works for your order. That is
                            why we show the offer details we have and encourage you to check the
                            store&apos;s final terms before paying.
                        </p>
                    </div>

                    <div className="rounded-xl border border-border bg-surface p-6 shadow-soft md:p-8">
                        <div className="flex items-center gap-3">
                            <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-light text-primary">
                                <Target className="h-5 w-5" />
                            </span>
                            <h3 className="font-display text-[20px] font-semibold text-foreground">
                                Our goal
                            </h3>
                        </div>
                        <p className="mt-4 text-[14px] leading-7 text-muted-foreground">
                            Help you find useful savings without making the process complicated.
                        </p>
                    </div>
                </div>

                <div className="mt-10">
                    <h2 className="font-display text-[28px] font-semibold tracking-tight text-foreground">
                        How we can help
                    </h2>
                    <div className="mt-5 grid gap-4 md:grid-cols-3">
                        {trustPoints.map(({ title, description, icon: Icon }) => (
                            <div
                                key={title}
                                className="rounded-xl border border-border bg-card p-5 shadow-soft"
                            >
                                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-light text-primary">
                                    <Icon className="h-5 w-5" />
                                </span>
                                <h3 className="mt-4 font-display text-[20px] font-semibold text-foreground">
                                    {title}
                                </h3>
                                <p className="mt-2 text-[14px] leading-7 text-muted-foreground">
                                    {description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-10 grid gap-8 lg:grid-cols-2">
                    <div className="rounded-xl border border-border bg-card p-6 shadow-soft md:p-8">
                        <h2 className="font-display text-[28px] font-semibold tracking-tight text-foreground">
                            How coupons are verified
                        </h2>
                        <ul className="mt-4 list-disc space-y-3 pl-5 text-[14px] leading-7 text-muted-foreground">
                            <li>
                                We review offers and remove ones that are clearly expired when we
                                find them.
                            </li>
                            <li>
                                We include the available restrictions and expiry information so you
                                know what to check.
                            </li>
                            <li>
                                The store&apos;s checkout is the final source of truth. Check the
                                terms there before placing your order.
                            </li>
                        </ul>
                    </div>

                    <div className="rounded-xl border border-border bg-card p-6 shadow-soft md:p-8">
                        <h2 className="font-display text-[28px] font-semibold tracking-tight text-foreground">
                            How we support the site
                        </h2>
                        <p className="mt-4 text-[15px] leading-8 text-muted-foreground">
                            {`Some links on ${siteConfig.company_name} are affiliate links. If you visit a store through one of them and make a purchase, we may earn a commission at no extra cost to you. This helps us keep the site available for shoppers.`}
                        </p>
                    </div>
                </div>

                <div className="mt-10 rounded-xl border border-border bg-surface p-6 shadow-soft md:p-8">
                    <div className="flex items-start gap-3">
                        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-50 text-emerald-600">
                            <ShieldCheck className="h-5 w-5" />
                        </span>
                        <div>
                            <h2 className="font-display text-[28px] font-semibold tracking-tight text-foreground">
                                What we promise
                            </h2>
                            <p className="mt-3 text-[15px] leading-8 text-muted-foreground">
                                We will be clear about what an offer is, where it leads, and how we
                                support the site. We do not apply codes automatically or make a
                                purchase on your behalf. You choose the offer and complete the order
                                directly with the store.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-10 rounded-xl border border-primary/20 bg-primary-light p-6 text-center shadow-soft md:p-8">
                    <h2 className="font-display text-[28px] font-semibold tracking-tight text-foreground">
                        Looking for a deal?
                    </h2>
                    <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-8 text-muted-foreground">
                        Start with the stores and coupons you are interested in, then compare the
                        options before you shop.
                    </p>
                    <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                        <Link
                            href="/coupons"
                            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-[13px] font-bold text-primary-foreground hover:bg-primary-hover"
                        >
                            Explore coupons
                        </Link>
                        <Link
                            href="/stores"
                            className="inline-flex items-center justify-center rounded-full border border-border bg-background px-5 py-3 text-[13px] font-semibold text-foreground hover:bg-muted"
                        >
                            Browse stores
                        </Link>
                    </div>
                </div>
            </section>
        </PublicPageShell>
    );
}
