'use client';

import Link from 'next/link';

import { useMemo, useState } from 'react';

import { CouponModal } from '@/components/CouponModal';
import { PublicCouponRow } from '@/components/public/PublicCouponRow';
import { CouponCardSkeleton } from '@/components/ui/coupon-card-skeleton';
import type { PublicCoupon } from '@/utils/api/coupon';
import { useGetPublicCoupons } from '@/utils/hooks/coupon';

export function StoreDetailClient({ storeId, storeName }: { storeId?: number; storeName: string }) {
    const [selected, setSelected] = useState<PublicCoupon | null>(null);

    const { data: apiData, isLoading } = useGetPublicCoupons({
        storeId,
        page: 1,
        limit: 50,
    });
    const coupons = useMemo(() => apiData?.data?.data ?? [], [apiData]);

    return (
        <>
            <section className="container-page py-8 md:py-10">
                <nav
                    aria-label="Breadcrumb"
                    className="mb-6 flex flex-wrap items-center gap-2 text-[12.5px] text-muted-foreground"
                >
                    <div className="flex items-center gap-2">
                        <Link href="/" className="transition-colors hover:text-primary">
                            Home
                        </Link>
                        <span className="text-border">/</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link href="/shops" className="transition-colors hover:text-primary">
                            Stores
                        </Link>
                        <span className="text-border">/</span>
                    </div>
                    <span className="font-medium text-foreground">{storeName}</span>
                </nav>

                <div className="mt-10">
                    <div className="mb-5 flex items-center justify-between gap-3">
                        <h2 className="font-display text-[28px] font-extrabold tracking-tight text-foreground">
                            {storeName} coupons &amp; deals
                        </h2>
                        <span className="text-[13px] font-semibold text-muted-foreground">
                            {coupons.length} active offers
                        </span>
                    </div>

                    {isLoading ? (
                        <div className="mt-6 overflow-hidden rounded-xl border border-border bg-card">
                            <CouponCardSkeleton rows={4} />
                        </div>
                    ) : (
                        <ul className="mt-6 overflow-hidden rounded-xl border border-border bg-card">
                            {coupons.map(coupon => (
                                <PublicCouponRow
                                    key={coupon.id}
                                    coupon={coupon}
                                    onShow={setSelected}
                                />
                            ))}
                            {coupons.length === 0 && (
                                <li className="p-12 text-center text-sm text-muted-foreground">
                                    No coupons available for {storeName} right now. Check back soon!
                                </li>
                            )}
                        </ul>
                    )}
                </div>
            </section>

            <CouponModal coupon={selected} onClose={() => setSelected(null)} />
        </>
    );
}
