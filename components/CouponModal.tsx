'use client';

import { BadgeCheck, Check, Clock, Copy, ExternalLink, Percent, Sparkles, Tag } from 'lucide-react';
import { useCallback, useState } from 'react';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/dialog';
import PATHS from '@/routes/path';
import type { PublicCoupon } from '@/utils/api/coupon';

// Legacy coupon type supported for backward compatibility.
export type LegacyCoupon = {
    id: string | number;
    title: string;
    code: string;
    description?: string;
    expires?: string;
    category?: string;
    store?: string;
    affiliate_url?: string;
    url?: string;
};

export type ModalCoupon = PublicCoupon | LegacyCoupon;

export function isPublicCoupon(coupon: ModalCoupon): coupon is PublicCoupon {
    return (
        'short_description' in coupon ||
        (typeof (coupon as any).store === 'object' && (coupon as any).store !== null)
    );
}

export function formatDiscount(coupon: ModalCoupon): string {
    if (isPublicCoupon(coupon)) {
        const { discount_type, discount_value: value, currency, title } = coupon;

        if (typeof value === 'number' && value > 0) {
            if (discount_type === 'percentage') return `${value}% OFF`;
            if (discount_type === 'fixed') return `${currency ? currency + ' ' : '$'}${value} OFF`;
            return `${value} OFF`;
        }

        const match = title.match(/(\d+%\s*OFF|\$\d+\s*OFF|Flat\s*\d+%\s*OFF|\d+%?)+\s*OFF/i);
        return match ? match[0].toUpperCase() : 'HOT DEAL';
    }

    const legacy = coupon as LegacyCoupon;
    const match = legacy.title.match(/(\d+%\s*OFF|\$\d+\s*OFF|Flat\s*\d+%\s*OFF|\d+%?)+\s*OFF/i);
    return match ? match[0].toUpperCase() : 'DEAL';
}

