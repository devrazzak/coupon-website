'use client';

import Image from 'next/image';
import Link from 'next/link';

import {
    ArrowLeft,
    ArrowRight,
    BadgeCheck,
    ChevronRight,
    Clock,
    Flame,
    HeartPulse,
    Laptop,
    LayoutGrid,
    type LucideIcon,
    Percent,
    Plane,
    Scissors,
    Shirt,
    Sofa,
    Sparkles,
    UtensilsCrossed,
} from 'lucide-react';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Nike from '@/public/images/shops/nike.jpg';
import PATHS from '@/routes/path';
import { type PublicStore } from '@/utils/api/store';
import { Coupon } from '@/utils/coupello';
import { type CouponListItem } from '@/utils/public-content';

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

type CouponCardItem = Coupon | CouponListItem;

export function CouponCard<T extends CouponCardItem>({
    coupon,
    onShow,
}: {
    coupon: T;
    onShow?: (c: T) => void;
}) {
    // Extract discount amount for bold display if present
    const discountMatch = coupon.title.match(/(\d+%\s*OFF|\$\d+\s*OFF|Flat\s*\d+%\s*OFF)/i);
    const discountText = discountMatch ? discountMatch[0] : 'HOT DEAL';

    return (
        <li className="group border-b border-border/70 last:border-b-0 transition-colors hover:bg-surface/50">
            <div className="flex flex-col gap-4 px-5 py-4 md:flex-row md:items-center md:gap-6">
                {/* Store Logo & Discount Badge */}
                <div className="flex items-center gap-3.5 md:w-[130px] md:shrink-0 md:flex-col md:items-start md:gap-2">
                    <Image
                        src={Nike.src}
                        alt={coupon.store}
                        width={96}
                        height={68}
                        className="rounded-lg border border-border bg-card p-2"
                    />
                    <span className="inline-flex items-center gap-1 rounded-md bg-primary-light px-2 py-0.5 text-[11px] font-extrabold text-primary">
                        <Percent className="h-3 w-3" />
                        {discountText}
                    </span>
                </div>

                {/* Deal Content & Metadata */}
                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        {coupon.badge && (
                            <span
                                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10.5px] font-extrabold uppercase tracking-wide ${
                                    coupon.badge.tone === 'amber'
                                        ? 'bg-secondary-brand-light text-secondary-brand-strong'
                                        : 'bg-emerald-100 text-emerald-700'
                                }`}
                            >
                                <Flame className="h-3 w-3" />
                                {coupon.badge.label}
                            </span>
                        )}
                        <span className="text-[12px] font-semibold text-muted-foreground">
                            {coupon.store}
                        </span>
                    </div>

                    <h3 className="font-display text-[16.5px] font-bold leading-snug text-foreground md:text-[18px] group-hover:text-primary transition-colors">
                        {coupon.title}
                    </h3>
                    <p className="mt-1 text-[13px] text-muted-foreground line-clamp-1">
                        {coupon.description}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-x-3.5 gap-y-1 text-[12px] text-muted-foreground">
                        <span className="inline-flex items-center gap-1 font-semibold text-emerald-600">
                            <BadgeCheck className="h-3.5 w-3.5" />
                            Verified Code
                        </span>
                        <span className="text-border">•</span>
                        <span className="inline-flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {coupon.expires}
                        </span>
                    </div>
                </div>

                {/* Coupon Code Reveal Button (Scissor / Perforated Cutout Style) */}
                <div className="md:w-[220px] md:shrink-0">
                    <button
                        type="button"
                        onClick={() => onShow?.(coupon)}
                        className="group/btn relative flex h-12 w-full items-center overflow-hidden rounded-xl bg-primary pl-4 pr-[60px] text-left font-bold text-primary-foreground shadow-sm transition-all hover:bg-primary-hover hover:shadow-primary active:scale-[0.99]"
                    >
                        <span className="flex items-center gap-1.5 truncate text-[13.5px] tracking-wide">
                            <Scissors className="h-3.5 w-3.5" />
                            Get Code
                        </span>
                        <span className="absolute right-0 top-0 grid h-full w-[54px] place-items-center overflow-hidden border-l border-dashed border-white/40 bg-black/15 group-hover/btn:bg-black/25 transition-colors">
                            <span className="truncate px-1 font-mono text-[12px] font-extrabold tracking-wider">
                                {coupon.code.slice(0, 3)}…
                            </span>
                        </span>
                    </button>
                </div>
            </div>
        </li>
    );
}

export function StoreCard({ item }: { item: PublicStore }) {
    return (
        <Link
            href={item.website_url || PATHS.shopDetails.replace(':slug', item.slug)}
            target={item.website_url ? '_blank' : undefined}
            rel={item.website_url ? 'noopener noreferrer' : undefined}
            className="group relative flex h-42 flex-col items-center justify-between rounded-xl border border-border bg-card p-3.5 text-center transition-all duration-200 hover:border-primary/50"
        >
            {item.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={item.logo}
                    alt={`${item.name} logo`}
                    className="w-full h-full pb-3 rounded-md object-contain"
                />
            ) : (
                <div className="flex h-full w-full items-center justify-center pb-3">
                    <span className="text-2xl font-extrabold text-muted-foreground">
                        {(item.name || '?').charAt(0).toUpperCase()}
                    </span>
                </div>
            )}
            {/* Footer Info */}
            <div className="flex w-full items-center justify-between border-t border-border/60 pt-2 text-[11px] text-muted-foreground">
                <span className="font-medium text-emerald-600 inline-flex items-center gap-0.5">
                    <BadgeCheck className="h-3 w-3" />
                    Active
                </span>
                <span className="font-semibold text-foreground/80 group-hover:text-primary">
                    {item.short_description || 'N/A'}
                </span>
            </div>
        </Link>
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
            className={`cursor-pointer inline-flex items-center rounded-full border px-3.5 py-2 text-[12.5px] font-semibold transition-colors ${
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
