'use client';

import Link from 'next/link';

import { LayoutGrid, Search } from 'lucide-react';
import { useMemo, useState } from 'react';

import { FilterPill, PublicPageShell } from '@/components/public/page-layout';
import PATHS from '@/routes/path';
import { useGetPublicBlogCategories } from '@/utils/hooks/blog-category';

const sortFilters = ['All', 'Popular', 'Newest', 'Most Deals'];
const DEFAULT_SORT = 'All';

export default function CategoriesPage() {
    const [sort, setSort] = useState<string>(DEFAULT_SORT);

    // Sort is sent to the API; changing it triggers a new request.
    const { data: apiData, isLoading } = useGetPublicBlogCategories(
        1,
        20,
        sort === 'All' ? undefined : sort.toLowerCase().replace(/\s+/g, '_'),
    );
    const categories = useMemo(() => apiData?.data?.data ?? [], [apiData]);

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
                            {sortFilters.map(f => (
                                <FilterPill key={f} active={sort === f} onClick={() => setSort(f)}>
                                    {f}
                                </FilterPill>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-10">
                    {isLoading ? (
                        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
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
                        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
                            {categories.map(category => (
                                <li key={category.id}>
                                    <Link
                                        href={PATHS.categoryDetails.replace(':slug', category.slug)}
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
        </PublicPageShell>
    );
}
