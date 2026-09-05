'use client';

import Link from 'next/link';

import { BookOpen, Info, Search, Tag, TicketPercent } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import { CouponModal } from '@/components/CouponModal';
import { PublicCouponRow } from '@/components/public/PublicCouponRow';
import { CouponCardSkeleton } from '@/components/ui/coupon-card-skeleton';
import type { PublicCoupon } from '@/utils/api/coupon';
import type { PublicStoreCategory } from '@/utils/api/store';
import { useGetPublicCoupons } from '@/utils/hooks/coupon';

export function StoreDetailClient({
    storeId,
    storeName,
    storeDescription,
    storeFullDescription,
    storeHowToUse,
    storeCategories = [],
}: {
    storeId?: number;
    storeName: string;
    storeDescription?: string;
    storeFullDescription?: string;
    storeHowToUse?: string;
    storeCategories?: PublicStoreCategory[];
}) {
    const [selected, setSelected] = useState<PublicCoupon | null>(null);
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(search), 300);
        return () => clearTimeout(timer);
    }, [search]);

    const { data: apiData, isLoading } = useGetPublicCoupons({
        search: debouncedSearch || undefined,
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
                        <Link href="/stores" className="transition-colors hover:text-primary">
                            Stores
                        </Link>
                        <span className="text-border">/</span>
                    </div>
                    <span className="font-medium text-foreground">{storeName}</span>
                </nav>

                <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
                    <div className="min-w-0">
                        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-3">
                            <div>
                                <h1 className="font-display text-[20px] font-semibold tracking-tight text-foreground md:text-[24px]">
                                    {storeName} coupons &amp; deals
                                </h1>
                                {storeDescription && (
                                    <p className="mt-2 max-w-2xl text-[14px] leading-6 text-muted-foreground">
                                        {storeDescription}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="relative mt-5 max-w-xl">
                            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <input
                                type="search"
                                aria-label={`Search ${storeName} coupons`}
                                placeholder={`Search ${storeName} coupons...`}
                                value={search}
                                onChange={event => setSearch(event.target.value)}
                                className="h-11 w-full rounded-md border border-border bg-card pl-10 pr-3 text-[14px] text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary"
                            />
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
                                        {debouncedSearch
                                            ? 'No coupons match your search.'
                                            : `No coupons available for ${storeName} right now. Check back soon!`}
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
                                        Store guide
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
                                        <TicketPercent className="h-3.5 w-3.5" />
                                        {coupons.length} active offers
                                    </span>
                                </div>
                                <h2 className="mt-5 font-display text-lg font-bold text-foreground">
                                    About {storeName}
                                </h2>
                                {storeFullDescription && (
                                    <p className="mt-2 whitespace-pre-wrap wrap-break-word text-[13px] leading-6 text-muted-foreground">
                                        {storeFullDescription}
                                    </p>
                                )}

                                {storeCategories.length > 0 && (
                                    <div className="mt-5 border-t border-border/70 pt-5">
                                        <h2 className="flex items-center gap-2 text-sm font-bold text-foreground">
                                            <Tag className="h-4 w-4 text-primary" />
                                            Categories
                                        </h2>
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {storeCategories.map(category => (
                                                <span
                                                    key={category.id}
                                                    className="rounded-full bg-primary-light px-3 py-1 text-[12px] font-semibold text-primary"
                                                >
                                                    {category.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {storeHowToUse && (
                                    <div className="mt-5 border-t border-border/70 pt-5">
                                        <h2 className="flex items-center gap-2 text-sm font-bold text-foreground">
                                            <BookOpen className="h-4 w-4 text-primary" />
                                            How to use
                                        </h2>
                                        <p className="mt-3 whitespace-pre-wrap wrap-break-word text-[13px] leading-6 text-muted-foreground">
                                            {storeHowToUse}
                                        </p>
                                    </div>
                                )}

                                {!storeFullDescription &&
                                    !storeHowToUse &&
                                    storeCategories.length === 0 && (
                                        <p className="mt-5 flex items-start gap-2 border-t border-border/70 pt-5 text-[13px] leading-6 text-muted-foreground">
                                            <Info className="mt-1 h-4 w-4 shrink-0 text-primary" />
                                            Browse verified {storeName} coupons and deals below.
                                        </p>
                                    )}
                            </div>
                        </div>
                    </aside>
                </div>
            </section>

            <CouponModal coupon={selected} onClose={() => setSelected(null)} />
        </>
    );
}
