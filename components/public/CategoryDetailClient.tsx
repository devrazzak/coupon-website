'use client';

import { useMemo, useState } from 'react';

import { CouponModal } from '@/components/CouponSection';
import { PublicCouponRow } from '@/components/public/PublicCouponRow';
import { Breadcrumbs, PublicPageShell } from '@/components/public/page-layout';
import { CouponCardSkeleton } from '@/components/ui/coupon-card-skeleton';
import type { PublicCoupon } from '@/utils/api/coupon';
import { useGetPublicCoupons } from '@/utils/hooks/coupon';

export function CategoryDetailClient({
    categoryId,
    categoryName,
}: {
    categoryId?: number;
    categoryName: string;
}) {
    const [selected, setSelected] = useState<PublicCoupon | null>(null);

    const { data: apiData, isLoading } = useGetPublicCoupons({
        categoryIds: categoryId ? [categoryId] : undefined,
        page: 1,
        limit: 50,
    });
    const coupons = useMemo(() => apiData?.data?.data ?? [], [apiData]);

    return (
        <PublicPageShell>
            <section className="container-page py-15">
                <Breadcrumbs
                    items={[
                        { label: 'Home', href: '/' },
                        { label: 'Categories', href: '/categories' },
                        { label: categoryName },
                    ]}
                />

                <div className="mt-10">
                    <h2 className="mb-5 font-display text-[28px] font-extrabold tracking-tight text-foreground">
                        {categoryName} coupons
                    </h2>

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
                                    No coupons available for {categoryName} right now. Check back
                                    soon!
                                </li>
                            )}
                        </ul>
                    )}
                </div>
            </section>

            <CouponModal coupon={selected} onClose={() => setSelected(null)} />
        </PublicPageShell>
    );
}
