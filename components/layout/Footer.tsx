'use client';

import Link from 'next/link';

import { ArrowUp } from 'lucide-react';

import PATHS from '@/routes/path';
import siteConfig from '@/utils/SiteConfig';
import type { PublicCategory } from '@/utils/api/category';
import type { PublicStore } from '@/utils/api/store';
import { useGetPublicCategories } from '@/utils/hooks/category';
import { useGetPublicStores } from '@/utils/hooks/store';

import { Logo } from '../Logo';

const staticColumns = [
    {
        title: 'Company',
        links: [
            { label: 'About Us', href: '/about' },
            { label: 'Contact Us', href: '/contact' },
            { label: 'Privacy Policy', href: '/privacy-policy' },
            { label: 'Terms & Conditions', href: '/terms-and-conditions' },
            { label: 'Affiliate Disclosure', href: '/affiliate-disclosure' },
        ],
    },
    {
        title: 'Help & Support',
        links: [
            { label: 'How It Works', href: '/how-it-works' },
            { label: 'FAQs', href: '/faqs' },
            { label: 'Coupon Directory', href: '/coupons' },
            { label: 'Store Directory', href: '/stores' },
            { label: 'Blog', href: '/blog' },
        ],
    },
];

interface FooterLink {
    label: string;
    href: string;
}

function FooterNav({
    title,
    rows,
    loading,
}: {
    title: string;
    rows: FooterLink[];
    loading?: boolean;
}) {
    return (
        <nav aria-label={title}>
            <h3 className="font-display text-[13.5px] font-bold">{title}</h3>
            <ul className="mt-4 grid gap-2.5">
                {loading
                    ? Array.from({ length: 4 }).map((_, i) => (
                          <li key={i}>
                              <span className="block h-3 w-24 animate-pulse rounded bg-primary-foreground/10" />
                          </li>
                      ))
                    : rows.map(row => (
                          <li key={row.label}>
                              <Link
                                  href={row.href}
                                  className="text-[13px] text-primary-foreground/60 transition-colors hover:text-primary-foreground"
                                  aria-label={row.label}
                              >
                                  {row.label}
                              </Link>
                          </li>
                      ))}
            </ul>
        </nav>
    );
}

const Footer = () => {
    // "Popular Stores" & "Categories" come from the same public APIs the header
    // search uses, so they reflect live data.
    const { data: storesData, isLoading: storesLoading } = useGetPublicStores({
        page: 1,
        limit: 5,
    });
    const { data: categoriesData, isLoading: categoriesLoading } = useGetPublicCategories(1, 5);

    const stores = (storesData?.data?.data ?? []) as PublicStore[];
    const categories = (categoriesData?.data?.data ?? []) as PublicCategory[];

    const popularStoreRows: FooterLink[] = stores.slice(0, 5).map(store => ({
        label: store.name,
        href: `${PATHS.stores}/${encodeURIComponent(store.slug)}`,
    }));

    const categoryRows: FooterLink[] = categories.slice(0, 4).map(category => ({
        label: category.name,
        href: `${PATHS.categories}/${encodeURIComponent(category.slug)}`,
    }));

    return (
        <footer className="bg-foreground text-primary-foreground">
            <div className="container-page py-12 md:py-14">
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
                    <div>
                        <div className="flex items-center gap-2">
                            <Logo variant="white" />
                        </div>
                        <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-primary-foreground/60">
                            Your trusted destination for verified coupons, promo codes &amp; best
                            deals. Save more on every purchase.
                        </p>
                    </div>

                    <FooterNav title="Company" rows={staticColumns[0].links} />
                    <FooterNav title="Help & Support" rows={staticColumns[1].links} />

                    <FooterNav
                        title="Popular Stores"
                        rows={popularStoreRows}
                        loading={storesLoading}
                    />

                    <FooterNav
                        title="Categories"
                        rows={[
                            ...categoryRows,
                            { label: 'All Categories', href: PATHS.categories },
                        ]}
                        loading={categoriesLoading}
                    />
                </div>

                <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-primary-foreground/10 pt-6 sm:flex-row">
                    <p className="text-[12px] text-primary-foreground/50">
                        © 2026 {siteConfig.company_name}. All Rights Reserved.
                    </p>
                    <button
                        type="button"
                        onClick={() => {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="inline-flex items-center gap-1.5 text-[12px] text-primary-foreground/60 transition-colors hover:text-primary-foreground"
                    >
                        Back to Top
                        <ArrowUp className="h-3.5 w-3.5" />
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
