'use client';

import { useState } from 'react';

import AdminHeader from '@/components/dashboard/AdminHeader';
import AdminMenu from '@/components/dashboard/AdminMenu';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="min-h-screen bg-background text-foreground">
            <AdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <div
                className={`fixed left-0 top-16 z-30 h-[calc(100vh-4rem)] border-r border-border bg-card shadow-soft transition-transform duration-200 ease-in-out ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <AdminMenu />
            </div>

            <main
                className={`min-h-[calc(100vh-4rem)] pt-16 transition-all duration-200 ease-in-out ${
                    sidebarOpen ? 'md:pl-72' : 'pl-0'
                }`}
            >
                <div className="container-page py-6 md:py-8">{children}</div>
            </main>
        </div>
    );
}
