'use client';

import { BadgeCheck, Clock, Scissors } from 'lucide-react';

import { StoreLogo, formatDiscount, formatExpiry } from '@/components/CouponModal';
import type { PublicCoupon } from '@/utils/api/coupon';

// Reusable coupon row for public pages driven by the API (/api/v1/coupons).
export function PublicCouponRow({
    coupon,
    onShow,
}: {
    coupon: PublicCoupon;
    onShow: (c: PublicCoupon) => void;
}) {
    const handleCouponClick = () => {
        if (coupon.affiliate_url) {
            const modalUrl = new URL(window.location.href);
            modalUrl.searchParams.set('coupon_slug', coupon.slug);
            window.open(modalUrl.toString(), '_blank', 'noopener,noreferrer');
            window.location.href = coupon.affiliate_url;
            return;
        }

        onShow(coupon);
    };

    return (
        <li className="group border-b border-border/70 last:border-b-0 transition-colors hover:bg-surface/50">
            <div className="flex flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:gap-6">
                {/* Store Logo & Discount Badge */}
                <div className="flex items-center gap-3.5 md:w-[130px] md:shrink-0 md:flex-col md:items-start md:gap-2">
                    <StoreLogo coupon={coupon} />
                    <span className="inline-flex items-center gap-1 rounded-md bg-primary-light px-2 py-0.5 text-[11px] font-extrabold text-primary">
                        {formatDiscount(coupon)}
                    </span>
                </div>

                {/* Deal Content & Metadata */}
                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="text-[12px] font-semibold text-muted-foreground">
                            {coupon.store?.name || ''}
                        </span>
                        {coupon.category?.name && (
                            <>
                                <span className="text-border">•</span>
                                <span className="text-[12px] font-semibold text-muted-foreground">
                                    {coupon.category.name}
                                </span>
                            </>
                        )}
                    </div>

                    <h3 className="font-display text-[16.5px] font-bold leading-snug text-foreground md:text-[18px] group-hover:text-primary transition-colors">
                        {coupon.title}
                    </h3>
                    {coupon.short_description && (
                        <p className="mt-1 text-[13px] text-muted-foreground line-clamp-1">
                            {coupon.short_description || ''}
                        </p>
                    )}

                    <div className="mt-3 flex flex-wrap items-center gap-x-3.5 gap-y-1 text-[12px] text-muted-foreground">
                        <span className="inline-flex items-center gap-1 font-semibold text-emerald-600">
                            <BadgeCheck className="h-3.5 w-3.5" />
                            Verified Code
                        </span>
                        <span className="text-border">•</span>
                        <span className="inline-flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatExpiry(coupon.expires_at)}
                        </span>
                    </div>
                </div>

                {/* Coupon Code Reveal Button */}
                <div className="md:w-[220px] md:shrink-0">
                    <button
                        type="button"
                        onClick={handleCouponClick}
                        className="group/btn relative flex h-12 w-full items-center overflow-hidden rounded-xl bg-primary pl-4 pr-[60px] text-left font-bold text-primary-foreground shadow-sm transition-all hover:bg-primary-hover hover:shadow-primary active:scale-[0.99]"
                    >
                        <span className="flex items-center gap-1.5 truncate text-[13.5px] tracking-wide">
                            <Scissors className="h-3.5 w-3.5" />
                            Get Code
                        </span>
                        <span className="absolute right-0 top-0 grid h-full w-[54px] place-items-center overflow-hidden border-l border-dashed border-white/40 bg-black/15 group-hover/btn:bg-black/25 transition-colors">
                            <span className="truncate px-1 font-mono text-[12px] font-extrabold tracking-wider">
                                {(coupon.code || '???').slice(0, 3)}…
                            </span>
                        </span>
                    </button>
                </div>
            </div>
        </li>
    );
}
