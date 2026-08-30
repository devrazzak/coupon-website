'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Menu, Search, X } from 'lucide-react';
import { useState } from 'react';

import PATH from '@/routes/path';

import { Logo } from '../Logo';

const navItems = [
    { label: 'Home', href: PATH.home },
    { label: 'Stores', href: PATH.stores },
    { label: 'Categories', href: PATH.categories },
    { label: 'Top Coupons', href: PATH.coupons },
    { label: 'Blog', href: PATH.blog },
];

export function Header() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    const isActive = (href: string) => {
        const normalizedPath = (pathname || '/').replace(/^\/(en|es|bn)(?=\/|$)/, '') || '/';

        if (href === '/') {
            return normalizedPath === '/';
        }

        return normalizedPath === href || normalizedPath.startsWith(`${href}/`);
    };

    return (
        <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
            <div className="container-page flex h-16 items-center gap-4 md:h-[68px]">
                <Logo />

                <nav aria-label="Main" className="hidden flex-1 lg:block">
                    <ul className="flex items-center gap-6 xl:gap-7">
                        {navItems.map(item => {
                            const active = isActive(item.href);
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
                                            <span className="absolute bottom-0 left-0 h-0.75 w-full rounded-t bg-primary" />
                                        )}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <div className="ml-auto flex items-center gap-2 md:gap-3 w-100">
                    <div className="relative hidden xl:block w-full">
                        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle-foreground" />
                        <input
                            type="search"
                            aria-label="Search coupons and stores"
                            placeholder="Search for stores & offers or coupon"
                            className="h-11 w-full rounded-sm border border-border pl-9 pr-3 text-base text-foreground outline-none transition-all placeholder:text-subtle-foreground focus:border-primary focus:outline-none"
                        />
                    </div>
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
                                className="h-10 w-full rounded-sm border border-border bg-background pl-9 pr-3 text-sm outline-none placeholder:text-accent focus:border-primary"
                            />
                        </div>
                        <ul className="grid gap-1">
                            {navItems.map(item => {
                                const active = isActive(item.href);

                                return (
                                    <li key={item.label}>
                                        <Link
                                            href={item.href}
                                            className={`block rounded-sm px-3 py-2.5 text-sm font-medium ${
                                                active
                                                    ? 'bg-primary-light text-primary'
                                                    : 'text-muted-foreground'
                                            }`}
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;
