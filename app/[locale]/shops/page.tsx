import Link from 'next/link';

import { Search, Star } from 'lucide-react';

import {
    FilterPill,
    PageHeader,
    Pagination,
    PublicPageShell,
    StoreCard,
} from '@/components/public/page-layout';
import { stores } from '@/utils/public-content';

const alphaFilters = [
    'All',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
];

export default function ShopsPage() {
    return (
        <PublicPageShell>
            <PageHeader
                eyebrow="Store directory"
                title="Popular stores"
                description="Find trusted retailers, discover active offers and compare the best verified deals available right now."
            />

            <section className="container-page py-8 md:py-10">
                <div className="rounded-3xl border border-border bg-card p-4 shadow-soft md:p-5">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="relative w-full max-w-xl">
                            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <input
                                aria-label="Search stores"
                                placeholder="Search stores, categories, brands..."
                                className="h-11 w-full rounded-full border border-border bg-background pl-10 pr-3 text-[14px] text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10"
                            />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <FilterPill active>Popular</FilterPill>
                            <FilterPill>Featured</FilterPill>
                            <FilterPill>Newest</FilterPill>
                        </div>
                    </div>

                    <div className="mt-4 overflow-x-auto pb-1">
                        <div className="flex min-w-max gap-2">
                            {alphaFilters.map((letter, index) => (
                                <FilterPill key={letter} active={index === 0}>
                                    {letter}
                                </FilterPill>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-8 rounded-3xl border border-border bg-surface/50 p-4 md:p-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                                Top picks
                            </p>
                            <h2 className="mt-1 font-display text-[24px] font-extrabold text-foreground">
                                Popular stores
                            </h2>
                        </div>
                        <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-[12px] font-semibold text-amber-700">
                            <Star className="h-3.5 w-3.5" />
                            40+ stores with live offers
                        </div>
                    </div>

                    <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        {stores
                            .filter(store => store.popular)
                            .slice(0, 4)
                            .map(store => (
                                <StoreCard key={store.slug} item={store} />
                            ))}
                    </div>
                </div>

                <div className="mt-10">
                    <div className="mb-5 flex items-center justify-between gap-3">
                        <h2 className="font-display text-[28px] font-extrabold tracking-tight text-foreground">
                            All stores
                        </h2>
                        <Link
                            href="/coupons"
                            className="text-[13px] font-semibold text-primary hover:text-primary-hover"
                        >
                            View deals
                        </Link>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {stores.map(store => (
                            <StoreCard key={store.slug} item={store} />
                        ))}
                    </div>
                </div>

                <Pagination />
            </section>
        </PublicPageShell>
    );
}
