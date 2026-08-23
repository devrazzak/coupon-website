import { getTranslations } from 'next-intl/server';

import { NextIntlClientProvider } from 'next-intl';

import { locales } from '@/i18n';

export function generateStaticParams() {
    return locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Metadata' });

    return {
        title: t('title'),
        description: t('description'),
        alternates: {
            canonical: `/${locale}`,
            languages: {
                en: '/en',
                es: '/es',
                bn: '/bn',
            },
        },
    };
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const messages = (await import(`../../messages/${locale}.json`)).default;

    return <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>;
}
