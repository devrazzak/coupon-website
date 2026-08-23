'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { usePathname } from 'next/navigation';
import { cn } from '@/utils/cn';

export function Sidebar() {
    const { user } = useAuth();
    const pathname = usePathname();

    const routes = {
        admin: [
            { name: 'Dashboard', href: '/admin' },
            { name: 'Users', href: '/admin/users' },
            { name: 'Settings', href: '/admin/settings' },
        ],
        partner: [
            { name: 'Dashboard', href: '/partner' },
            { name: 'Products', href: '/partner/products' },
            { name: 'Analytics', href: '/partner/analytics' },
        ],
        user: [
            { name: 'Dashboard', href: '/user' },
            { name: 'Profile', href: '/user/profile' },
            { name: 'Orders', href: '/user/orders' },
        ],
    };

    const currentRoutes = routes[user?.role || 'user'];

    return (
        <nav className="w-64 bg-white shadow-sm h-[calc(100vh-4rem)]">
            <div className="p-4 space-y-2">
                {currentRoutes.map((route) => (
                    <Link
                        key={route.href}
                        href={route.href}
                        className={cn(
                            'block px-4 py-2 rounded-md text-sm font-medium transition-colors',
                            pathname === route.href
                                ? 'bg-blue-500 text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                        )}
                    >
                        {route.name}
                    </Link>
                ))}
            </div>
        </nav>
    );
}
