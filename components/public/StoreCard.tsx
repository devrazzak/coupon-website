'use client';

import Link from 'next/link';

import { BadgeCheck } from 'lucide-react';

import PATHS from '@/routes/path';
import { type PublicStore } from '@/utils/api/store';

export function StoreCard({ item }: { item: PublicStore }) {
    return (
        <Link
            href={`${PATHS.shopDetails.replace(':slug', item.slug)}?store_id=${item.id}`}
            className="group relative flex flex-col items-center justify-between overflow-hidden rounded-2xl border border-border bg-card p-3 text-center shadow-soft transition-all duration-200  hover:border-primary/50 hover:shadow-lift"
            aria-label={`View verified coupons and deals for ${item.name} store`}
        >
            <div className="flex min-h-15 w-full items-center justify-center rounded-xl transition-colors">
                {item.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={item.logo}
                        alt={`${item.name} logo`}
                        className="h-full max-w-full object-contain rounded-xl max-h-24"
                    />
                ) : (
                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-primary text-2xl font-extrabold text-primary-foreground">
                        {(item.name || '?').charAt(0).toUpperCase()}
                    </span>
                )}
            </div>
            <div className="w-full pt-5">
                <p className="truncate text-[16px] font-semibold text-foreground transition-colors group-hover:text-primary">
                    {item.name || 'N/A'}
                </p>
            </div>
        </Link>
    );
}

export default StoreCard;
