'use client';

import { AlertTriangle } from 'lucide-react';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('App Router caught error:', error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <div className="max-w-md w-full p-8 bg-white rounded-2xl shadow-lg border border-gray-100 text-center space-y-5">
                <div className="w-14 h-14 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto">
                    <AlertTriangle className="w-7 h-7" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-gray-900">Something went wrong</h2>
                    <p className="text-sm text-gray-600">
                        {error?.message || 'An unexpected error occurred while loading this page.'}
                    </p>
                </div>
                <div className="pt-2">
                    <Button
                        onClick={() => reset()}
                        className="w-full bg-[#18352b] hover:bg-[#234d3f] text-white py-2.5 rounded-xl font-semibold"
                    >
                        Try Again
                    </Button>
                </div>
            </div>
        </div>
    );
}
