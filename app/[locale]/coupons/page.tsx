'use client';

import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';

import { CouponModal } from '@/components/CouponModal';
import { PublicCouponRow } from '@/components/public/PublicCouponRow';
import { FilterPill, PublicPageShell } from '@/components/public/page-layout';
import { CouponCardSkeleton } from '@/components/ui/coupon-card-skeleton';
import type { PublicCoupon } from '@/utils/api/coupon';
import { useGetPublicCoupons } from '@/utils/hooks/coupon';

export default function CouponsPage() {
    const [sort, setSort] = useState<string>('All');
    const [selected, setSelected] = useState<PublicCoupon | null>(null);
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    // Filters are sent to the API; changing any of them triggers a new request.
    const { data: apiData, isLoading } = useGetPublicCoupons({
        search: debouncedSearch || undefined,
        page: 1,
        limit: 20,
        sort: sort === 'All' ? undefined : sort.toLowerCase().replace(/\s+/g, '_'),
    });
    const coupons = useMemo(() => apiData?.data?.data ?? [], [apiData]);

    return (
        <PublicPageShell>
            <section className="container-page py-15">
                <div className="rounded-xl border border-border bg-card p-4 md:p-5">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="relative w-full max-w-xl">
                            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <input
                                aria-label="Search coupons"
                                placeholder="Search coupons..."
                                value={search}
                                onChange={e => {
                                    setSearch(e.target.value);
                                    window.setTimeout(
                                        () => setDebouncedSearch(e.target.value),
                                        300,
                                    );
                                }}
                                className="h-11 w-full rounded-md border border-border bg-background pl-10 pr-3 text-[14px] text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary"
                            />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {['All', 'Popular', 'Newest', 'Most Deals'].map(f => (
                                <FilterPill key={f} active={sort === f} onClick={() => setSort(f)}>
                                    {f}
                                </FilterPill>
                            ))}
                        </div>
                    </div>
                </div>

                {isLoading ? (
                    <div className="mt-10 overflow-hidden rounded-xl border border-border bg-card">
                        <CouponCardSkeleton rows={5} />
                    </div>
                ) : (
                    <ul className="mt-10 overflow-hidden rounded-xl border border-border bg-card">
                        {coupons.map(coupon => (
                            <PublicCouponRow key={coupon.id} coupon={coupon} onShow={setSelected} />
                        ))}
                        {coupons.length === 0 && (
                            <li className="p-12 text-center text-sm text-muted-foreground">
                                No coupons found. Check back soon!
                            </li>
                        )}
                    </ul>
                )}
            </section>

            <CouponModal coupon={selected} onClose={() => setSelected(null)} />
        </PublicPageShell>
    );
}
