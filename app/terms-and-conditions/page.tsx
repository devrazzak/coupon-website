import type { Metadata } from 'next';

import { PageHeader, PublicPageShell } from '@/components/public/page-layout';
import siteConfig from '@/utils/SiteConfig';

export const metadata: Metadata = {
    title: 'Terms & Conditions | Coupola',
    description:
        'Review the terms for using Coupola to browse coupons, store deals, categories, and shopping guides.',
    alternates: {
        canonical: '/terms-and-conditions',
    },
    openGraph: {
        title: 'Terms & Conditions | Coupola',
        description:
            'Review the terms for using Coupola to browse coupons, store deals, categories, and shopping guides.',
        url: '/terms-and-conditions',
        siteName: siteConfig.company_name,
        type: 'website',
    },
    robots: {
        index: true,
        follow: true,
    },
};

const sections = [
    {
        title: 'Using Coupola',
        content: `By using ${siteConfig.company_name}, users agree to comply with these terms and conditions. We may update the terms over time to reflect product changes, legal requirements or improvements to services.`,
    },
    {
        title: 'Coupons and store offers',
        content: `${siteConfig.company_name} helps you discover coupons, promo codes, store deals, and shopping information. Offers can change or stop working without notice, and eligibility may depend on the store, product, location, account, or order value. Always check the merchant's terms and the final price before you buy.`,
    },
    {
        title: 'You redeem offers yourself',
        content:
            'Coupola does not automatically apply coupon codes, use browser automation, or install extensions. When an offer takes you to a merchant, you choose whether to use it and enter any code yourself on the merchant website.',
    },
    {
        title: 'Your responsibility',
        content: `Please use accurate information and confirm that an offer suits your order before purchasing. Your purchase is made with the merchant, so the merchant's pricing, shipping, returns, refunds, and customer service policies apply.`,
    },
    {
        title: 'Content and service updates',
        content:
            'We work to keep listings and articles useful, but we cannot guarantee that every offer is available, accurate, or error-free at every moment. We may update, pause, or remove pages and features as the site develops. These terms may also change, and the latest version will be posted here.',
    },
];

export default function TermsPage() {
    return (
        <PublicPageShell>
            <PageHeader
                eyebrow="Terms & conditions"
                title="Website terms of use"
                description={`These terms set out the rules for using ${siteConfig.company_name} and explain how coupon discovery and merchant information should be interpreted.`}
            />

            <section className="container-page py-8 md:py-10">
                <div className="mx-auto max-w-4xl rounded-xl border border-border bg-card p-6 shadow-soft md:p-8">
                    <div className="space-y-6">
                        {sections.map(section => (
                            <section
                                key={section.title}
                                className="border-b border-border pb-5 last:border-b-0 last:pb-0"
                            >
                                <h2 className="font-display text-[24px] font-bold text-foreground">
                                    {section.title}
                                </h2>
                                <p className="mt-3 text-[14px] leading-7 text-muted-foreground">
                                    {section.content}
                                </p>
                            </section>
                        ))}
                    </div>
                </div>
            </section>
        </PublicPageShell>
    );
}
