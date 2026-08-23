'use client';

import { LoginForm } from '@/components/auth/LoginForm';

export default function LoginPage() {
    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-3xl font-bold">Welcome back</h2>
                <p className="text-gray-600 mt-2">
                    Please sign in to your account
                </p>
            </div>
            <LoginForm />
        </div>
    );
}
