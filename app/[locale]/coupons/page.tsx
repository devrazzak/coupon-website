'use client';

import { BadgeCheck, Clock, Percent, Scissors, Search } from 'lucide-react';
import { useMemo, useState } from 'react';

import { CouponModal, StoreLogo, formatDiscount, formatExpiry } from '@/components/CouponSection';
import { FilterPill, PublicPageShell } from '@/components/public/page-layout';
import { CouponCardSkeleton } from '@/components/ui/coupon-card-skeleton';
import type { PublicCoupon } from '@/utils/api/coupon';
import { useGetPublicCoupons } from '@/utils/hooks/coupon';

function CouponRow({
    coupon,
    onShow,
}: {
    coupon: PublicCoupon;
    onShow: (c: PublicCoupon) => void;
}) {
    return (
        <li className="group border-b border-border/70 last:border-b-0 transition-colors hover:bg-surface/50">
            <div className="flex flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:gap-6">
                {/* Store Logo & Discount Badge */}
                <div className="flex items-center gap-3.5 md:w-[130px] md:shrink-0 md:flex-col md:items-start md:gap-2">
                    <StoreLogo coupon={coupon} />
                    <span className="inline-flex items-center gap-1 rounded-md bg-primary-light px-2 py-0.5 text-[11px] font-extrabold text-primary">
                        <Percent className="h-3 w-3" />
                        {formatDiscount(coupon)}
                    </span>
                </div>

                {/* Deal Content & Metadata */}
                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="text-[12px] font-semibold text-muted-foreground">
                            {coupon.store?.name || 'N/A'}
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
                    <p className="mt-1 text-[13px] text-muted-foreground line-clamp-1">
                        {coupon.short_description || 'N/A'}
                    </p>

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
                        onClick={() => onShow(coupon)}
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
                            <CouponRow key={coupon.id} coupon={coupon} onShow={setSelected} />
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
