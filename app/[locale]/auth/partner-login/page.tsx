'use client';

import { LoginForm } from '@/components/auth/LoginForm';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function PartnerLoginPage() {
    const { isAuthenticated, user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (isAuthenticated && user) {
            router.push(`/partner/${user.id}`);
        }
    }, [isAuthenticated, user, router]);

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-3xl font-bold">Partner Login</h2>
                <p className="text-gray-600 mt-2">
                    Please sign in to your partner account
                </p>
            </div>
            <LoginForm type="partner" />
        </div>
    );
}
