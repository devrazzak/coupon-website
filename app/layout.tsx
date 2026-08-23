import { Inter } from 'next/font/google';

import { Metadata } from 'next';

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
    title: 'Dashboard App',
    description: 'A modern dashboard application',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning className={inter.variable}>
            <body className="font-sans antialiased">
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
