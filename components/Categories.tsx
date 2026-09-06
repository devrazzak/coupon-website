'use client';

import { SectionHeading } from '@/components/SectionHeading';
import { CategoryCard } from '@/components/public/CategoryCard';
import PATHS from '@/routes/path';
import { useGetPublicCategories } from '@/utils/hooks/category';

export function Categories() {
    const { data: apiData, isLoading } = useGetPublicCategories(1, 20);
    const categories = apiData?.data?.data ?? [];

    return (
        <section className="border-t border-border/70 bg-surface/70 py-14 md:py-18">
            <div className="container-page">
                <SectionHeading
                    title="Browse Top Categories"
                    subtitle="Explore discounts, cash back & coupons across popular shopping departments."
                    action="View All Categories"
                    actionHref={PATHS.categories}
                />
                {isLoading ? (
                    <ul className="grid grid-cols-2 gap-3.5 sm:grid-cols-4 lg:grid-cols-8">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <li key={i}>
                                <div className="flex h-full animate-pulse flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-card px-3 py-6 text-center">
                                    <span className="h-12 w-12 rounded-2xl bg-muted" />
                                    <div className="space-y-1.5">
                                        <div className="h-3 w-20 rounded bg-muted" />
                                        <div className="h-2.5 w-14 rounded bg-muted" />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <ul className="grid grid-cols-2 gap-3.5 sm:grid-cols-4 lg:grid-cols-8">
                        {categories.map(category => (
                            <li key={category.id}>
                                <CategoryCard category={category} />
                            </li>
                        ))}
                        {categories.length === 0 && (
                            <li className="col-span-full p-8 text-center text-sm text-muted-foreground">
                                No categories found.
                            </li>
                        )}
                    </ul>
                )}
            </div>
        </section>
    );
}
