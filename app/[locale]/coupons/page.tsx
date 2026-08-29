import Link from 'next/link';

import { Search, SlidersHorizontal, Sparkles } from 'lucide-react';

import {
    CouponCard,
    FilterPill,
    PageHeader,
    Pagination,
    PublicPageShell,
} from '@/components/public/page-layout';
import { coupons } from '@/utils/public-content';

const filterOptions = [
    'All',
    'Fashion',
    'Electronics',
    'Travel',
    'Beauty',
    'Food',
    'Home & Living',
];
const storeOptions = ['All Stores', 'Nike', 'Amazon', 'ASOS', 'Target', 'Sephora'];
const dealOptions = ['All Types', 'Code', 'Deal'];

export default function CouponsPage() {
    return (
        <PublicPageShell>
            <PageHeader
                eyebrow="Deals & coupons"
                title="Coupons & deals"
                description="Browse verified today’s offers from the stores shoppers trust most. Explore codes and money-saving deals designed to help you shop smarter."
            />

            <section className="container-page py-8 md:py-10">
                <div className="rounded-3xl border border-border bg-card p-4 shadow-soft md:p-5">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                        <div className="relative w-full max-w-xl">
                            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <input
                                aria-label="Search coupons"
                                placeholder="Search coupons, stores, brands..."
                                className="h-11 w-full rounded-full border border-border bg-background pl-10 pr-3 text-[14px] text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10"
                            />
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <button
                                type="button"
                                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3.5 py-2 text-[12.5px] font-semibold text-foreground hover:bg-muted"
                            >
                                <SlidersHorizontal className="h-3.5 w-3.5" />
                                Filters
                            </button>
                            <select className="h-10 rounded-full border border-border bg-background px-3 text-[12.5px] font-medium text-foreground outline-none focus:border-primary">
                                <option>Newest</option>
                                <option>Highest Savings</option>
                                <option>Most Popular</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-4 space-y-4">
                        <div className="flex flex-wrap gap-2">
                            {filterOptions.map((option, index) => (
                                <FilterPill key={option} active={index === 0}>
                                    {option}
                                </FilterPill>
                            ))}
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <span className="mr-1 text-[12px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                                Stores
                            </span>
                            {storeOptions.map((option, index) => (
                                <FilterPill key={option} active={index === 0}>
                                    {option}
                                </FilterPill>
                            ))}
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            <span className="mr-1 text-[12px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                                Type
                            </span>
                            {dealOptions.map((option, index) => (
                                <FilterPill key={option} active={index === 0}>
                                    {option}
                                </FilterPill>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-[13px] text-muted-foreground">
                        <Sparkles className="h-4 w-4 text-primary" />
                        <span>Showing 8 verified offers today</span>
                    </div>
                    <Link
                        href="/shops"
                        className="text-[13px] font-semibold text-primary hover:text-primary-hover"
                    >
                        Browse stores
                    </Link>
                </div>

                <div className="mt-6 grid gap-4 lg:grid-cols-2">
                    {coupons.map(item => (
                        <CouponCard key={item.slug} item={item} />
                    ))}
                </div>

                <Pagination />
            </section>
        </PublicPageShell>
    );
}
