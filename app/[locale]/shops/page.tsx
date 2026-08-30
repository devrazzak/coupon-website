import { Search } from 'lucide-react';

import { FilterPill, PublicPageShell, StoreCard } from '@/components/public/page-layout';
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
            <section className="container-page py-15">
                <div className="rounded-xl border border-border bg-card p-4 md:p-5">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="relative w-full max-w-xl">
                            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <input
                                aria-label="Search stores"
                                placeholder="Search stores, categories, brands..."
                                className="h-11 w-full rounded-md border border-border bg-background pl-10 pr-3 text-[14px] text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary"
                            />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <FilterPill active>All</FilterPill>
                            <FilterPill>Popular</FilterPill>
                            <FilterPill>Featured</FilterPill>
                            <FilterPill>Newest</FilterPill>
                        </div>
                    </div>

                    <div className="mt-4 pb-1">
                        <div className="flex flex-wrap gap-1">
                            {alphaFilters.map((letter, index) => (
                                <FilterPill key={letter} active={index === 0}>
                                    {letter}
                                </FilterPill>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-10 grid gap-4 grid-cols-6">
                    {stores.map(store => (
                        <StoreCard key={store.slug} item={store} />
                    ))}
                </div>
            </section>
        </PublicPageShell>
    );
}
