'use client';

import AdminMenu from '@/components/dashboard/AdminMenu';
import AdminHeader from '@/components/dashboard/AdminHeader';
import { useState } from 'react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="min-h-screen bg-gray-50">
            <AdminHeader
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            {/* Sidebar */}
            <div
                className={`fixed left-0 top-16 h-[calc(100vh-4rem)] transition-transform duration-300 ease-in-out z-20 ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <AdminMenu />
            </div>

            {/* Main Content */}
            <main
                className={`pt-16 transition-all duration-300 ease-in-out ${
                    sidebarOpen ? 'pl-64' : 'pl-0'
                }`}
            >
                <div className="p-8">{children}</div>
            </main>
        </div>
    );
}
