'use client';

import { Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import { CategoryCard } from '@/components/public/CategoryCard';
import { PageHeader, PublicPageShell } from '@/components/public/page-layout';
import { useInfinitePublicCategories } from '@/utils/hooks/category';

const PAGE_LIMIT = 24;

export default function CategoriesPageClient() {
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(search), 300);
        return () => clearTimeout(timer);
    }, [search]);

    const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
        useInfinitePublicCategories(PAGE_LIMIT, debouncedSearch || undefined);
    const categories = useMemo(() => data?.pages.flatMap(page => page.data.data) ?? [], [data]);
    const totalCount = data?.pages[0]?.data?.meta?.totalCount ?? 0;

    return (
        <PublicPageShell>
            <PageHeader
                title="Categories"
                description="Browse shopping categories to discover verified coupons, promo codes, and money-saving deals curated for everyday purchases."
            />
            <section className="container-page py-15">
                <div className="rounded-xl border border-border bg-card p-4 md:p-5">
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
                </div>

                <p className="mt-6 text-sm text-muted-foreground">
                    {totalCount > 0
                        ? `${totalCount} categor${totalCount === 1 ? 'y' : 'ies'} found`
                        : ''}
                </p>

                <div className="mt-4">
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
                        <>
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                                {categories.map(category => (
                                    <CategoryCard key={category.id} category={category} />
                                ))}
                            </div>
                            {hasNextPage && (
                                <div className="mt-8 flex justify-center">
                                    <button
                                        type="button"
                                        onClick={() => fetchNextPage()}
                                        disabled={isFetchingNextPage}
                                        className="rounded-xl border border-primary bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60"
                                        aria-label="Load more categories"
                                    >
                                        {isFetchingNextPage ? 'Loading...' : 'Load More'}
                                    </button>
                                </div>
                            )}
                        </>
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
