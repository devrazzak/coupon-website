'use client';

import { usePathname, useRouter } from 'next/navigation';

import { useLocale } from 'next-intl';

import { locales } from '@/i18n';

export function LanguageSwitcher() {
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();
    const pathnameLocale = pathname.split('/')[1];
    const selectedLocale = locales.includes(pathnameLocale) ? pathnameLocale : locale;

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newLocale = e.target.value;
        const segments = pathname.split('/');
        const currentPath = locales.includes(segments[1])
            ? `/${segments.slice(2).join('/')}`
            : pathname;
        const normalizedPath = currentPath === '//' ? '/' : currentPath;

        router.push(normalizedPath === '/' ? `/${newLocale}` : `/${newLocale}${normalizedPath}`);
    };

    return (
        <select
            value={selectedLocale}
            onChange={handleChange}
            className="bg-white border border-gray-300 rounded-md px-2 py-1 text-sm"
        >
            {locales.map(loc => (
                <option key={loc} value={loc}>
                    {loc.toUpperCase()}
                </option>
            ))}
        </select>
    );
}
