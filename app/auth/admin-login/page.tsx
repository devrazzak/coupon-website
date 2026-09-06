'use client';

import { useRouter } from 'next/navigation';

import { useLocale } from 'next-intl';
import { useEffect } from 'react';

import { LoginForm } from '@/components/auth/LoginForm';
import { useAuth } from '@/hooks/useAuth';

export default function AdminLoginPage() {
    const { isAuthenticated, user } = useAuth();
    const router = useRouter();
    const locale = useLocale();

    useEffect(() => {
        if (isAuthenticated && user) {
            if (user.role === 'admin') {
                router.push(`/${locale}/admin`);
            } else {
                router.push(`/${locale}/${user.role}`);
            }
        }
    }, [isAuthenticated, user, router, locale]);

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-3xl font-bold">Admin Login</h2>
                <p className="text-gray-600 mt-2">Please sign in to your admin account</p>
            </div>
            <LoginForm type="admin" />
        </div>
    );
}
