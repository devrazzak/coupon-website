import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';

import { locales } from '@/i18n';

export function generateStaticParams() {
    return locales.map(locale => ({ locale }));
}

export const metadata: Metadata = {
    title: {
        template: '%s | Coupello',
        default: 'Coupello — Verified Promo Codes, Coupons & Deals',
    },
    description:
        'Find the latest verified coupon codes, discounts, and daily deals for your favorite online stores.',
};

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
