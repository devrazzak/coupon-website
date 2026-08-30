import Link from 'next/link';

import {
    HeartPulse,
    Laptop,
    LayoutGrid,
    type LucideIcon,
    Plane,
    Shirt,
    Sofa,
    Sparkles,
    UtensilsCrossed,
} from 'lucide-react';

import PATHS from '@/routes/path';
import { categories } from '@/utils/coupello';

import { SectionHeading } from './SectionHeading';

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

export function Categories() {
    return (
        <section className="border-t border-border/70 bg-surface/70 py-14 md:py-18">
            <div className="container-page">
                <SectionHeading
                    title="Browse Top Categories"
                    subtitle="Explore discounts, cash back & coupons across popular shopping departments."
                    action="View All Categories"
                    actionHref={PATHS.categories}
                />
                <ul className="grid grid-cols-2 gap-3.5 sm:grid-cols-4 lg:grid-cols-8">
                    {categories.map(category => {
                        const Icon = icons[category.icon as keyof typeof icons];
                        const style = categoryStyles[category.icon] || {
                            bg: 'bg-primary-light text-primary',
                            text: 'text-primary',
                        };

                        return (
                            <li key={category.name}>
                                <Link
                                    href="#coupons"
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
    );
}
