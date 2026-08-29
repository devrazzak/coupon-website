import { PageHeader, PublicPageShell } from '@/components/public/page-layout';

const disclosures = [
    {
        title: 'Paid partnerships',
        content:
            'Coupello may earn a commission or referral fee when users click through to a partner merchant and complete qualifying purchases.',
    },
    {
        title: 'No impact on pricing',
        content:
            'The compensation we may receive does not increase the price paid by shoppers and does not change the offer shown on the site.',
    },
    {
        title: 'Clear disclosure',
        content:
            'We aim to be transparent about affiliate relationships so users can clearly understand how the platform is supported and maintained.',
    },
];

export default function AffiliateDisclosurePage() {
    return (
        <PublicPageShell>
            <PageHeader
                eyebrow="Affiliate disclosure"
                title="Transparency about merchant relationships"
                description="This page explains how Coupello may be compensated when users discover and visit stores through the platform."
            />

            <section className="container-page py-8 md:py-10">
                <div className="mx-auto max-w-4xl rounded-3xl border border-border bg-card p-6 shadow-soft md:p-8">
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
