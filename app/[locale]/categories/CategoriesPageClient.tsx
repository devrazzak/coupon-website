'use client';

import Link from 'next/link';

import { LayoutGrid, Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import { FilterPill, PageHeader, PublicPageShell } from '@/components/public/page-layout';
import PATHS from '@/routes/path';
import { useGetPublicCategories } from '@/utils/hooks/category';

const sortFilters = ['All', 'Popular', 'Newest', 'Most Deals'];
const DEFAULT_SORT = 'All';

export default function CategoriesPageClient() {
    const [sort, setSort] = useState(DEFAULT_SORT);
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(search), 300);
        return () => clearTimeout(timer);
    }, [search]);

    const { data: apiData, isLoading } = useGetPublicCategories(
        1,
        20,
        sort === 'All' ? undefined : sort.toLowerCase().replace(/\s+/g, '_'),
        debouncedSearch || undefined,
    );
    const categories = useMemo(() => apiData?.data?.data ?? [], [apiData]);

    return (
        <PublicPageShell>
            <PageHeader
                title="Categories"
                description="Browse shopping categories to discover verified coupons, promo codes, and money-saving deals curated for everyday purchases."
            />
            <section className="container-page py-15">
                <div className="rounded-xl border border-border bg-card p-4 md:p-5">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="relative w-full max-w-xl">
                            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <input
                                aria-label="Search categories"
                                placeholder="Search categories..."
                                value={search}
                                onChange={event => setSearch(event.target.value)}
                                className="h-11 w-full rounded-md border border-border bg-background pl-10 pr-3 text-[14px] text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary"
                            />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {sortFilters.map(filter => (
                                <FilterPill
                                    key={filter}
                                    active={sort === filter}
                                    onClick={() => setSort(filter)}
                                >
                                    {filter}
                                </FilterPill>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-10">
                    {isLoading ? (
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                            {Array.from({ length: 12 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="flex min-h-44 animate-pulse flex-col items-center justify-between rounded-2xl border border-border bg-card p-3"
                                >
                                    <span className="h-24 w-full rounded-xl bg-muted" />
                                    <div className="w-full border-t border-border/60 pt-3">
                                        <span className="mx-auto block h-3 w-20 rounded bg-muted" />
                                        <span className="mx-auto mt-2 block h-2.5 w-14 rounded bg-muted" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : categories.length > 0 ? (
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                            {categories.map(category => (
                                <Link
                                    key={category.id}
                                    href={`${PATHS.categoryDetails.replace(':slug', category.slug)}?category_id=${category.id}`}
                                    className="group relative flex min-h-44 flex-col items-center justify-between overflow-hidden rounded-2xl border border-border bg-card p-3 text-center shadow-soft transition-all duration-200 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lift"
                                >
                                    <div className="flex h-24 w-full items-center justify-center rounded-xl bg-surface p-3 transition-colors group-hover:bg-primary-light/60">
                                        {category.image ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img
                                                src={category.image}
                                                alt={`${category.name} category`}
                                                className="h-full w-full object-contain"
                                            />
                                        ) : (
                                            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-primary text-primary-foreground">
                                                <LayoutGrid className="h-7 w-7" />
                                            </span>
                                        )}
                                    </div>
                                    <div className="w-full border-t border-border/60 pt-3">
                                        <p className="truncate text-[13px] font-bold text-foreground transition-colors group-hover:text-primary">
                                            {category.name}
                                        </p>
                                        <span className="mt-1 text-[11px] font-semibold text-emerald-600">
                                            Explore deals
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-xl border border-border bg-card p-10 text-center text-sm text-muted-foreground">
                            No categories found.
                        </div>
                    )}
                </div>
            </section>
        </PublicPageShell>
    );
}