export function formatExpiry(expiresAt?: string): string {
    if (!expiresAt) return 'No expiry';
    const date = new Date(expiresAt);
    if (Number.isNaN(date.getTime())) return expiresAt;

    const days = Math.ceil((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    if (days < 0) return 'Expired';
    if (days === 0) return 'Expires today';
    if (days === 1) return 'Expires tomorrow';
    if (days <= 30) return `Expires in ${days} days`;
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

export function StoreLogo({ coupon, size = 24 }: { coupon: ModalCoupon; size?: number }) {
    if (isPublicCoupon(coupon)) {
        const store = coupon.store;
        const logoUrl = (store as any)?.logo;
        const name = store?.name || coupon.title || '?';

        if (logoUrl) {
            return (
                <img
                    src={logoUrl}
                    alt={`${name} logo`}
                    className="rounded-lg border border-border bg-card object-contain p-1"
                />
            );
        }

        return (
            <span
                className="grid place-items-center rounded-lg border border-border bg-card font-extrabold text-muted-foreground shadow-2xs"
                style={{ width: size * 2, height: size * 1.4 }}
            >
                {name.charAt(0).toUpperCase()}
            </span>
        );
    }

    const legacy = coupon as LegacyCoupon;
    const name = legacy.store || legacy.title || '?';
    return (
        <span
            className="grid place-items-center rounded-lg border border-border bg-card font-extrabold text-muted-foreground shadow-2xs"
            style={{ width: size * 2, height: size * 1.4 }}
        >
            {name.charAt(0).toUpperCase()}
        </span>
    );
}

export interface CouponModalProps {
    coupon: ModalCoupon | null;
    onClose: () => void;
}

export function CouponModal({ coupon, onClose }: CouponModalProps) {
    const [copied, setCopied] = useState(false);

    const isPublic = coupon ? isPublicCoupon(coupon) : false;

    const title = coupon?.title || '';
    const code = isPublic
        ? (coupon as PublicCoupon).code || ''
        : (coupon as LegacyCoupon)?.code || '';
    const description = isPublic
        ? (coupon as PublicCoupon).short_description || (coupon as any).description || ''
        : (coupon as LegacyCoupon)?.description || '';
    const storeName = isPublic
        ? (coupon as PublicCoupon).store?.name || 'Store'
        : (coupon as LegacyCoupon)?.store || 'Store';
    const categoryName = isPublic
        ? (coupon as PublicCoupon).category?.name || ''
        : (coupon as LegacyCoupon)?.category || '';
    const expiresText = isPublic
        ? formatExpiry((coupon as PublicCoupon).expires_at)
        : (coupon as LegacyCoupon)?.expires || 'No expiry';
    const discountText = coupon ? formatDiscount(coupon) : '';

    // Determine target destination URL (affiliate link, store website, or store details page)
    const destinationUrl: string = (() => {
        if (!coupon) return PATHS.coupons;
        if ((coupon as any).affiliate_url) return (coupon as any).affiliate_url;
        if (isPublic) {
            const store = (coupon as PublicCoupon).store as any;
            if (store?.affiliate_url) return store.affiliate_url;
            if (store?.website_url) return store.website_url;
            if (store?.slug) return PATHS.shopDetails.replace(':slug', store.slug);
        }
        if ((coupon as any).url) return (coupon as any).url;
        return PATHS.coupons;
    })();

    const handleCopy = useCallback(async () => {
        if (!code) return;
        try {
            await navigator.clipboard.writeText(code);
        } catch {
            /* clipboard fallback */
        }
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2400);
    }, [code]);

    const handleStoreRedirect = () => {
        if (code) {
            handleCopy();
        }
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
                            <div className="flex items-center justify-between gap-3">
                                <StoreLogo coupon={coupon} size={30} />
                                <div className="flex items-center gap-2">
                                    {discountText && (
                                        <span className="inline-flex items-center gap-1 rounded-full bg-primary-light px-2.5 py-0.5 text-[11px] font-extrabold text-primary">
                                            <Percent className="h-3 w-3" />
                                            {discountText}
                                        </span>
                                    )}
                                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 border border-emerald-200">
                                        <BadgeCheck className="h-3.5 w-3.5" />
                                        Verified
                                    </span>
                                </div>
                            </div>

                            <DialogTitle className="font-display text-[19px] font-extrabold leading-snug text-foreground md:text-[21px]">
                                {title}
                            </DialogTitle>
                            {description && (
                                <DialogDescription className="text-[13.5px] leading-relaxed text-muted-foreground">
                                    {description}
                                </DialogDescription>
                            )}
                        </DialogHeader>

                        {/* Metadata Pills */}
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-y border-border py-2.5 text-[12px] text-muted-foreground">
                            <span className="inline-flex items-center gap-1 font-semibold text-emerald-600">
                                <Sparkles className="h-3 w-3" />
                                Tested &amp; Working
                            </span>
                            {categoryName && (
                                <>
                                    <span className="text-border">•</span>
                                    <span>{categoryName}</span>
                                </>
                            )}
                            <span className="text-border">•</span>
                            <span className="inline-flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {expiresText}
                            </span>
                        </div>

                        {/* Interactive Coupon Box */}
                        <div className="relative overflow-hidden rounded-2xl border border-primary/40 bg-primary-light/50 p-4 text-center">
                            <p className="text-[11px] font-bold uppercase tracking-wider text-primary">
                                {code ? 'Promo Code' : 'Direct Deal (No Code Required)'}
                            </p>
                            <div className="mt-2 flex items-center justify-between gap-3 rounded-xl border border-primary/20 bg-card p-2 shadow-xs">
                                <span className="min-w-0 flex-1 truncate font-mono text-[20px] sm:text-[22px] font-black tracking-widest text-foreground">
                                    {code || 'AUTOMATIC DISCOUNT'}
                                </span>
                                {code ? (
                                    <button
                                        type="button"
                                        onClick={handleCopy}
                                        className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-xl bg-primary px-4 text-[13px] font-bold text-primary-foreground shadow-sm transition-all hover:bg-primary-hover hover:shadow-primary active:scale-95 cursor-pointer"
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
                                ) : (
                                    <span className="rounded-lg bg-emerald-100 px-3 py-1 text-[12px] font-bold text-emerald-800">
                                        Applied at link
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* How to use */}
                        <div className="space-y-2 rounded-2xl border border-border bg-surface p-4 text-[12.5px]">
                            <p className="inline-flex items-center gap-1.5 font-display text-[13px] font-bold text-foreground">
                                <Tag className="h-3.5 w-3.5 text-primary" />
                                Easy Steps to Redeem
                            </p>
                            <ol className="list-inside list-decimal space-y-1 text-muted-foreground">
                                <li>
                                    {code
                                        ? 'Copy the discount code above.'
                                        : 'Click the button below to activate the offer.'}
                                </li>
                                <li>
                                    We&apos;ll open <strong>{storeName}</strong> in a new tab.
                                </li>
                                <li>
                                    {code
                                        ? 'Paste the coupon at checkout in the promo code box.'
                                        : 'The discount will be automatically applied.'}
                                </li>
                            </ol>
                        </div>

                        {/* Direct Store Jump Button */}
                        <a
                            href={destinationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleStoreRedirect}
                            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-[14px] font-bold text-primary-foreground shadow-md transition-all hover:bg-primary-hover hover:shadow-primary cursor-pointer"
                        >
                            <span>
                                {code ? `Copy Code & Go to ${storeName}` : `Go to ${storeName}`}
                            </span>
                            <ExternalLink className="h-4 w-4" />
                        </a>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}

export default CouponModal;
