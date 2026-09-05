'use client';

import { Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import {
    FilterPill,
    PageHeader,
    PublicPageShell,
    StoreCard,
} from '@/components/public/page-layout';
import { StoreCardSkeleton } from '@/components/ui/store-card-skeleton';
import { useGetPublicStores } from '@/utils/hooks/store';

const alphaFilters = ['All', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];
const sortFilters = ['All', 'Popular', 'Featured', 'Newest'] as const;
type SortFilter = (typeof sortFilters)[number];
const PAGE_LIMIT = 20;

export default function StoresPageClient() {
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [sort, setSort] = useState<SortFilter>('All');
    const [letter, setLetter] = useState('All');

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(search), 300);
        return () => clearTimeout(timer);
    }, [search]);

    const { data: apiData, isLoading } = useGetPublicStores({
        search: debouncedSearch || undefined,
        page: 1,
        limit: PAGE_LIMIT,
        sort: sort === 'All' ? undefined : sort.toLowerCase(),
        letter: letter === 'All' ? undefined : letter,
    });

    const stores = useMemo(() => apiData?.data?.data ?? [], [apiData]);
    const totalCount = apiData?.data?.meta?.totalCount ?? 0;

    return (
        <PublicPageShell>
            <PageHeader
                title="Stores"
                description="Discover popular online stores and find verified coupon codes, promo offers, and money-saving deals to help you shop smarter every day."
            />
            <section className="container-page py-15">
                <div className="rounded-xl border border-border bg-card p-4 md:p-5">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="relative w-full max-w-xl">
                            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <input
                                aria-label="Search stores"
                                placeholder="Search stores, categories, brands..."
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
                    <div className="mt-4 pb-1">
                        <div className="flex flex-wrap gap-1">
                            {alphaFilters.map(letterOption => (
                                <FilterPill
                                    key={letterOption}
                                    active={letter === letterOption}
                                    onClick={() => setLetter(letterOption)}
                                >
                                    {letterOption}
                                </FilterPill>
                            ))}
                        </div>
                    </div>
                </div>

                <p className="mt-6 text-sm text-muted-foreground">
                    {totalCount > 0
                        ? `${totalCount} store${totalCount === 1 ? '' : 's'} found`
                        : ''}
                </p>

                {isLoading ? (
                    <div className="mt-4">
                        <StoreCardSkeleton count={12} />
                    </div>
                ) : stores.length > 0 ? (
                    <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                        {stores.map(store => (
                            <StoreCard key={store.id} item={store} />
                        ))}
                    </div>
                ) : (
                    <div className="mt-4 rounded-xl border border-border bg-card p-10 text-center text-muted-foreground">
                        No stores found.
                    </div>
                )}
            </section>
        </PublicPageShell>
    );
}
