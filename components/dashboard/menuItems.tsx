import { Database, HelpCircle, Settings2, Store } from 'lucide-react';
import React from 'react';

export type MenuItem = {
    id: string;
    title: string;
    path?: string;
    icon?: React.ReactNode;
    submenu?: MenuItem[];
};

export const menuItems: MenuItem[] = [
    // Previous items remain...
    {
        id: 'inventory',
        title: 'Inventory',
        icon: <Database className="w-5 h-5" />,
        submenu: [
            {
                id: 'stock-management',
                title: 'Stock Management',
                submenu: [
                    {
                        id: 'stock-operations',
                        title: 'Operations',
                        submenu: [
                            {
                                id: 'stock-in',
                                title: 'Stock In',
                                path: '/admin/inventory/stock/in',
                            },
                            {
                                id: 'stock-out',
                                title: 'Stock Out',
                                path: '/admin/inventory/stock/out',
                            },
                            {
                                id: 'stock-transfer',
                                title: 'Stock Transfer',
                                path: '/admin/inventory/stock/transfer',
                            },
                        ],
                    },
                ],
            },
            {
                id: 'warehouse',
                title: 'Warehouse',
                submenu: [
                    {
                        id: 'warehouse-list',
                        title: 'Warehouses',
                        path: '/admin/inventory/warehouse/list',
                    },
                    {
                        id: 'warehouse-capacity',
                        title: 'Capacity Planning',
                        path: '/admin/inventory/warehouse/capacity',
                    },
                ],
            },
        ],
    },
    {
        id: 'vendor',
        title: 'Vendor Management',
        icon: <Store className="w-5 h-5" />,
        submenu: [
            {
                id: 'vendor-operations',
                title: 'Operations',
                submenu: [
                    {
                        id: 'vendor-management',
                        title: 'Vendors',
                        submenu: [
                            {
                                id: 'vendor-list',
                                title: 'All Vendors',
                                path: '/admin/vendors/list',
                            },
                            {
                                id: 'vendor-add',
                                title: 'Add Vendor',
                                path: '/admin/vendors/add',
                            },
                            {
                                id: 'vendor-verification',
                                title: 'Verification',
                                path: '/admin/vendors/verify',
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: 'support',
        title: 'Support',
        icon: <HelpCircle className="w-5 h-5" />,
        submenu: [
            {
                id: 'ticket-management',
                title: 'Ticket Management',
                submenu: [
                    {
                        id: 'ticket-operations',
                        title: 'Operations',
                        submenu: [
                            {
                                id: 'ticket-list',
                                title: 'All Tickets',
                                path: '/admin/support/tickets',
                            },
                            {
                                id: 'ticket-pending',
                                title: 'Pending',
                                path: '/admin/support/tickets/pending',
                            },
                            {
                                id: 'ticket-escalated',
                                title: 'Escalated',
                                path: '/admin/support/tickets/escalated',
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        id: 'system',
        title: 'System',
        icon: <Settings2 className="w-5 h-5" />,
        submenu: [
            {
                id: 'system-settings',
                title: 'Settings',
                submenu: [
                    {
                        id: 'general-settings',
                        title: 'General',
                        submenu: [
                            {
                                id: 'site-settings',
                                title: 'Site Settings',
                                path: '/admin/settings/site',
                            },
                            {
                                id: 'security',
                                title: 'Security',
                                path: '/admin/settings/security',
                            },
                            {
                                id: 'backups',
                                title: 'Backups',
                                path: '/admin/settings/backups',
                            },
                        ],
                    },
                ],
            },
        ],
    },
];
