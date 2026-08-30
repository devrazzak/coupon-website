'use client';

import { useState } from 'react';

import { CouponModal } from '@/components/CouponSection';
import { Breadcrumbs, CouponCard, PublicPageShell } from '@/components/public/page-layout';
import { type Coupon } from '@/utils/coupello';
import {
    type CategoryDirectoryItem,
    type CouponListItem,
    type StoreDirectoryItem,
} from '@/utils/public-content';

export function CategoryDetailClient({
    category,
    categoryCoupons,
    relatedStores,
}: {
    category: CategoryDirectoryItem;
    categoryCoupons: CouponListItem[];
    relatedStores: StoreDirectoryItem[];
}) {
    const [selected, setSelected] = useState<Coupon | null>(null);

    return (
        <PublicPageShell>
            <section className="container-page py-15">
                <Breadcrumbs
                    items={[
                        { label: 'Home', href: '/' },
                        { label: 'Categories', href: '/categories' },
                        { label: category.name },
                    ]}
                />

                <div className="mt-10">
                    <h2 className="mb-5 font-display text-[28px] font-extrabold tracking-tight text-foreground">
                        Available coupons
                    </h2>
                    <div className="mt-6 overflow-hidden rounded-xl border border-border bg-card">
                        {categoryCoupons.map(coupon => (
                            <CouponCard key={coupon.id} coupon={coupon} onShow={setSelected} />
                        ))}
                    </div>
                </div>
            </section>

            <CouponModal coupon={selected} onClose={() => setSelected(null)} />
        </PublicPageShell>
    );
}
