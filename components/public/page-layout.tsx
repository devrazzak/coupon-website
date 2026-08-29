import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';

import { ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react';

import { StoreLogo } from '@/components/Logo';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { categories as categoryList, coupons, stores } from '@/utils/public-content';

export function PublicPageShell({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
            <Header />
            <main className="bg-background">{children}</main>
            <Footer />
        </div>
    );
}

export function PageHeader({
    eyebrow,
    title,
    description,
    actions,
}: {
    eyebrow?: string;
    title: string;
    description?: string;
    actions?: React.ReactNode;
}) {
    return (
        <div className="border-b border-border bg-surface/60">
            <div className="container-page py-10 md:py-14">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-3xl">
                        {eyebrow && (
                            <span className="inline-flex rounded-full border border-primary/20 bg-primary-light px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
                                {eyebrow}
                            </span>
                        )}
                        <h1 className="mt-4 font-display text-[30px] font-extrabold tracking-[-0.04em] text-foreground md:text-[42px]">
                            {title}
                        </h1>
                        {description && (
                            <p className="mt-3 max-w-2xl text-[15px] leading-7 text-muted-foreground md:text-[16px]">
                                {description}
                            </p>
                        )}
                    </div>
                    {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
                </div>
            </div>
        </div>
    );
}

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
    return (
        <nav
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap items-center gap-2 text-[12.5px] text-muted-foreground"
        >
            {items.map((item, index) => (
                <div key={`${item.label}-${index}`} className="flex items-center gap-2">
                    {item.href ? (
                        <Link href={item.href} className="transition-colors hover:text-primary">
                            {item.label}
                        </Link>
                    ) : (
                        <span className="font-medium text-foreground">{item.label}</span>
                    )}
                    {index < items.length - 1 && <ChevronRight className="h-3.5 w-3.5" />}
                </div>
            ))}
        </nav>
    );
}

export function CouponCard({ item }: { item: (typeof coupons)[number] }) {
    return (
        <article className="group h-full rounded-2xl border border-border bg-card p-4 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lift">
            <div className="flex items-start gap-3.5">
                <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border border-border bg-surface p-2">
                    <StoreLogo
                        name={item.store}
                        domain={item.domain}
                        wordmark={item.store.slice(0, 3).toUpperCase()}
                        accentClass="text-foreground"
                        size="sm"
                    />
                </div>
                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-primary-light px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-primary">
                            {item.discount}
                        </span>
                        {item.badge && (
                            <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-amber-700">
                                {item.badge}
                            </span>
                        )}
                    </div>
                    <h3 className="mt-2.5 font-display text-[18px] font-bold text-foreground">
                        {item.title}
                    </h3>
                    <p className="mt-2 text-[13.5px] leading-6 text-muted-foreground">
                        {item.description}
                    </p>
                </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-[12px] text-muted-foreground">
                <span className="font-semibold text-emerald-600">
                    {item.verified ? 'Verified' : 'Deal'}
                </span>
                <span className="text-border">•</span>
                <span>{item.store}</span>
                <span className="text-border">•</span>
                <span>{item.expires}</span>
            </div>

            <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
                <div className="text-left">
                    <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                        Type
                    </p>
                    <p className="mt-1 text-[12.5px] font-semibold text-foreground">{item.type}</p>
                </div>
                <div className="flex gap-2">
                    <Link
                        href={`/coupons/${item.slug}`}
                        className="inline-flex items-center justify-center rounded-full border border-border px-3.5 py-2 text-[12.5px] font-semibold text-foreground transition-colors hover:bg-muted"
                    >
                        View Deal
                    </Link>
                    <Link
                        href={`/coupons/${item.slug}`}
                        className="inline-flex items-center justify-center rounded-full bg-primary px-3.5 py-2 text-[12.5px] font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
                    >
                        {item.type === 'Code' ? 'Get Code' : 'Get Deal'}
                    </Link>
                </div>
            </div>
        </article>
    );
}

export function StoreCard({ item }: { item: (typeof stores)[number] }) {
    return (
        <article className="group h-full rounded-2xl border border-border bg-card p-4 shadow-soft transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lift">
            <div className="flex items-center justify-between gap-3">
                <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border border-border bg-surface p-2">
                    <StoreLogo
                        name={item.name}
                        domain={item.domain}
                        wordmark={item.name.slice(0, 3).toUpperCase()}
                        accentClass="text-foreground"
                        size="sm"
                    />
                </div>
                <span className="rounded-full border border-primary/20 bg-primary-light px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-primary">
                    {item.popular ? 'Popular' : 'Store'}
                </span>
            </div>
            <h3 className="mt-4 font-display text-[18px] font-bold text-foreground">{item.name}</h3>
            <p className="mt-2 text-[13px] leading-6 text-muted-foreground">{item.description}</p>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-[12px] text-muted-foreground">
                <span>{item.couponCount} coupons</span>
                <Link
                    href={`/shops/${item.slug}`}
                    className="inline-flex items-center gap-1 font-semibold text-primary hover:text-primary-hover"
                >
                    View store <ArrowRight className="h-3.5 w-3.5" />
                </Link>
            </div>
        </article>
    );
}

export function CategoryCard({ item }: { item: (typeof categoryList)[number] }) {
    return (
        <article className="group h-full rounded-2xl border border-border bg-card p-4 shadow-soft transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lift">
            <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-light text-primary">
                    <span className="text-lg font-bold">
                        {item.icon === 'shirt'
                            ? 'S'
                            : item.icon === 'laptop'
                              ? 'L'
                              : item.icon === 'plane'
                                ? 'T'
                                : item.icon === 'sparkles'
                                  ? 'B'
                                  : item.icon === 'utensils'
                                    ? 'F'
                                    : item.icon === 'heart'
                                      ? 'H'
                                      : item.icon === 'home'
                                        ? 'H'
                                        : 'A'}
                    </span>
                </span>
                <span className="text-[11px] font-semibold text-muted-foreground">
                    {item.couponCount}+
                </span>
            </div>
            <h3 className="mt-4 font-display text-[18px] font-bold text-foreground">{item.name}</h3>
            <p className="mt-2 text-[13px] leading-6 text-muted-foreground">{item.description}</p>
            <Link
                href={item.slug === 'all-categories' ? '/categories' : `/categories/${item.slug}`}
                className="mt-4 inline-flex items-center gap-1 text-[12.5px] font-semibold text-primary hover:text-primary-hover"
            >
                Explore category <ArrowRight className="h-3.5 w-3.5" />
            </Link>
        </article>
    );
}

export function BlogCard({
    item,
}: {
    item: {
        slug: string;
        title: string;
        excerpt: string;
        category: string;
        author: string;
        date: string;
        readTime: string;
        image: string | StaticImageData;
    };
}) {
    return (
        <article className="group h-full overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lift">
            <div className="relative overflow-hidden">
                <Image
                    src={typeof item.image === 'string' ? item.image : item.image.src}
                    alt={item.title}
                    width={800}
                    height={560}
                    className="aspect-[16/11] w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                />
            </div>
            <div className="flex flex-1 flex-col p-4">
                <span className="inline-flex w-fit rounded bg-primary-light px-2.5 py-1 text-[10.5px] font-semibold text-primary">
                    {item.category}
                </span>
                <h3 className="mt-3 font-display text-[16px] font-bold leading-snug text-foreground">
                    {item.title}
                </h3>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">{item.excerpt}</p>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-[12px] text-muted-foreground">
                    <span>{item.author}</span>
                    <span>{item.date}</span>
                </div>
                <div className="mt-2 text-[12px] text-muted-foreground">{item.readTime}</div>
            </div>
        </article>
    );
}

export function Pagination() {
    return (
        <nav aria-label="Pagination" className="mt-8 flex items-center justify-center gap-2">
            <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:bg-muted"
            >
                <ArrowLeft className="h-4 w-4" />
            </button>
            {[1, 2, 3, 4].map(page => (
                <button
                    key={page}
                    type="button"
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-full text-[13px] font-semibold ${page === 1 ? 'bg-primary text-primary-foreground' : 'border border-border bg-card text-foreground hover:bg-muted'}`}
                >
                    {page}
                </button>
            ))}
            <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:bg-muted"
            >
                <ArrowRight className="h-4 w-4" />
            </button>
        </nav>
    );
}

export function FilterPill({
    active,
    children,
    onClick,
}: {
    active?: boolean;
    children: React.ReactNode;
    onClick?: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`inline-flex items-center rounded-full border px-3.5 py-2 text-[12.5px] font-semibold transition-colors ${
                active
                    ? 'border-primary bg-primary text-primary-foreground shadow-sm'
                    : 'border-border bg-card text-foreground hover:bg-muted'
            }`}
        >
            {children}
        </button>
    );
}

export function StatCard({ value, label }: { value: string; label: string }) {
    return (
        <div className="rounded-2xl border border-border bg-card p-4 shadow-soft">
            <div className="font-display text-[26px] font-extrabold text-foreground">{value}</div>
            <div className="mt-1 text-[12.5px] text-muted-foreground">{label}</div>
        </div>
    );
}
