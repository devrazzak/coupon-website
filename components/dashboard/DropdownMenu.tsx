'use client';

import { useEffect, useRef, useState } from 'react';

import { cn } from '@/utils/cn';

interface DropdownMenuProps {
    trigger: React.ReactNode;
    children: React.ReactNode;
    className?: string;
    align?: 'left' | 'right';
}

export default function DropdownMenu({
    trigger,
    children,
    className = '',
    align = 'right',
}: DropdownMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape' && isOpen) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen]);

    return (
        <div className="relative inline-block" ref={dropdownRef}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setIsOpen(!isOpen);
                    }
                }}
                role="button"
                tabIndex={0}
                aria-haspopup="menu"
                aria-expanded={isOpen}
                className="cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-indigo-500 rounded-md"
            >
                {trigger}
            </div>
            {isOpen && (
                <div
                    role="menu"
                    aria-orientation="vertical"
                    className={cn(
                        'absolute top-full mt-1 py-1 bg-white rounded-lg shadow-lg border border-gray-100 min-w-[8rem] z-50 focus:outline-none',
                        {
                            'right-0': align === 'right',
                            'left-0': align === 'left',
                        },
                        className,
                    )}
                >
                    {children}
                </div>
            )}
        </div>
    );
}

export function DropdownItem({
    children,
    onClick,
    className = '',
}: {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
}) {
    return (
        <div
            role="menuitem"
            tabIndex={0}
            className={cn(
                'px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none cursor-pointer flex items-center w-full transition-colors',
                className,
            )}
            onClick={e => {
                if (onClick) {
                    e.preventDefault();
                    e.stopPropagation();
                    onClick();
                }
            }}
            onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                    if (onClick) {
                        e.preventDefault();
                        e.stopPropagation();
                        onClick();
                    }
                }
            }}
        >
            {children}
        </div>
    );
}

export function DropdownSeparator() {
    return <div className="my-1 border-t border-gray-100" role="separator" />;
}
