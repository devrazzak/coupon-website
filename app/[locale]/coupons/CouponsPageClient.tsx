'use client';

import { Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import { CouponModal } from '@/components/CouponModal';
import { PublicCouponRow } from '@/components/public/PublicCouponRow';
import { PageHeader, PublicPageShell } from '@/components/public/page-layout';
import { CouponCardSkeleton } from '@/components/ui/coupon-card-skeleton';
import type { PublicCoupon } from '@/utils/api/coupon';
import { useInfinitePublicCoupons } from '@/utils/hooks/coupon';

const PAGE_LIMIT = 40;

export default function CouponsPageClient() {
    const [sort, setSort] = useState<string>('All');
    const [selected, setSelected] = useState<PublicCoupon | null>(null);
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(search), 300);
        return () => clearTimeout(timer);
    }, [search]);

    const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
        useInfinitePublicCoupons({
            search: debouncedSearch || undefined,
            limit: PAGE_LIMIT,
            sort: sort === 'All' ? undefined : sort.toLowerCase().replace(/\s+/g, '_'),
        });
    const coupons = useMemo(() => data?.pages.flatMap(page => page.data.data) ?? [], [data]);

    return (
        <PublicPageShell>
            <PageHeader
                title="Coupons & Promo Codes"
                description="Discover verified coupon codes, promo offers, and exclusive discounts from popular online stores. Search the latest deals and save more on every purchase with Coupello."
            />
            <section className="container-page py-12">
                {/* <div className="rounded-xl border border-border bg-card p-4 md:p-5"> */}
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="relative w-full max-w-xl">
                        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <input
                            aria-label="Search coupons"
                            placeholder="Search coupons..."
                            value={search}
                            onChange={event => setSearch(event.target.value)}
                            className="h-11 w-full rounded-md border border-border bg-background pl-10 pr-3 text-[14px] text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary"
                        />
                    </div>
                    {/* <div className="flex flex-wrap gap-2">
                            {['All', 'Popular', 'Newest', 'Most Deals'].map(filter => (
                                <FilterPill
                                    key={filter}
                                    active={sort === filter}
                                    onClick={() => setSort(filter)}
                                >
                                    {filter}
                                </FilterPill>
                            ))}
                        </div> */}
                </div>
                {/* </div> */}

                {isLoading ? (
                    <div className="mt-10 overflow-hidden rounded-xl border border-border bg-card">
                        <CouponCardSkeleton rows={5} />
                    </div>
                ) : (
                    <>
                        <ul className="mt-10 overflow-hidden rounded-xl border border-border bg-card">
                            {coupons.map(coupon => (
                                <PublicCouponRow
                                    key={coupon.id}
                                    coupon={coupon}
                                    onShow={setSelected}
                                />
                            ))}
                            {coupons.length === 0 && (
                                <li className="p-12 text-center text-sm text-muted-foreground">
                                    No coupons found. Check back soon!
                                </li>
                            )}
                        </ul>
                        {hasNextPage && (
                            <div className="mt-8 flex justify-center">
                                <button
                                    type="button"
                                    onClick={() => fetchNextPage()}
                                    disabled={isFetchingNextPage}
                                    className="rounded-xl border border-primary bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {isFetchingNextPage ? 'Loading...' : 'Load More Coupons'}
                                </button>
                            </div>
                        )}
                    </>
                )}

                <section aria-labelledby="coupon-guide-title" className="mt-16 max-w-3xl">
                    <h2
                        id="coupon-guide-title"
                        className="font-display text-xl font-semibold tracking-[-0.02em] text-foreground"
                    >
                        Find the Best Coupons and Promo Codes
                    </h2>
                    <div className="mt-3 space-y-3 text-sm leading-7 text-muted-foreground">
                        <p>
                            Looking for a simple way to save money online? Coupello brings together
                            verified coupons, discount codes, and special offers from trusted stores
                            in one convenient place. Browse the latest deals or search for a store
                            to find an offer that matches your purchase.
                        </p>
                        <p>
                            Before you check out, compare available promo codes and choose the
                            discount that gives you the best value. Our coupon listings include
                            helpful deal details and expiration information, so you can shop with
                            confidence and make every online order go further.
                        </p>
                    </div>
                </section>
            </section>

            <CouponModal coupon={selected} onClose={() => setSelected(null)} />
        </PublicPageShell>
    );
}
