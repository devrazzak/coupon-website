'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ChevronDown } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useEffect, useState } from 'react';

import { locales } from '@/i18n';
import { cn } from '@/utils/cn';

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
    path: string[] = [],
): string[] | null => {
    for (const item of items) {
        if (item.id === targetId) {
            return path;
        }
        if (item.submenu) {
            const found = findParentIds(item.submenu, targetId, [...path, item.id]);
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
    const locale = useLocale();
    const isOpen = openMenus.includes(item.id);

    const segments = pathname.split('/');
    const normalizedPathname = locales.includes(segments[1])
        ? `/${segments.slice(2).join('/')}`
        : pathname;

    const checkActive = (menuItem: MenuItem): boolean => {
        if (menuItem.path && normalizedPathname === menuItem.path) return true;
        if (menuItem.submenu) {
            return menuItem.submenu.some(
                subItem =>
                    (subItem.path && normalizedPathname === subItem.path) ||
                    (subItem.submenu && checkActive(subItem)),
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
            const menusToKeep = openMenus.filter(id => {
                if (parentIds.includes(id)) return true;
                if (activeChildMenus.includes(id)) return true;
                const itemParents = findParentIds(menuItems, id) || [];
                return !itemParents.includes(item.id) && id !== item.id;
            });

            setOpenMenus(menusToKeep);
        } else {
            let newOpenMenus = [...openMenus];

            parentIds.forEach(id => {
                if (!newOpenMenus.includes(id)) {
                    newOpenMenus.push(id);
                }
            });

            if (level === 0) {
                newOpenMenus = newOpenMenus.filter(id => {
                    const itemParents = findParentIds(menuItems, id);
                    return itemParents !== null;
                });
            }

            if (!newOpenMenus.includes(item.id)) {
                newOpenMenus.push(item.id);
            }

            if (isActive) {
                const activeChildMenus = findActiveChildMenus(item);
                activeChildMenus.forEach(id => {
                    if (!newOpenMenus.includes(id)) {
                        newOpenMenus.push(id);
                    }
                });
            }

            setOpenMenus(newOpenMenus);
        }
    };

    const menuItemClasses = cn('relative flex items-center w-full transition-all duration-200', {
        'text-muted-foreground': !isActive,
        'text-primary font-medium': isActive,
        'pl-4': level === 0,
        'pl-12': level === 1,
        'pl-16': level === 2,
        'pl-20': level === 3,
    });

    return (
        <div className="relative">
            {item.path ? (
                <Link
                    href={`/${locale}${item.path}`}
                    className={cn(menuItemClasses, 'rounded-xl py-2.5 hover:bg-primary-light', {
                        'bg-primary-light font-medium': isActive,
                    })}
                >
                    {level === 0 && (
                        <span className="mr-3 [&>svg]:h-5 [&>svg]:w-5">{item.icon}</span>
                    )}
                    <span className="whitespace-nowrap text-[14px]">{item.title}</span>
                    {isActive && (
                        <span className="absolute inset-y-0 left-0 w-1 rounded-r-full bg-primary" />
                    )}
                </Link>
            ) : (
                <button
                    onClick={handleToggle}
                    className={cn(
                        menuItemClasses,
                        'rounded-xl py-2.5 pr-4 hover:bg-primary-light',
                        {
                            'bg-primary-light font-medium': isOpen,
                        },
                    )}
                >
                    {level === 0 && (
                        <span className="mr-3 [&>svg]:h-5 [&>svg]:w-5">{item.icon}</span>
                    )}
                    <span className="whitespace-nowrap text-[14px]">{item.title}</span>
                    <ChevronDown
                        className={cn(
                            'ml-auto h-4 w-4 text-muted-foreground transition-transform duration-200',
                            {
                                'rotate-180': isOpen,
                            },
                        )}
                    />
                    {isActive && (
                        <span className="absolute inset-y-0 left-0 w-1 rounded-r-full bg-primary" />
                    )}
                </button>
            )}

            {item.submenu && (
                <div
                    className={cn('overflow-hidden transition-all duration-200', {
                        'max-h-[1000px] opacity-100': isOpen,
                        'max-h-0 opacity-0': !isOpen,
                    })}
                >
                    <div className="pt-1 pb-1">
                        {item.submenu.map(subItem => (
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

const findActiveMenuPath = (items: MenuItem[], targetPath: string): string[] => {
    for (const item of items) {
        if (item.path === targetPath) {
            return [item.id];
        }
        if (item.submenu) {
            const foundPath = findActiveMenuPath(item.submenu, targetPath);
            if (foundPath.length > 0) {
                return [item.id, ...foundPath];
            }
        }
    }
    return [];
};

export default function AdminMenu() {
    const pathname = usePathname();

    const segments = pathname.split('/');
    const normalizedPathname = locales.includes(segments[1])
        ? `/${segments.slice(2).join('/')}`
        : pathname;

    const [openMenus, setOpenMenus] = useState<string[]>(
        () => findActiveMenuPath(menuItems, normalizedPathname) || [],
    );

    return (
        <nav className="w-64 bg-white h-full border-r border-slate-200">
            <div className="p-4 space-y-0.5 max-h-[calc(100vh-4rem)] overflow-y-auto custom-scrollbar">
                {menuItems.map(item => (
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
