'use client';

import { cn } from '@/utils/cn';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { menuItems } from './menuItems';

type MenuItem = {
    id: string;
    title: string;
    path?: string;
    icon?: React.ReactNode;
    submenu?: MenuItem[];
};

interface MenuDropdownProps {
    item: MenuItem;
    level?: number;
    openMenus: string[];
    setOpenMenus: (menus: string[]) => void;
    parentIds?: string[];
}

const findParentIds = (
    items: MenuItem[],
    targetId: string,
    path: string[] = []
): string[] | null => {
    for (const item of items) {
        if (item.id === targetId) {
            return path;
        }
        if (item.submenu) {
            const found = findParentIds(item.submenu, targetId, [
                ...path,
                item.id,
            ]);
            if (found) {
                return found;
            }
        }
    }
    return null;
};

const MenuDropdown: React.FC<MenuDropdownProps> = ({
    item,
    level = 0,
    openMenus,
    setOpenMenus,
    parentIds = [],
}) => {
    const pathname = usePathname();
    const isOpen = openMenus.includes(item.id);
    const normalizedPathname = pathname.replace(/^\/[^/]+/, '');

    const checkActive = (menuItem: MenuItem): boolean => {
        if (menuItem.path && normalizedPathname === menuItem.path) return true;
        if (menuItem.submenu) {
            return menuItem.submenu.some(
                (subItem) =>
                    (subItem.path && normalizedPathname === subItem.path) ||
                    (subItem.submenu && checkActive(subItem))
            );
        }
        return false;
    };

    const isActive = checkActive(item);

    const findActiveChildMenus = (menuItem: MenuItem): string[] => {
        const activeMenus: string[] = [];

        if (menuItem.submenu) {
            for (const subItem of menuItem.submenu) {
                if (checkActive(subItem)) {
                    activeMenus.push(subItem.id);
                    activeMenus.push(...findActiveChildMenus(subItem));
                }
            }
        }

        return activeMenus;
    };

    const handleToggle = () => {
        if (isOpen) {
            const activeChildMenus = isActive ? findActiveChildMenus(item) : [];
            const menusToKeep = openMenus.filter((id) => {
                if (parentIds.includes(id)) return true;
                if (activeChildMenus.includes(id)) return true;
                const itemParents = findParentIds(menuItems, id) || [];
                return !itemParents.includes(item.id) && id !== item.id;
            });

            setOpenMenus(menusToKeep);
            localStorage.setItem('openMenus', JSON.stringify(menusToKeep));
        } else {
            let newOpenMenus = [...openMenus];

            parentIds.forEach((id) => {
                if (!newOpenMenus.includes(id)) {
                    newOpenMenus.push(id);
                }
            });

            if (level === 0) {
                newOpenMenus = newOpenMenus.filter((id) => {
                    const itemParents = findParentIds(menuItems, id);
                    return itemParents !== null;
                });
            }

            if (!newOpenMenus.includes(item.id)) {
                newOpenMenus.push(item.id);
            }

            if (isActive) {
                const activeChildMenus = findActiveChildMenus(item);
                activeChildMenus.forEach((id) => {
                    if (!newOpenMenus.includes(id)) {
                        newOpenMenus.push(id);
                    }
                });
            }

            setOpenMenus(newOpenMenus);
            localStorage.setItem('openMenus', JSON.stringify(newOpenMenus));
        }
    };

    useEffect(() => {
        if (isActive && !isOpen) {
            const parents = findParentIds(menuItems, item.id) || [];
            if (parents.length > 0 || isActive) {
                const newOpenMenus = [
                    ...new Set([...openMenus, ...parents, item.id]),
                ];
                setOpenMenus(newOpenMenus);
                localStorage.setItem('openMenus', JSON.stringify(newOpenMenus));
            }
        }
    }, [isActive, pathname]);

    const locale = pathname.split('/')[1];

    const menuItemClasses = cn(
        'relative flex items-center w-full transition-all duration-200',
        {
            'text-slate-600': !isActive,
            'text-indigo-600 font-medium': isActive,
            'pl-4': level === 0,
            'pl-12': level === 1,
            'pl-16': level === 2,
            'pl-20': level === 3,
        }
    );

    return (
        <div className="relative">
            {item.path ? (
                <Link
                    href={`/${locale}${item.path}`}
                    className={cn(
                        menuItemClasses,
                        'py-2.5 hover:bg-slate-50 rounded-lg',
                        {
                            'bg-indigo-50 font-medium': isActive,
                        }
                    )}
                >
                    {level === 0 && (
                        <span className="text-slate-400 mr-3 [&>svg]:w-5 [&>svg]:h-5">
                            {item.icon}
                        </span>
                    )}
                    <span className="text-sm whitespace-nowrap">
                        {item.title}
                    </span>
                    {isActive && (
                        <span className="absolute inset-y-0 left-0 w-1 bg-indigo-600 rounded-r-full" />
                    )}
                </Link>
            ) : (
                <button
                    onClick={handleToggle}
                    className={cn(
                        menuItemClasses,
                        'py-2.5 pr-4 hover:bg-slate-50 rounded-lg',
                        {
                            'bg-slate-50 font-medium': isOpen,
                        }
                    )}
                >
                    {level === 0 && (
                        <span className="text-slate-400 mr-3 [&>svg]:w-5 [&>svg]:h-5">
                            {item.icon}
                        </span>
                    )}
                    <span className="text-sm whitespace-nowrap">
                        {item.title}
                    </span>
                    <ChevronDown
                        className={cn(
                            'ml-auto w-4 h-4 text-slate-400 transition-transform duration-200',
                            {
                                'rotate-180': isOpen,
                            }
                        )}
                    />
                    {isActive && (
                        <span className="absolute inset-y-0 left-0 w-1 bg-indigo-600 rounded-r-full" />
                    )}
                </button>
            )}

            {item.submenu && (
                <div
                    className={cn(
                        'overflow-hidden transition-all duration-200',
                        {
                            'max-h-[1000px] opacity-100': isOpen,
                            'max-h-0 opacity-0': !isOpen,
                        }
                    )}
                >
                    <div className="pt-1 pb-1">
                        {item.submenu.map((subItem) => (
                            <MenuDropdown
                                key={subItem.id}
                                item={subItem}
                                level={level + 1}
                                openMenus={openMenus}
                                setOpenMenus={setOpenMenus}
                                parentIds={[...parentIds, item.id]}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default function AdminMenu() {
    const [openMenus, setOpenMenus] = useState<string[]>([]);
    const pathname = usePathname();
    const normalizedPathname = pathname.replace(/^\/[^/]+/, '');

    useEffect(() => {
        const savedOpenMenus = localStorage.getItem('openMenus');
        if (savedOpenMenus) {
            setOpenMenus(JSON.parse(savedOpenMenus));
        }
    }, []);

    useEffect(() => {
        const findActiveMenuPath = (items: MenuItem[]): string[] => {
            for (const item of items) {
                if (item.path === normalizedPathname) {
                    return [item.id];
                }
                if (item.submenu) {
                    const foundPath = findActiveMenuPath(item.submenu);
                    if (foundPath.length > 0) {
                        return [item.id, ...foundPath];
                    }
                }
            }
            return [];
        };

        const activePath = findActiveMenuPath(menuItems);
        if (activePath.length > 0) {
            setOpenMenus((prevOpenMenus) => {
                const newOpenMenus = [
                    ...new Set([...prevOpenMenus, ...activePath]),
                ];
                localStorage.setItem('openMenus', JSON.stringify(newOpenMenus));
                return newOpenMenus;
            });
        }
    }, [pathname]);

    return (
        <nav className="w-64 bg-white h-full border-r border-slate-200">
            <div className="p-4 space-y-0.5 max-h-[calc(100vh-4rem)] overflow-y-auto custom-scrollbar">
                {menuItems.map((item) => (
                    <MenuDropdown
                        key={item.id}
                        item={item}
                        openMenus={openMenus}
                        setOpenMenus={setOpenMenus}
                        parentIds={[]}
                    />
                ))}
            </div>
        </nav>
    );
}
