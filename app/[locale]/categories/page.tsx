import Link from 'next/link';

import { Search } from 'lucide-react';

import {
    CategoryCard,
    FilterPill,
    PageHeader,
    Pagination,
    PublicPageShell,
} from '@/components/public/page-layout';
import { categories } from '@/utils/public-content';

export default function CategoriesPage() {
    return (
        <PublicPageShell>
            <PageHeader
                eyebrow="Browse by category"
                title="Categories"
                description="Explore the most popular savings categories and find daily deals across fashion, travel, tech, home and more."
            />

            <section className="container-page py-8 md:py-10">
                <div className="rounded-3xl border border-border bg-card p-4 shadow-soft md:p-5">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="relative w-full max-w-xl">
                            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <input
                                aria-label="Search categories"
                                placeholder="Search categories..."
                                className="h-11 w-full rounded-full border border-border bg-background pl-10 pr-3 text-[14px] text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10"
                            />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <FilterPill active>Popular</FilterPill>
                            <FilterPill>Newest</FilterPill>
                            <FilterPill>Most Deals</FilterPill>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <div className="mb-5 flex items-center justify-between gap-3">
                        <h2 className="font-display text-[28px] font-extrabold tracking-tight text-foreground">
                            Popular categories
                        </h2>
                        <Link
                            href="/coupons"
                            className="text-[13px] font-semibold text-primary hover:text-primary-hover"
                        >
                            View all offers
                        </Link>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        {categories
                            .filter(item => item.popular)
                            .map(category => (
                                <CategoryCard key={category.slug} item={category} />
                            ))}
                    </div>
                </div>

                <div className="mt-10">
                    <h2 className="mb-5 font-display text-[28px] font-extrabold tracking-tight text-foreground">
                        All categories
                    </h2>
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        {categories.map(category => (
                            <CategoryCard key={category.slug} item={category} />
                        ))}
                    </div>
                </div>

                <Pagination />
            </section>
        </PublicPageShell>
    );
}
