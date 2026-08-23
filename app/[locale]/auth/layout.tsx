'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useEffect } from 'react';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isAuthenticated, user } = useAuth();
    const router = useRouter();
    const locale = useLocale();

    useEffect(() => {
        if (isAuthenticated && user) {
            switch (user.role) {
                case 'admin':
                    router.push(`/${locale}/admin`);
                    break;
                case 'partner':
                    router.push(`/${locale}/partner`);
                    break;
                case 'user':
                    router.push(`/${locale}/user`);
                    break;
            }
        }
    }, [isAuthenticated, user, router, locale]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
                {children}
            </div>
        </div>
    );
}
