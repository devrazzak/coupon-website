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
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="relative inline-block" ref={dropdownRef}>
            <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
                {trigger}
            </div>
            {isOpen && (
                <div
                    className={cn(
                        'absolute top-full mt-1 py-1 bg-white rounded-lg shadow-lg border border-gray-100 min-w-[8rem] z-50',
                        {
                            'right-0': align === 'right',
                            'left-0': align === 'left',
                        },
                        className
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
            role="button"
            className={cn(
                'px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer flex items-center w-full',
                className
            )}
            onClick={(e) => {
                // Only prevent default if it's a direct click handler
                if (onClick) {
                    e.preventDefault();
                    e.stopPropagation();
                    onClick();
                }
            }}
        >
            {children}
        </div>
    );
}

export function DropdownSeparator() {
    return <div className="my-1 border-t border-gray-100" />;
}
