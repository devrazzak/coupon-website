'use client';

import Link from 'next/link';

import { LayoutGrid } from 'lucide-react';

import { SectionHeading } from '@/components/SectionHeading';
import PATHS from '@/routes/path';
import { useGetPublicBlogCategories } from '@/utils/hooks/blog-category';

export function Categories() {
    const { data: apiData, isLoading } = useGetPublicBlogCategories(1, 20);
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
                                <Link
                                    href={`${PATHS.categoryDetails.replace(
                                        ':slug',
                                        category.slug,
                                    )}?category_id=${category.id}`}
                                    className="group flex h-full flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-card px-3 py-6 text-center transition-all duration-200 hover:-translate-y-1.5 hover:border-primary/50"
                                >
                                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-light text-primary transition-transform duration-200 group-hover:scale-110">
                                        <LayoutGrid className="h-6 w-6" strokeWidth={2.2} />
                                    </span>
                                    <div>
                                        <h3 className="font-display text-[13.5px] font-bold text-foreground group-hover:text-primary transition-colors">
                                            {category.name}
                                        </h3>
                                        <p className="mt-0.5 text-[11.5px] font-medium text-muted-foreground">
                                            N/A
                                        </p>
                                    </div>
                                </Link>
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
