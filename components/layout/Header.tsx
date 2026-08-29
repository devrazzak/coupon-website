'use client';

import Link from 'next/link';

import { Menu, Search, X } from 'lucide-react';
import { useState } from 'react';

import { Logo } from '../Logo';

const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Stores', href: '/shops' },
    { label: 'Categories', href: '/categories' },
    { label: 'Top Coupons', href: '/coupons' },
    { label: 'Blog', href: '/blog' },
];

export function Header() {
    const [open, setOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
            <div className="container-page flex h-16 items-center gap-4 md:h-[68px]">
                <Logo />

                <nav aria-label="Main" className="hidden flex-1 lg:block">
                    <ul className="flex items-center gap-6 xl:gap-7">
                        {navItems.map(item => {
                            const active = item.href === '/';
                            return (
                                <li key={item.label}>
                                    <Link
                                        href={item.href}
                                        aria-current={active ? 'page' : undefined}
                                        className={`relative block py-5 text-[14px] font-medium transition-colors ${
                                            active
                                                ? 'text-primary'
                                                : 'text-muted-foreground hover:text-foreground'
                                        }`}
                                    >
                                        {item.label}
                                        {active && (
                                            <span className="absolute bottom-0 left-0 h-[3px] w-full rounded-t bg-primary" />
                                        )}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <div className="ml-auto flex items-center gap-2 md:gap-3">
                    <div className="relative hidden xl:block">
                        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle-foreground" />
                        <input
                            type="search"
                            aria-label="Search coupons and stores"
                            placeholder="Search 50,000+ stores & coupons..."
                            className="h-9 w-[220px] rounded-full border border-border bg-muted/50 pl-9 pr-3 text-[13px] text-foreground outline-none transition-all placeholder:text-subtle-foreground focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/15 2xl:w-[260px]"
                        />
                    </div>

                    <Link
                        href="#extension"
                        className="hidden items-center gap-1.5 rounded-full border border-secondary-brand/40 bg-secondary-brand-light px-3.5 py-1.5 text-[12.5px] font-bold text-secondary-brand-strong transition-all hover:border-secondary-brand hover:shadow-sm sm:inline-flex"
                    >
                        <span className="h-2 w-2 rounded-full bg-secondary-brand animate-pulse" />
                        Get Extension{' '}
                        <span className="text-[11px] font-normal text-muted-foreground">
                            • Free
                        </span>
                    </Link>

                    <Link
                        href="/auth/login"
                        className="hidden h-9 items-center rounded-full border border-border px-4 text-[13px] font-medium text-foreground transition-colors hover:bg-muted sm:inline-flex"
                    >
                        Sign in
                    </Link>
                    <Link
                        href="/register"
                        className="hidden h-9 items-center rounded-full bg-primary px-4 text-[13px] font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary-hover hover:shadow-primary sm:inline-flex"
                    >
                        Join Free
                    </Link>

                    <button
                        type="button"
                        onClick={() => setOpen(v => !v)}
                        aria-label={open ? 'Close menu' : 'Open menu'}
                        aria-expanded={open}
                        className="grid h-9 w-9 place-items-center rounded-lg border border-border text-foreground transition-colors hover:bg-muted lg:hidden"
                    >
                        {open ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
                    </button>
                </div>
            </div>

            {open && (
                <div className="border-t border-border bg-background lg:hidden">
                    <div className="container-page py-4">
                        <div className="relative mb-4 md:hidden">
                            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-accent" />
                            <input
                                type="search"
                                aria-label="Search coupons and stores"
                                placeholder="Search coupons, stores..."
                                className="h-10 w-full rounded-md border border-border bg-background pl-9 pr-3 text-sm outline-none placeholder:text-accent focus:border-primary"
                            />
                        </div>
                        <ul className="grid gap-1">
                            {navItems.map(item => (
                                <li key={item.label}>
                                    <Link
                                        href={item.href}
                                        className={`block rounded-md px-3 py-2.5 text-sm font-medium ${
                                            item.href === '/'
                                                ? 'bg-primary-light text-primary'
                                                : 'text-muted-foreground'
                                        }`}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-4 grid grid-cols-2 gap-3 sm:hidden">
                            <Link
                                href="#"
                                className="inline-flex h-10 items-center justify-center rounded-md border border-border text-sm font-medium"
                            >
                                Login
                            </Link>
                            <Link
                                href="#"
                                className="inline-flex h-10 items-center justify-center rounded-md bg-primary text-sm font-semibold text-primary-foreground"
                            >
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;
