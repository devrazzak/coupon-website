import Link from 'next/link';

import { BadgeCheck, ShieldCheck, Sparkles, Target, TrendingUp } from 'lucide-react';

import { PageHeader, PublicPageShell, StatCard } from '@/components/public/page-layout';

const trustPoints = [
    {
        title: 'Verified offers',
        description:
            'We highlight fresh, tested offers and clearly separate them from expired or low-confidence discounts.',
        icon: BadgeCheck,
    },
    {
        title: 'Smart saving',
        description:
            'Shoppers can compare categories, merchants and offer types without the clutter of aggressive sales tactics.',
        icon: TrendingUp,
    },
    {
        title: 'Clean discovery',
        description:
            'The process is simple: browse, compare, reveal the code, then visit the merchant and redeem it at checkout.',
        icon: Sparkles,
    },
];

export default function AboutPage() {
    return (
        <PublicPageShell>
            <PageHeader
                eyebrow="About Coupello"
                title="The smarter way to discover coupons"
                description="Coupello helps shoppers compare trusted deals, browse useful offers and save on everyday purchases without the noise of aggressive or confusing promotions."
            />

            <section className="container-page py-8 md:py-10">
                <div className="grid gap-4 md:grid-cols-3">
                    <StatCard value="12K+" label="Monthly savings checks" />
                    <StatCard value="4.8/5" label="User trust rating" />
                    <StatCard value="100%" label="No auto-apply" />
                </div>

                <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                    <div className="rounded-3xl border border-border bg-card p-6 shadow-soft md:p-8">
                        <h2 className="font-display text-[28px] font-extrabold tracking-tight text-foreground">
                            What is Coupello?
                        </h2>
                        <p className="mt-4 text-[15px] leading-8 text-muted-foreground">
                            Coupello is a deal discovery platform built for shoppers who want a
                            cleaner, more transparent way to find savings. We surface verified
                            offers from trusted merchants and make it easy to compare discount
                            types, categories and store-specific promotions.
                        </p>
                        <p className="mt-4 text-[15px] leading-8 text-muted-foreground">
                            Our mission is simple: help people save more without the friction,
                            confusion or misleading discount experiences that usually come with
                            online shopping.
                        </p>
                    </div>

                    <div className="rounded-3xl border border-border bg-surface p-6 shadow-soft md:p-8">
                        <div className="flex items-center gap-3">
                            <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-light text-primary">
                                <Target className="h-5 w-5" />
                            </span>
                            <h3 className="font-display text-[20px] font-bold text-foreground">
                                Mission
                            </h3>
                        </div>
                        <p className="mt-4 text-[14px] leading-7 text-muted-foreground">
                            To make coupon discovery more useful, more trustworthy and easier to
                            understand for real shoppers.
                        </p>
                    </div>
                </div>

                <div className="mt-10">
                    <h2 className="font-display text-[28px] font-extrabold tracking-tight text-foreground">
                        How Coupello helps shoppers
                    </h2>
                    <div className="mt-5 grid gap-4 md:grid-cols-3">
                        {trustPoints.map(({ title, description, icon: Icon }) => (
                            <div
                                key={title}
                                className="rounded-3xl border border-border bg-card p-5 shadow-soft"
                            >
                                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-light text-primary">
                                    <Icon className="h-5 w-5" />
                                </span>
                                <h3 className="mt-4 font-display text-[20px] font-bold text-foreground">
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
                    <div className="rounded-3xl border border-border bg-card p-6 shadow-soft md:p-8">
                        <h2 className="font-display text-[28px] font-extrabold tracking-tight text-foreground">
                            How coupons are verified
                        </h2>
                        <ul className="mt-4 list-disc space-y-3 pl-5 text-[14px] leading-7 text-muted-foreground">
                            <li>
                                Offers are checked against active merchant conditions and current
                                promotional policies.
                            </li>
                            <li>
                                We highlight codes that appear valid and clearly note exclusions or
                                expiration details.
                            </li>
                            <li>
                                Shoppers should always confirm the final offer terms on the merchant
                                site before purchase.
                            </li>
                        </ul>
                    </div>

                    <div className="rounded-3xl border border-border bg-card p-6 shadow-soft md:p-8">
                        <h2 className="font-display text-[28px] font-extrabold tracking-tight text-foreground">
                            How Coupello makes money
                        </h2>
                        <p className="mt-4 text-[15px] leading-8 text-muted-foreground">
                            Coupello may receive compensation from select merchant referrals and
                            affiliate relationships. This helps support the platform and keep the
                            service free for shoppers while preserving transparency around merchant
                            partnerships.
                        </p>
                    </div>
                </div>

                <div className="mt-10 rounded-3xl border border-border bg-surface p-6 shadow-soft md:p-8">
                    <div className="flex items-start gap-3">
                        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-50 text-emerald-600">
                            <ShieldCheck className="h-5 w-5" />
                        </span>
                        <div>
                            <h2 className="font-display text-[28px] font-extrabold tracking-tight text-foreground">
                                Why shoppers can trust Coupello
                            </h2>
                            <p className="mt-3 text-[15px] leading-8 text-muted-foreground">
                                We focus on clarity, verification and transparent disclosure. No
                                hidden auto-application, no fake urgency, and no confusing browser
                                automation. The platform is designed to help shoppers discover deals
                                responsibly and redeem them on the merchant website as intended.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-10 rounded-3xl border border-primary/20 bg-primary-light p-6 text-center shadow-soft md:p-8">
                    <h2 className="font-display text-[28px] font-extrabold tracking-tight text-foreground">
                        Ready to save smarter?
                    </h2>
                    <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-8 text-muted-foreground">
                        Browse the latest verified deals, explore the best stores and keep your
                        shopping strategy focused on real value.
                    </p>
                    <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                        <Link
                            href="/coupons"
                            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-[13px] font-bold text-primary-foreground hover:bg-primary-hover"
                        >
                            Explore coupons
                        </Link>
                        <Link
                            href="/shops"
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
