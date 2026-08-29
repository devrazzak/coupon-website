'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { BellDot, ChevronDown, Globe, LogOut, Menu, Settings, Sparkles, User } from 'lucide-react';
import { useLocale } from 'next-intl';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { locales } from '@/i18n';

import DropdownMenu, { DropdownItem, DropdownSeparator } from './DropdownMenu';

interface AdminHeaderProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
}

export default function AdminHeader({ sidebarOpen, setSidebarOpen }: AdminHeaderProps) {
    const router = useRouter();
    const pathname = usePathname();
    const locale = useLocale();
    const pathnameLocale = pathname.split('/')[1];
    const selectedLocale = locales.includes(pathnameLocale) ? pathnameLocale : locale;
    const { logout, user } = useAuth();

    const languages = [
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Español' },
        { code: 'bn', name: 'বাংলা' },
    ];

    const switchLanguage = (newLocale: string) => {
        if (newLocale === selectedLocale) return;

        const segments = pathname.split('/');
        const currentPath = locales.includes(segments[1])
            ? `/${segments.slice(2).join('/')}`
            : pathname;
        const normalizedPath = currentPath === '//' ? '/' : currentPath;

        router.push(normalizedPath === '/' ? `/${newLocale}` : `/${newLocale}${normalizedPath}`);
    };

    const handleLogout = () => {
        logout();
    };

    return (
        <header className="fixed left-0 right-0 top-0 z-40 h-16 border-b border-border bg-card/90 backdrop-blur-sm">
            <div className="flex h-full items-center justify-between gap-4 px-4 md:px-6">
                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="md:hidden"
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                    <div className="flex items-center gap-3">
                        <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary-light text-primary shadow-sm">
                            <Sparkles className="h-4 w-4" />
                        </span>
                        <div>
                            <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
                                Coupello
                            </div>
                            <div className="font-display text-[18px] font-extrabold tracking-[-0.03em] text-foreground">
                                Admin
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                    <DropdownMenu
                        trigger={
                            <Button
                                variant="ghost"
                                size="icon"
                                className="flex items-center gap-1 rounded-full"
                            >
                                <Globe className="h-4 w-4" />
                                <ChevronDown className="h-3.5 w-3.5" />
                            </Button>
                        }
                        className="w-32"
                        align="right"
                    >
                        {languages.map(lang => (
                            <DropdownItem
                                key={lang.code}
                                onClick={() => switchLanguage(lang.code)}
                                className={
                                    selectedLocale === lang.code
                                        ? 'bg-primary-light text-primary'
                                        : ''
                                }
                            >
                                {lang.name}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>

                    <Button variant="ghost" size="icon" className="rounded-full">
                        <BellDot className="h-4 w-4" />
                    </Button>

                    <DropdownMenu
                        trigger={
                            <Button
                                variant="ghost"
                                className="gap-2 rounded-full border border-border bg-background px-2 py-1.5 md:px-3"
                            >
                                <span className="grid h-7 w-7 place-items-center rounded-full bg-primary-light text-primary">
                                    <User className="h-4 w-4" />
                                </span>
                                <span className="hidden text-left md:block">
                                    <span className="block text-[12px] font-semibold text-foreground">
                                        {user?.name}
                                    </span>
                                    <span className="block text-[10px] text-muted-foreground">
                                        Admin
                                    </span>
                                </span>
                                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                            </Button>
                        }
                        className="w-56"
                        align="right"
                    >
                        <div className="border-b border-border px-4 py-2">
                            <div className="text-sm font-semibold text-foreground">
                                {user?.name}
                            </div>
                            <div className="text-xs text-muted-foreground">{user?.email}</div>
                        </div>
                        <Link href={`/${locale}/admin/profile`} passHref>
                            <DropdownItem>
                                <User className="h-4 w-4" />
                                <span className="ml-2">Profile</span>
                            </DropdownItem>
                        </Link>
                        <Link href={`/${locale}/admin/settings`} passHref>
                            <DropdownItem>
                                <Settings className="h-4 w-4" />
                                <span className="ml-2">Settings</span>
                            </DropdownItem>
                        </Link>
                        <DropdownSeparator />
                        <DropdownItem onClick={handleLogout}>
                            <LogOut className="h-4 w-4" />
                            <span className="ml-2">Logout</span>
                        </DropdownItem>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}
