'use client';

import { ArrowUp, X } from 'lucide-react';

import { BrandMark } from '../Logo';

const columns = [
    {
        title: 'Company',
        links: ['About Us', 'Contact Us', 'Careers', 'Privacy Policy', 'Terms & Conditions'],
    },
    {
        title: 'Help & Support',
        links: ['How It Works', 'FAQ', 'Shipping Policy', 'Return Policy', 'Store Directory'],
    },
    {
        title: 'Popular Stores',
        links: ['Amazon', 'Nike', 'Target', 'ASOS', 'Sephora', 'Booking.com'],
    },
    {
        title: 'Categories',
        links: ['Fashion', 'Electronics', 'Travel', 'Beauty', 'Home & Living', 'All Categories'],
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
                                    <li key={link}>
                                        <a
                                            href="#"
                                            className="text-[13px] text-primary-foreground/60 transition-colors hover:text-primary-foreground"
                                        >
                                            {link}
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
