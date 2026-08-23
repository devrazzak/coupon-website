'use client';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import {
    BellDot,
    ChevronDown,
    Globe,
    LogOut,
    Menu,
    Settings,
    User,
} from 'lucide-react';
import { useLocale } from 'next-intl';
import { locales } from '@/i18n';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import DropdownMenu, { DropdownItem, DropdownSeparator } from './DropdownMenu';

interface AdminHeaderProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
}

export default function AdminHeader({
    sidebarOpen,
    setSidebarOpen,
}: AdminHeaderProps) {
    const router = useRouter();
    const pathname = usePathname();
    const locale = useLocale();
    const pathnameLocale = pathname.split('/')[1];
    const selectedLocale = locales.includes(pathnameLocale)
        ? pathnameLocale
        : locale;
    const { logout, user } = useAuth();

    const languages = [
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Español' },
        { code: 'bn', name: 'বাংলা' },
    ];

    const switchLanguage = (lang: string) => {
        if (lang === selectedLocale) return;

        const segments = pathname.split('/');
        segments[1] = lang;
        router.push(segments.join('/'));
    };

    const handleLogout = () => {
        logout();
    };

    return (
        <header className="h-16 bg-white shadow-sm fixed top-0 left-0 right-0 z-30">
            <div className="h-full px-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        <Menu className="w-5 h-5" />
                    </Button>
                    <span className="font-bold text-xl">Admin Dashboard</span>
                </div>
                <div className="flex items-center gap-4">
                    {/* Language Switcher */}
                    <DropdownMenu
                        trigger={
                            <Button
                                variant="ghost"
                                size="icon"
                                className="flex items-center gap-1"
                            >
                                <Globe className="w-5 h-5" />
                                <ChevronDown className="w-4 h-4" />
                            </Button>
                        }
                        className="w-32"
                        align="right"
                    >
                        {languages.map((lang) => (
                            <DropdownItem
                                key={lang.code}
                                onClick={() => switchLanguage(lang.code)}
                                className={
                                    selectedLocale === lang.code ? 'bg-gray-100' : ''
                                }
                            >
                                {lang.name}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>

                    {/* Notifications */}
                    <Button variant="ghost" size="icon">
                        <BellDot className="w-5 h-5" />
                    </Button>

                    {/* Profile Menu */}
                    <DropdownMenu
                        trigger={
                            <Button
                                variant="ghost"
                                size="icon"
                                className="flex items-center gap-1"
                            >
                                <User className="w-5 h-5" />
                                <ChevronDown className="w-4 h-4" />
                            </Button>
                        }
                        className="w-56"
                        align="right"
                    >
                        <div className="px-4 py-2 border-b border-gray-100">
                            <div className="text-sm font-medium">
                                {user?.name}
                            </div>
                            <div className="text-xs text-gray-500">
                                {user?.email}
                            </div>
                        </div>
                        <Link href={`/${locale}/admin/profile`} passHref>
                            <DropdownItem>
                                <User className="w-4 h-4" />
                                <span className="ml-2">Profile</span>
                            </DropdownItem>
                        </Link>
                        <Link href={`/${locale}/admin/settings`} passHref>
                            <DropdownItem>
                                <Settings className="w-4 h-4" />
                                <span className="ml-2">Settings</span>
                            </DropdownItem>
                        </Link>
                        <DropdownSeparator />
                        <DropdownItem onClick={handleLogout}>
                            <LogOut className="w-4 h-4" />
                            <span className="ml-2">Logout</span>
                        </DropdownItem>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}
