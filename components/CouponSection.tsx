'use client';

import Link from 'next/link';

import { ArrowRight } from 'lucide-react';
import { useMemo, useState } from 'react';

import {
    CouponModal,
    type LegacyCoupon,
    type ModalCoupon,
    StoreLogo,
    formatDiscount,
    formatExpiry,
    isPublicCoupon,
} from '@/components/CouponModal';
import { PublicCouponRow } from '@/components/public/PublicCouponRow';
import { CouponCardSkeleton } from '@/components/ui/coupon-card-skeleton';
import PATHS from '@/routes/path';
import type { PublicCoupon } from '@/utils/api/coupon';
import { useGetPublicCoupons } from '@/utils/hooks/coupon';

export { CouponModal, StoreLogo, formatDiscount, formatExpiry, isPublicCoupon };
export type { LegacyCoupon, ModalCoupon };

export function CouponSection() {
    const [active, setActive] = useState<string>('All');
    const [selected, setSelected] = useState<PublicCoupon | null>(null);

    const { data: apiData, isLoading } = useGetPublicCoupons({ page: 1, limit: 20 });
    const coupons = useMemo(() => apiData?.data?.data ?? [], [apiData]);

    const visible = useMemo(() => {
        if (active === 'All') return coupons;
        return coupons.filter(c => (c.category?.name ?? '') === active);
    }, [active, coupons]);

    return (
        <section id="coupons" className="py-15">
            <div className="container-page">
                {/* Header & Tabs */}
                <div className="flex flex-col gap-5 md:flex-row md:justify-between items-center md:gap-6">
                    <div>
                        <h2 className="font-display text-[20px] font-semibold tracking-tight text-foreground md:text-[24px]">
                            Today&apos;s Top Verified Coupons &amp; Deals
                        </h2>
                    </div>

                    {/* Filter Pills */}
                    <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 md:mx-0 md:flex-wrap md:justify-end md:px-0 md:pb-0">
                        <button
                            type="button"
                            onClick={() => setActive('All')}
                            aria-pressed={active === 'All'}
                            className={`whitespace-nowrap rounded-full border px-4 py-1.5 text-[13px] font-semibold cursor-pointer transition-all ${
                                active === 'All'
                                    ? 'border-primary bg-primary text-primary-foreground shadow-xs'
                                    : 'border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground'
                            }`}
                        >
                            All
                        </button>
                        {Array.from(
                            new Set(
                                coupons.map(c => c.category?.name).filter((n): n is string => !!n),
                            ),
                        ).map(tab => (
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
                {isLoading ? (
                    <div className="mt-6 overflow-hidden rounded-xl border border-border bg-card">
                        <CouponCardSkeleton rows={5} />
                    </div>
                ) : (
                    <ul className="mt-6 overflow-hidden rounded-xl border border-border bg-card">
                        {visible.map(coupon => (
                            <PublicCouponRow key={coupon.id} coupon={coupon} onShow={setSelected} />
                        ))}
                        {visible.length === 0 && (
                            <li className="p-12 text-center text-sm text-muted-foreground">
                                No coupons found in this category right now. Check back soon!
                            </li>
                        )}
                    </ul>
                )}

                {/* View All Button */}
                <div className="mt-9 flex justify-center">
                    <Link
                        href={PATHS.coupons}
                        className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-7 py-3 text-[14px] font-bold text-foreground transition-all hover:border-primary hover:bg-primary-light hover:text-primary"
                    >
                        <span>Explore All Coupons</span>
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>

            <CouponModal coupon={selected} onClose={() => setSelected(null)} />
        </section>
    );
}
