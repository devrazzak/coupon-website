import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Savings Guides & Tips | Coupons, Deals & Shopping Advice',
    description:
        'Read practical shopping guides, coupon tips, and money-saving advice to find better deals and shop smarter with Coupello.',
    alternates: {
        canonical: '/blog',
    },
    openGraph: {
        title: 'Savings Guides & Tips | Coupons, Deals & Shopping Advice',
        description:
            'Read practical shopping guides, coupon tips, and money-saving advice to find better deals and shop smarter with Coupello.',
        url: '/blog',
        siteName: 'Coupello',
        type: 'website',
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return children;
}
