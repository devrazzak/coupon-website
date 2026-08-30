'use client';

import Link from 'next/link';

import { useState } from 'react';

import { CouponModal } from '@/components/CouponSection';
import { type Coupon } from '@/utils/coupello';
import { type StoreDirectoryItem } from '@/utils/public-content';

import { CouponCard } from './page-layout';

export function StoreDetailClient({
    store,
    storeCoupons,
}: {
    store: StoreDirectoryItem;
    storeCoupons: Coupon[];
}) {
    const [selected, setSelected] = useState<Coupon | null>(null);

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
                    <span className="font-medium text-foreground">{store.name}</span>
                </nav>

                <div className="mt-10">
                    <div className="mb-5 flex items-center justify-between gap-3">
                        <h2 className="font-display text-[28px] font-extrabold tracking-tight text-foreground">
                            Available coupons & deals
                        </h2>
                        <span className="text-[13px] font-semibold text-muted-foreground">
                            {storeCoupons.length} active offers
                        </span>
                    </div>

                    <div className="mt-6 overflow-hidden rounded-xl border border-border bg-card">
                        {storeCoupons.map(coupon => (
                            <CouponCard key={coupon.id} coupon={coupon} onShow={setSelected} />
                        ))}
                    </div>
                </div>
            </section>

            <CouponModal coupon={selected} onClose={() => setSelected(null)} />
        </>
    );
}
