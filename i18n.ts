import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const locales: string[] = ['en', 'es', 'bn'];
export const defaultLocale: string = 'en';

export default getRequestConfig(async ({ locale }) => {
    const resolvedLocale = locale ?? defaultLocale;

    if (!locales.includes(resolvedLocale)) {
        notFound();
    }

    try {
        const messages = (await import(`./messages/${resolvedLocale}.json`))
            .default;
        return { locale: resolvedLocale, messages };
    } catch (error) {
        console.error(
            `Error loading messages for locale: ${resolvedLocale}`,
            error
        );
        notFound(); // Handle missing locale files gracefully
    }
});
