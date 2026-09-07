'use client';

import Link from 'next/link';

import { LayoutGrid } from 'lucide-react';

import PATHS from '@/routes/path';
import type { PublicCategory } from '@/utils/api/category';

export function CategoryCard({ category }: { category: PublicCategory }) {
    return (
        <Link
            href={PATHS.categoryDetails.replace(':slug', category.slug)}
            className="group flex h-full flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card px-2 py-4 text-center transition-all duration-200 hover:border-primary/50"
            aria-label={`View all ${category.name} coupons and offers`}
        >
            {category.image ? (
                <img
                    src={category.image}
                    alt={category.name}
                    className="max-h-15 w-full rounded-2xl object-contain p-1 transition-transform duration-200 group-hover:scale-110"
                />
            ) : (
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-light text-primary transition-transform duration-200 group-hover:scale-110">
                    <LayoutGrid className="h-6 w-6" strokeWidth={2.2} />
                </span>
            )}
            <h3 className="font-display text-[13.5px] font-bold text-foreground transition-colors group-hover:text-primary">
                {category.name}
            </h3>
        </Link>
    );
}

export default CategoryCard;
