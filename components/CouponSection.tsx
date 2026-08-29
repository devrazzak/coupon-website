'use client';

import Image from 'next/image';

import {
    ArrowRight,
    BadgeCheck,
    Check,
    Clock,
    Copy,
    ExternalLink,
    Flame,
    Percent,
    Scissors,
    Tag,
} from 'lucide-react';
import { useMemo, useState } from 'react';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/dialog';
import Nike from '@/public/images/shops/nike.jpg';
import { type Coupon, couponTabs, coupons } from '@/utils/coupello';

function CouponRow({ coupon, onShow }: { coupon: Coupon; onShow: (c: Coupon) => void }) {
    // Extract discount amount for bold display if present
    const discountMatch = coupon.title.match(/(\d+%\s*OFF|\$\d+\s*OFF|Flat\s*\d+%\s*OFF)/i);
    const discountText = discountMatch ? discountMatch[0] : 'HOT DEAL';

    return (
        <li className="group border-b border-border/70 last:border-b-0 transition-colors hover:bg-surface/50">
            <div className="flex flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:gap-6">
                {/* Store Logo & Discount Badge */}
                <div className="flex items-center gap-3.5 md:w-[130px] md:shrink-0 md:flex-col md:items-start md:gap-2">
                    <Image
                        src={Nike.src}
                        alt={coupon.store}
                        width={96}
                        height={68}
                        className="rounded-lg border border-border bg-card p-2"
                    />
                    <span className="inline-flex items-center gap-1 rounded-md bg-primary-light px-2 py-0.5 text-[11px] font-extrabold text-primary">
                        <Percent className="h-3 w-3" />
                        {discountText}
                    </span>
                </div>

                {/* Deal Content & Metadata */}
                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        {coupon.badge && (
                            <span
                                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10.5px] font-extrabold uppercase tracking-wide ${
                                    coupon.badge.tone === 'amber'
                                        ? 'bg-secondary-brand-light text-secondary-brand-strong'
                                        : 'bg-emerald-100 text-emerald-700'
                                }`}
                            >
                                <Flame className="h-3 w-3" />
                                {coupon.badge.label}
                            </span>
                        )}
                        <span className="text-[12px] font-semibold text-muted-foreground">
                            {coupon.store}
                        </span>
                    </div>

                    <h3 className="font-display text-[16.5px] font-bold leading-snug text-foreground md:text-[18px] group-hover:text-primary transition-colors">
                        {coupon.title}
                    </h3>
                    <p className="mt-1 text-[13px] text-muted-foreground line-clamp-1">
                        {coupon.description}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-x-3.5 gap-y-1 text-[12px] text-muted-foreground">
                        <span className="inline-flex items-center gap-1 font-semibold text-emerald-600">
                            <BadgeCheck className="h-3.5 w-3.5" />
                            Verified Code
                        </span>
                        <span className="text-border">•</span>
                        <span className="inline-flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {coupon.expires}
                        </span>
                    </div>
                </div>

                {/* Coupon Code Reveal Button (Scissor / Perforated Cutout Style) */}
                <div className="md:w-[220px] md:shrink-0">
                    <button
                        type="button"
                        onClick={() => onShow(coupon)}
                        className="group/btn relative flex h-12 w-full items-center overflow-hidden rounded-xl bg-primary pl-4 pr-[60px] text-left font-bold text-primary-foreground shadow-sm transition-all hover:bg-primary-hover hover:shadow-primary active:scale-[0.99]"
                    >
                        <span className="flex items-center gap-1.5 truncate text-[13.5px] tracking-wide">
                            <Scissors className="h-3.5 w-3.5" />
                            Get Code
                        </span>
                        <span className="absolute right-0 top-0 grid h-full w-[54px] place-items-center overflow-hidden border-l border-dashed border-white/40 bg-black/15 group-hover/btn:bg-black/25 transition-colors">
                            <span className="truncate px-1 font-mono text-[12px] font-extrabold tracking-wider">
                                {coupon.code.slice(0, 3)}…
                            </span>
                        </span>
                    </button>
                </div>
            </div>
        </li>
    );
}

function CouponModal({ coupon, onClose }: { coupon: Coupon | null; onClose: () => void }) {
    const [copied, setCopied] = useState(false);

    const copy = async () => {
        if (!coupon) return;
        try {
            await navigator.clipboard.writeText(coupon.code);
        } catch {
            /* fallback */
        }
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2200);
    };

    return (
        <Dialog
            open={!!coupon}
            onOpenChange={open => {
                if (!open) {
                    setCopied(false);
                    onClose();
                }
            }}
        >
            <DialogContent className="max-w-lg rounded-3xl border-border bg-card p-6 md:p-7 shadow-2xl">
                {coupon && (
                    <>
                        <DialogHeader className="space-y-3 text-left">
                            <div className="flex items-center justify-between">
                                <Image
                                    src={Nike.src}
                                    alt={coupon.store}
                                    width={96}
                                    height={68}
                                    className="rounded-2xl border border-border bg-surface p-2"
                                />
                                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-[11.5px] font-bold text-emerald-700">
                                    <BadgeCheck className="h-3.5 w-3.5" />
                                    100% Verified Code
                                </span>
                            </div>

                            <DialogTitle className="font-display text-[20px] font-extrabold leading-snug text-foreground">
                                {coupon.title}
                            </DialogTitle>
                            <DialogDescription className="text-[13.5px] text-muted-foreground">
                                {coupon.description}
                            </DialogDescription>
                        </DialogHeader>

                        {/* Metadata pills */}
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-muted-foreground border-y border-border py-2.5">
                            <span className="font-semibold text-emerald-600">✓ Tested 2h ago</span>
                            <span className="text-border">•</span>
                            <span className="text-foreground font-medium">{coupon.uses}</span>
                            <span className="text-border">•</span>
                            <span>{coupon.expires}</span>
                        </div>

                        {/* Interactive Coupon Box */}
                        <div className="relative overflow-hidden rounded-2xl border-2 border-dashed border-primary/50 bg-primary-light/60 p-4 text-center">
                            <p className="text-[11px] font-bold uppercase tracking-wider text-primary">
                                Promo Code
                            </p>
                            <div className="mt-2 flex items-center justify-between gap-3 rounded-xl border border-primary/20 bg-card p-2 shadow-xs">
                                <span className="min-w-0 flex-1 truncate font-mono text-[22px] font-black tracking-widest text-foreground">
                                    {coupon.code}
                                </span>
                                <button
                                    type="button"
                                    onClick={copy}
                                    className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-xl bg-primary px-4 text-[13px] font-bold text-primary-foreground shadow-sm transition-all hover:bg-primary-hover hover:shadow-primary active:scale-95"
                                >
                                    {copied ? (
                                        <>
                                            <Check className="h-4 w-4" />
                                            <span>Copied! ✓</span>
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="h-4 w-4" />
                                            <span>Copy Code</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* How to use */}
                        <div className="space-y-2 rounded-2xl border border-border bg-surface p-4 text-[12.5px]">
                            <p className="inline-flex items-center gap-1.5 font-display text-[13px] font-bold text-foreground">
                                <Tag className="h-3.5 w-3.5 text-primary" />
                                Easy Steps to Redeem
                            </p>
                            <ol className="list-inside list-decimal space-y-1 text-muted-foreground">
                                <li>Copy the discount code above.</li>
                                <li>
                                    We&apos;ll open <strong>{coupon.store}</strong> in a new tab.
                                </li>
                                <li>Paste the coupon at checkout in the promo code field.</li>
                            </ol>
                        </div>

                        {/* Direct Store Jump Button */}
                        <a
                            href={`https://www.${coupon.domain}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={copy}
                            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-[14px] font-bold text-primary-foreground shadow-md transition-all hover:bg-primary-hover hover:shadow-primary"
                        >
                            <span>Copy Code &amp; Go to {coupon.store}</span>
                            <ExternalLink className="h-4 w-4" />
                        </a>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}

export function CouponSection() {
    const [active, setActive] = useState<string>('All');
    const [selected, setSelected] = useState<Coupon | null>(null);

    const visible = useMemo(() => {
        if (active === 'All') return coupons;
        if (active === 'Popular') return coupons.filter(c => c.badge);
        return coupons.filter(c => c.category === active);
    }, [active]);

    return (
        <section id="coupons" className="py-15">
            <div className="container-page">
                {/* Header & Tabs */}
                <div className="flex flex-col gap-5 md:flex-row md:justify-between items-center md:gap-6">
                    <div>
                        <h2 className="font-display text-[28px] font-extrabold tracking-tight text-foreground md:text-[32px]">
                            Today&apos;s Top Verified Coupons &amp; Deals
                        </h2>
                    </div>

                    {/* Filter Pills */}
                    <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 md:mx-0 md:flex-wrap md:justify-end md:px-0 md:pb-0">
                        {couponTabs.map(tab => (
                            <button
                                key={tab}
                                type="button"
                                onClick={() => setActive(tab)}
                                aria-pressed={active === tab}
                                className={`whitespace-nowrap rounded-full border px-4 py-1.5 text-[13px] font-semibold cursor-pointer transition-all ${
                                    active === tab
                                        ? 'border-primary bg-primary text-primary-foreground shadow-xs'
                                        : 'border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Coupon Cards List */}
                <ul className="mt-6 overflow-hidden rounded-xl border border-border bg-card">
                    {visible.map(coupon => (
                        <CouponRow key={coupon.id} coupon={coupon} onShow={setSelected} />
                    ))}
                    {visible.length === 0 && (
                        <li className="p-12 text-center text-sm text-muted-foreground">
                            No coupons found in this category right now. Check back soon!
                        </li>
                    )}
                </ul>

                {/* View All Button */}
                <div className="mt-9 flex justify-center">
                    <a
                        href="#"
                        className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-3 text-[14px] font-bold text-foreground transition-all hover:border-primary hover:bg-primary-light hover:text-primary"
                    >
                        <span>Explore All Coupons</span>
                        <ArrowRight className="h-4 w-4" />
                    </a>
                </div>
            </div>

            <CouponModal coupon={selected} onClose={() => setSelected(null)} />
        </section>
    );
}
