import Image from 'next/image';
import Link from 'next/link';

import { ArrowLeft, BadgeCheck, Clock3, Copy, ExternalLink, ShieldCheck } from 'lucide-react';

import { Breadcrumbs, CouponCard, PublicPageShell } from '@/components/public/page-layout';
import { coupons } from '@/utils/public-content';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { slug } = await params;
    const item = coupons.find(coupon => coupon.slug === slug) ?? coupons[0];

    return {
        title: `${item.title} | Coupello`,
        description: item.description,
        alternates: {
            canonical: `/coupons/${slug}`,
        },
    };
}

export default async function CouponDetailPage({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { slug } = await params;
    const item = coupons.find(coupon => coupon.slug === slug) ?? coupons[0];

    return (
        <PublicPageShell>
            <section className="container-page py-8 md:py-10">
                <Breadcrumbs
                    items={[
                        { label: 'Home', href: '/' },
                        { label: 'Coupons', href: '/coupons' },
                        { label: item.title },
                    ]}
                />

                <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                    <article className="rounded-3xl border border-border bg-card p-5 shadow-soft md:p-7">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="inline-flex rounded-full bg-primary-light px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-primary">
                                {item.discount}
                            </span>
                            {item.badge && (
                                <span className="inline-flex rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-amber-700">
                                    {item.badge}
                                </span>
                            )}
                        </div>

                        <div className="mt-5 flex items-center gap-3.5">
                            <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border border-border bg-surface p-2">
                                <Image
                                    src={`https://logo.clearbit.com/${item.domain}`}
                                    alt={`${item.store} logo`}
                                    width={72}
                                    height={72}
                                    className="max-h-9 max-w-[72px] object-contain"
                                />
                            </div>
                            <div>
                                <p className="text-[12.5px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                                    {item.store}
                                </p>
                                <h1 className="mt-1 font-display text-[28px] font-extrabold tracking-[-0.04em] text-foreground md:text-[34px]">
                                    {item.title}
                                </h1>
                            </div>
                        </div>

                        <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-[12px] text-muted-foreground">
                            <span className="inline-flex items-center gap-1 font-semibold text-emerald-600">
                                <BadgeCheck className="h-4 w-4" />
                                Verified code
                            </span>
                            <span className="text-border">•</span>
                            <span className="inline-flex items-center gap-1">
                                <Clock3 className="h-3.5 w-3.5" />
                                {item.expires}
                            </span>
                        </div>

                        <div className="mt-6 rounded-2xl border-2 border-dashed border-primary/40 bg-primary-light/80 p-4">
                            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
                                Promo code
                            </p>
                            <div className="mt-3 flex flex-col gap-3 rounded-2xl border border-primary/20 bg-card p-3 sm:flex-row sm:items-center sm:justify-between">
                                <span className="font-mono text-[25px] font-black tracking-[0.14em] text-foreground">
                                    {item.code}
                                </span>
                                <button
                                    type="button"
                                    className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-[13px] font-bold text-primary-foreground hover:bg-primary-hover"
                                >
                                    <Copy className="h-4 w-4" />
                                    Copy Code
                                </button>
                            </div>
                        </div>

                        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                            <a
                                href={`https://www.${item.domain}`}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-[14px] font-bold text-primary-foreground shadow-sm transition-all hover:bg-primary-hover"
                            >
                                Get Code
                                <ExternalLink className="h-4 w-4" />
                            </a>
                            <Link
                                href="/coupons"
                                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-[14px] font-semibold text-foreground transition-colors hover:bg-muted"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back to coupons
                            </Link>
                        </div>

                        <div className="mt-8 space-y-6 border-t border-border pt-6">
                            <section>
                                <h2 className="font-display text-[20px] font-bold text-foreground">
                                    Description
                                </h2>
                                <p className="mt-3 text-[14px] leading-7 text-muted-foreground">
                                    {item.description}
                                </p>
                            </section>

                            <section>
                                <h2 className="font-display text-[20px] font-bold text-foreground">
                                    Terms & conditions
                                </h2>
                                <ul className="mt-3 list-disc space-y-2 pl-5 text-[14px] leading-7 text-muted-foreground">
                                    <li>
                                        Valid on eligible products only and subject to the
                                        retailer’s published exclusions.
                                    </li>
                                    <li>
                                        Coupon must be applied at checkout before purchase
                                        completes.
                                    </li>
                                    <li>
                                        Offer may expire or change without notice as merchant terms
                                        are updated.
                                    </li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="font-display text-[20px] font-bold text-foreground">
                                    How to use
                                </h2>
                                <ol className="mt-3 list-decimal space-y-2 pl-5 text-[14px] leading-7 text-muted-foreground">
                                    <li>Copy the promo code above and visit the merchant store.</li>
                                    <li>Add your selected items to the basket.</li>
                                    <li>
                                        Paste the code into the checkout promo field to redeem your
                                        discount.
                                    </li>
                                </ol>
                            </section>

                            <section>
                                <h2 className="font-display text-[20px] font-bold text-foreground">
                                    Restrictions
                                </h2>
                                <p className="mt-3 text-[14px] leading-7 text-muted-foreground">
                                    This offer may not be combined with other discounts, select
                                    items may be excluded and some store-specific restrictions may
                                    apply. Always check the retailer’s stated conditions before
                                    purchasing.
                                </p>
                            </section>
                        </div>
                    </article>

                    <aside className="space-y-5">
                        <div className="rounded-3xl border border-border bg-card p-5 shadow-soft">
                            <div className="flex items-center justify-between gap-3">
                                <div>
                                    <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                                        Offer summary
                                    </p>
                                    <h2 className="mt-2 font-display text-[22px] font-bold text-foreground">
                                        {item.store}
                                    </h2>
                                </div>
                                <div className="rounded-full bg-emerald-50 p-2 text-emerald-600">
                                    <ShieldCheck className="h-5 w-5" />
                                </div>
                            </div>

                            <dl className="mt-5 space-y-3 text-[13px] text-muted-foreground">
                                <div className="flex items-center justify-between gap-3 border-b border-border pb-2">
                                    <dt>Coupon type</dt>
                                    <dd className="font-semibold text-foreground">{item.type}</dd>
                                </div>
                                <div className="flex items-center justify-between gap-3 border-b border-border pb-2">
                                    <dt>Expiration</dt>
                                    <dd className="font-semibold text-foreground">
                                        {item.expires}
                                    </dd>
                                </div>
                                <div className="flex items-center justify-between gap-3 border-b border-border pb-2">
                                    <dt>Category</dt>
                                    <dd className="font-semibold text-foreground">
                                        {item.category}
                                    </dd>
                                </div>
                                <div className="flex items-center justify-between gap-3">
                                    <dt>Store link</dt>
                                    <dd className="font-semibold text-primary">{item.domain}</dd>
                                </div>
                            </dl>
                        </div>

                        <div className="rounded-3xl border border-border bg-card p-5 shadow-soft">
                            <h3 className="font-display text-[22px] font-bold text-foreground">
                                FAQ
                            </h3>
                            <div className="mt-4 space-y-4">
                                <div>
                                    <p className="font-semibold text-foreground">
                                        Is this code still valid?
                                    </p>
                                    <p className="mt-1 text-[13px] leading-6 text-muted-foreground">
                                        Coupello verifies live offers and updates them when stores
                                        change or remove terms, but each retailer sets its own valid
                                        dates.
                                    </p>
                                </div>
                                <div>
                                    <p className="font-semibold text-foreground">
                                        Does Coupello auto-apply codes?
                                    </p>
                                    <p className="mt-1 text-[13px] leading-6 text-muted-foreground">
                                        No. The platform helps shoppers discover and copy codes; the
                                        final redemption happens at checkout on the merchant site.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>

                <div className="mt-10">
                    <div className="mb-5 flex items-center justify-between gap-4">
                        <h2 className="font-display text-[28px] font-extrabold tracking-tight text-foreground">
                            Related coupons
                        </h2>
                        <Link
                            href="/coupons"
                            className="text-[13px] font-semibold text-primary hover:text-primary-hover"
                        >
                            View all
                        </Link>
                    </div>
                    <div className="grid gap-4 lg:grid-cols-3">
                        {coupons.slice(0, 3).map(coupon => (
                            <CouponCard key={coupon.slug} item={coupon} />
                        ))}
                    </div>
                </div>
            </section>
        </PublicPageShell>
    );
}
