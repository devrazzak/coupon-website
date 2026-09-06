import { Inter } from 'next/font/google';

import { Metadata } from 'next';

import ogImage from '@/public/images/Coupola-logo-social.png';
import siteConfig from '@/utils/SiteConfig';

import { Providers } from './providers';

import './globals.css';

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
    preload: true,
    adjustFontFallback: true,
    weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
    metadataBase: new URL(siteConfig.site_url),
    title: `${siteConfig.company_name} - Coupons, Promo Codes & Money-Saving Deals`,
    description:
        'Discover working coupon codes, promo offers, and money-saving tips to help you pay less at your favorite online stores.',
    keywords: ['promo codes', 'coupons', 'cash back', 'deals', 'discounts'],
    authors: [{ name: siteConfig.company_name }],
    openGraph: {
        title: `${siteConfig.company_name} - Coupons, Promo Codes & Money-Saving Deals`,
        description:
            'Discover working coupon codes, promo offers, and money-saving tips to help you pay less at your favorite online stores.',
        siteName: siteConfig.company_name,
        images: [
            {
                url: ogImage.src,
                alt: `${siteConfig.company_name} Logo`,
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning className={inter.variable}>
            <body className="font-sans antialiased" suppressHydrationWarning>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
