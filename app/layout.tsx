import { Inter } from 'next/font/google';

import { Metadata } from 'next';

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
    title: `${siteConfig.company_name} - 250,000+ Verified Promo Codes, Coupons & Cash Back Deals`,
    description:
        'Find the best promo codes, coupons, and cash back deals from your favorite online stores.',
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
