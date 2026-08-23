'use client';

import { LoginForm } from '@/components/auth/LoginForm';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminLoginPage() {
    const { isAuthenticated, user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isAuthenticated && user) {
            if (user.role === 'admin') {
                router.push('/admin');
            } else {
                router.push(`/${user.role}`);
            }
        }
    }, [isAuthenticated, user, router]);

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-3xl font-bold">Admin Login</h2>
                <p className="text-gray-600 mt-2">
                    Please sign in to your admin account
                </p>
            </div>
            <LoginForm type="admin" />
        </div>
    );
}
