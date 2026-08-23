'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

export function useTheme() {
    const [theme, setTheme] = useState<Theme>('light');

    useEffect(() => {
        // Check if theme is stored in localStorage
        const storedTheme = localStorage.getItem('theme') as Theme | null;

        // Check system preference
        const systemPreference = window.matchMedia(
            '(prefers-color-scheme: dark)'
        ).matches
            ? 'dark'
            : 'light';

        const initialTheme = storedTheme || systemPreference;
        setTheme(initialTheme);
        document.documentElement.classList.toggle(
            'dark',
            initialTheme === 'dark'
        );
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
    };

    return { theme, toggleTheme };
}
