import Link from 'next/link';

import {
    HeartPulse,
    Laptop,
    LayoutGrid,
    type LucideIcon,
    Plane,
    Search,
    Shirt,
    Sofa,
    Sparkles,
    UtensilsCrossed,
} from 'lucide-react';

import { FilterPill, PublicPageShell } from '@/components/public/page-layout';
import PATHS from '@/routes/path';
import { categories } from '@/utils/public-content';

const icons = {
    shirt: Shirt,
    laptop: Laptop,
    plane: Plane,
    sparkles: Sparkles,
    utensils: UtensilsCrossed,
    heart: HeartPulse,
    home: Sofa,
    grid: LayoutGrid,
} satisfies Record<string, LucideIcon>;

const categoryStyles: Record<string, { bg: string; text: string }> = {
    shirt: { bg: 'bg-rose-50 text-rose-600', text: 'text-rose-600' },
    laptop: { bg: 'bg-blue-50 text-blue-600', text: 'text-blue-600' },
    plane: { bg: 'bg-sky-50 text-sky-600', text: 'text-sky-600' },
    sparkles: { bg: 'bg-fuchsia-50 text-fuchsia-600', text: 'text-fuchsia-600' },
    utensils: { bg: 'bg-amber-50 text-amber-600', text: 'text-amber-600' },
    heart: { bg: 'bg-emerald-50 text-emerald-600', text: 'text-emerald-600' },
    home: { bg: 'bg-orange-50 text-orange-600', text: 'text-orange-600' },
    grid: { bg: 'bg-primary-light text-primary', text: 'text-primary' },
};

export default function CategoriesPage() {
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
                            <FilterPill active>All</FilterPill>
                            <FilterPill>Popular</FilterPill>
                            <FilterPill>Newest</FilterPill>
                            <FilterPill>Most Deals</FilterPill>
                        </div>
                    </div>
                </div>

                <div className="mt-10">
                    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
                        {categories.map((category: any, index: number) => {
                            const Icon = icons[category.icon as keyof typeof icons];
                            const style = categoryStyles[category.icon] || {
                                bg: 'bg-primary-light text-primary',
                                text: 'text-primary',
                            };

                            return (
                                <li key={index}>
                                    <Link
                                        href={PATHS.categoryDetails.replace(':slug', category.slug)}
                                        className="group flex h-full flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-card px-3 py-6 text-center transition-all duration-200 hover:-translate-y-1.5 hover:border-primary/50"
                                    >
                                        <span
                                            className={`grid h-12 w-12 place-items-center rounded-2xl ${style.bg} transition-transform duration-200 group-hover:scale-110`}
                                        >
                                            <Icon className="h-6 w-6" strokeWidth={2.2} />
                                        </span>
                                        <div>
                                            <h3 className="font-display text-[13.5px] font-bold text-foreground group-hover:text-primary transition-colors">
                                                {category.name}
                                            </h3>
                                            <p className="mt-0.5 text-[11.5px] font-medium text-muted-foreground">
                                                {category.count}
                                            </p>
                                        </div>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </section>
        </PublicPageShell>
    );
}
