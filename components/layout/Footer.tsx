'use client';

import { ArrowUp, X } from 'lucide-react';

import { BrandMark } from '../Logo';

const columns = [
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
            { label: 'FAQs', href: '/contact' },
            { label: 'Coupon Directory', href: '/coupons' },
            { label: 'Store Directory', href: '/stores' },
            { label: 'Blog', href: '/blog' },
        ],
    },
    {
        title: 'Popular Stores',
        links: [
            { label: 'Amazon', href: '/stores/amazon' },
            { label: 'Nike', href: '/stores/nike' },
            { label: 'Target', href: '/stores/target' },
            { label: 'ASOS', href: '/stores/asos' },
            { label: 'Sephora', href: '/stores/sephora' },
        ],
    },
    {
        title: 'Categories',
        links: [
            { label: 'Fashion', href: '/categories/fashion' },
            { label: 'Electronics', href: '/categories/electronics' },
            { label: 'Travel', href: '/categories/travel' },
            { label: 'Beauty', href: '/categories/beauty' },
            { label: 'All Categories', href: '/categories' },
        ],
    },
];

const socials = [X, X, X, X];

const Footer = () => {
    return (
        <footer className="bg-foreground text-primary-foreground">
            <div className="container-page py-12 md:py-14">
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
                    <div>
                        <div className="flex items-center gap-2">
                            <BrandMark className="h-9 w-9" />
                            <span className="font-display text-xl font-extrabold tracking-tight">
                                Coupello
                            </span>
                        </div>
                        <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-primary-foreground/60">
                            Your trusted destination for verified coupons, promo codes &amp; best
                            deals. Save more on every purchase.
                        </p>
                        <ul className="mt-5 flex gap-2.5">
                            {socials.map((Icon, i) => (
                                <li key={i}>
                                    <a
                                        href="#"
                                        aria-label={`Coupello on social network ${i + 1}`}
                                        className="grid h-8 w-8 place-items-center rounded-full bg-primary-foreground/10 transition-colors hover:bg-primary"
                                    >
                                        <Icon className="h-3.5 w-3.5" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {columns.map(column => (
                        <nav key={column.title} aria-label={column.title}>
                            <h3 className="font-display text-[13.5px] font-bold">{column.title}</h3>
                            <ul className="mt-4 grid gap-2.5">
                                {column.links.map(link => (
                                    <li key={link.label}>
                                        <a
                                            href={link.href}
                                            className="text-[13px] text-primary-foreground/60 transition-colors hover:text-primary-foreground"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    ))}
                </div>

                <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-primary-foreground/10 pt-6 sm:flex-row">
                    <p className="text-[12px] text-primary-foreground/50">
                        © 2026 Coupello. All Rights Reserved.
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
