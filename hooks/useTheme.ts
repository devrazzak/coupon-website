'use client';

import { useSyncExternalStore } from 'react';

type Theme = 'light' | 'dark';

function getThemeSnapshot(): Theme {
    if (typeof window === 'undefined') return 'light';
    const stored = localStorage.getItem('theme') as Theme | null;
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getServerSnapshot(): Theme {
    return 'light';
}

function subscribe(callback: () => void) {
    if (typeof window === 'undefined') return () => {};
    window.addEventListener('storage', callback);
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', callback);
    return () => {
        window.removeEventListener('storage', callback);
        mediaQuery.removeEventListener('change', callback);
    };
}

export function useTheme() {
    const theme = useSyncExternalStore(subscribe, getThemeSnapshot, getServerSnapshot);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
        window.dispatchEvent(new Event('storage'));
    };

    return { theme, toggleTheme };
}
