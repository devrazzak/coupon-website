'use client';

import Link from 'next/link';

import { ArrowRight, BadgeCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { StoreCardSkeleton } from '@/components/ui/store-card-skeleton';
import PATH from '@/routes/path';
import { useGetPublicStores } from '@/utils/hooks/store';

function storeHref(slug: string, id: number): string {
    return `${PATH.shopDetails.replace(':slug', slug)}?store_id=${id}`;
}

export function PopularStores() {
    const trackRef = useRef<HTMLUListElement>(null);
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);
    const { data: apiData, isLoading } = useGetPublicStores({ page: 1, limit: 10 });
    const stores = apiData?.data?.data ?? [];

    const updateScrollState = useCallback(() => {
        const el = trackRef.current;
        if (!el) return;
        setCanScrollPrev(el.scrollLeft > 0);
        setCanScrollNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    }, []);

    // Track scroll position + container size so the nav buttons only show
    // when there is actually more content to scroll to.
    useEffect(() => {
        const el = trackRef.current;
        if (!el) return;
        updateScrollState();
        el.addEventListener('scroll', updateScrollState, { passive: true });
        const observer = new ResizeObserver(updateScrollState);
        observer.observe(el);
        return () => {
            el.removeEventListener('scroll', updateScrollState);
            observer.disconnect();
        };
    }, [updateScrollState, stores.length]);

    const scrollBy = (dir: 1 | -1) => {
        trackRef.current?.scrollBy({ left: dir * 360, behavior: 'smooth' });
    };

    return (
        <section className="mt-15">
            <div className="container-page">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between items-center">
                    <div>
                        <h2 className="font-display text-[26px] font-extrabold tracking-tight text-foreground md:text-[32px]">
                            Popular Stores
                        </h2>
                    </div>
                    <Link
                        href={PATH.stores}
                        className="inline-flex shrink-0 items-center gap-1.5 text-[13px] font-bold text-primary transition-colors hover:text-primary-hover"
                    >
                        View All Stores
                        <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                </div>
                <div className="relative mt-6">
                    {isLoading ? (
                        <StoreCardSkeleton count={10} horizontal />
                    ) : (
                        <ul
                            ref={trackRef}
                            className="no-scrollbar flex snap-x gap-3 overflow-x-auto pb-3 pt-1"
                        >
                            {stores.map(store => (
                                <li
                                    key={store.id}
                                    className="w-40 shrink-0 snap-start sm:w-44 md:w-46"
                                >
                                    <Link
                                        href={storeHref(store.slug, store.id)}
                                        className="group relative flex h-40 flex-col items-center justify-between rounded-xl border border-border bg-card p-3 text-center transition-all duration-200 hover:border-primary/50 sm:h-42"
                                    >
                                        {store.logo ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img
                                                src={store.logo}
                                                alt={`${store.name} logo`}
                                                className="w-full h-full pb-3 rounded-md object-contain"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center pb-3">
                                                <span className="text-2xl font-extrabold text-muted-foreground">
                                                    {(store.name || '?').charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                        )}
                                        {/* Footer Info */}
                                        <div className="flex w-full items-center justify-between border-t border-border/60 pt-2 text-[11px] text-muted-foreground">
                                            <span className="font-medium text-emerald-600 inline-flex items-center gap-0.5">
                                                <BadgeCheck className="h-3 w-3" />
                                                Active
                                            </span>
                                            <span className="font-semibold text-foreground/80 group-hover:text-primary truncate">
                                                {store.short_description || 'N/A'}
                                            </span>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                    {canScrollNext && (
                        <button
                            type="button"
                            onClick={() => scrollBy(-1)}
                            aria-label="Previous stores"
                            disabled={!canScrollPrev}
                            className="absolute -left-4 top-1/2 cursor-pointer hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-border bg-card text-foreground shadow-lift transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border disabled:hover:bg-card disabled:hover:text-foreground lg:grid"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </button>
                    )}
                    {canScrollNext && (
                        <button
                            type="button"
                            onClick={() => scrollBy(1)}
                            aria-label="Next stores"
                            className="absolute -right-4 top-1/2 cursor-pointer hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-border bg-card text-foreground shadow-lift transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground lg:grid"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
}
