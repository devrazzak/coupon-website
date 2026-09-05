'use client';

import { Info, TicketPercent } from 'lucide-react';
import { useMemo, useState } from 'react';

import { CouponModal } from '@/components/CouponModal';
import { PublicCouponRow } from '@/components/public/PublicCouponRow';
import { Breadcrumbs, PublicPageShell } from '@/components/public/page-layout';
import { CouponCardSkeleton } from '@/components/ui/coupon-card-skeleton';
import type { PublicCoupon } from '@/utils/api/coupon';
import { useGetPublicCoupons } from '@/utils/hooks/coupon';

export function CategoryDetailClient({
    categoryId,
    categoryName,
    categoryImage,
    categoryShortDescription,
    categoryDescription,
}: {
    categoryId?: number;
    categoryName: string;
    categoryImage?: string;
    categoryShortDescription?: string;
    categoryDescription?: string;
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

                <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
                    <div className="min-w-0">
                        <div className="mb-5">
                            <h1 className="font-display text-[24px] font-semibold tracking-tight text-foreground md:text-[30px]">
                                {categoryName} coupons &amp; deals
                            </h1>
                            {categoryShortDescription && (
                                <p className="mt-2 max-w-2xl text-[14px] leading-6 text-muted-foreground">
                                    {categoryShortDescription}
                                </p>
                            )}
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
                                        No coupons available for {categoryName} right now. Check
                                        back soon!
                                    </li>
                                )}
                            </ul>
                        )}
                    </div>

                    <aside className="lg:sticky lg:top-24">
                        <div className="overflow-hidden rounded-md border border-border bg-card shadow-soft">
                            <div className="p-5">
                                <div className="flex items-center justify-between gap-3">
                                    <span className="rounded-full bg-primary-light px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-primary">
                                        Category guide
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
                                        <TicketPercent className="h-3.5 w-3.5" />
                                        {coupons.length} active offers
                                    </span>
                                </div>
                                {categoryImage && (
                                    <div className="mt-5 flex h-28 items-center justify-center rounded-xl border border-border/70 bg-surface p-4">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={categoryImage}
                                            alt={`${categoryName} category`}
                                            className="h-full w-full object-contain"
                                        />
                                    </div>
                                )}
                                <h2 className="mt-5 font-display text-lg font-bold text-foreground">
                                    About {categoryName}
                                </h2>
                                {categoryDescription ? (
                                    <p className="mt-2 whitespace-pre-wrap break-words text-[13px] leading-6 text-muted-foreground">
                                        {categoryDescription}
                                    </p>
                                ) : (
                                    <p className="mt-2 flex items-start gap-2 text-[13px] leading-6 text-muted-foreground">
                                        <Info className="mt-1 h-4 w-4 shrink-0 text-primary" />
                                        Browse verified {categoryName} coupons and deals below.
                                    </p>
                                )}
                            </div>
                        </div>
                    </aside>
                </div>
            </section>

            <CouponModal coupon={selected} onClose={() => setSelected(null)} />
        </PublicPageShell>
    );
}
