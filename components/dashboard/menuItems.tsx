import {
    BookOpenText,
    FolderOpen,
    Image as ImageIcon,
    LayoutDashboard,
    Store,
    Tag,
} from 'lucide-react';
import React from 'react';

export type MenuItem = {
    id: string;
    title: string;
    path?: string;
    icon?: React.ReactNode;
    submenu?: MenuItem[];
};

export const menuItems: MenuItem[] = [
    {
        id: 'dashboard',
        title: 'Dashboard',
        icon: <LayoutDashboard className="h-5 w-5" />,
        path: '/admin',
    },
    {
        id: 'categories',
        title: 'Categories',
        icon: <FolderOpen className="h-5 w-5" />,
        path: '/admin/categories',
    },
    {
        id: 'stores',
        title: 'Stores',
        icon: <Store className="h-5 w-5" />,
        path: '/admin/stores',
    },
    {
        id: 'coupons',
        title: 'Coupons',
        icon: <Tag className="h-5 w-5" />,
        path: '/admin/coupons',
    },
    {
        id: 'blog',
        title: 'Blog',
        icon: <BookOpenText className="h-5 w-5" />,
        path: '/admin/blog',
    },
    {
        id: 'media',
        title: 'Media',
        icon: <ImageIcon className="h-5 w-5" />,
        path: '/admin/media',
    },
];
