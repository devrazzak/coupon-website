'use client';
import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';

import { CouponModal } from '@/components/CouponSection';
import { CouponCard, FilterPill, PublicPageShell } from '@/components/public/page-layout';
import { Coupon, coupons } from '@/utils/coupello';

export default function CouponsPage() {
    const [active, setActive] = useState<string>('All');
    const [selected, setSelected] = useState<Coupon | null>(null);

    const visible = useMemo(() => {
        if (active === 'All') return coupons;
        if (active === 'Popular') return coupons.filter(c => c.badge);
        return coupons.filter(c => c.category === active);
    }, [active]);

    return (
        <PublicPageShell>
            <section className="container-page py-15">
                <div className="rounded-xl border border-border bg-card p-4 md:p-5">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="relative w-full max-w-xl">
                            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <input
                                aria-label="Search categories"
                                placeholder="Search categories..."
                                className="h-11 w-full rounded-md border border-border bg-background pl-10 pr-3 text-[14px] text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary"
                            />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <FilterPill active>All</FilterPill>
                            <FilterPill>Popular</FilterPill>
                            <FilterPill>Newest</FilterPill>
                            <FilterPill>Most Deals</FilterPill>
                        </div>
                    </div>
                </div>

                <div className="mt-10 overflow-hidden rounded-xl border border-border bg-card">
                    {visible.map(coupon => (
                        <CouponCard key={coupon.id} coupon={coupon} onShow={setSelected} />
                    ))}
                </div>
            </section>

            <CouponModal coupon={selected} onClose={() => setSelected(null)} />
        </PublicPageShell>
    );
}
