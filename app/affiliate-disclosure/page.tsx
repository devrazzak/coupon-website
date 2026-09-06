import type { Metadata } from 'next';

import { PageHeader, PublicPageShell } from '@/components/public/page-layout';
import siteConfig from '@/utils/SiteConfig';

export const metadata: Metadata = {
    title: 'Affiliate Disclosure | Coupola',
    description:
        'Learn how Coupola may earn a commission from qualifying purchases made through some store and coupon links.',
    alternates: {
        canonical: '/affiliate-disclosure',
    },
    openGraph: {
        title: 'Affiliate Disclosure | Coupola',
        description:
            'Learn how Coupola may earn a commission from qualifying purchases made through some store and coupon links.',
        url: '/affiliate-disclosure',
        siteName: siteConfig.company_name,
        type: 'website',
    },
    robots: {
        index: true,
        follow: true,
    },
};

const disclosures = [
    {
        title: 'How affiliate links work',
        content: `Some links on ${siteConfig.company_name} may be affiliate links. If you click one of those links and complete a qualifying purchase with the store, we may receive a commission or referral fee.`,
    },
    {
        title: 'What this means for you',
        content:
            'Using an affiliate link does not normally add a fee to your purchase. The store sets the final price, shipping costs, return rules, and eligibility requirements. Please review those details at checkout.',
    },
    {
        title: 'Our editorial approach',
        content: `${siteConfig.company_name} is supported in part by these referrals, which helps us run the site and keep the service free to browse. Affiliate relationships do not guarantee that an offer will work, so we encourage you to compare the details and confirm the terms on the merchant's website.`,
    },
];

export default function AffiliateDisclosurePage() {
    return (
        <PublicPageShell>
            <PageHeader
                eyebrow="Affiliate disclosure"
                title="Transparency about merchant relationships"
                description={`This page explains how ${siteConfig.company_name} may be compensated when users discover and visit stores through the platform.`}
            />

            <section className="container-page py-8 md:py-10">
                <div className="mx-auto max-w-4xl rounded-xl border border-border bg-card p-6 shadow-soft md:p-8">
                    <div className="space-y-6">
                        {disclosures.map(section => (
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
