import { PageHeader, PublicPageShell } from '@/components/public/page-layout';

const sections = [
    {
        title: 'Acceptance of terms',
        content:
            'By using Coupello, users agree to comply with these terms and conditions. We may update the terms over time to reflect product changes, legal requirements or improvements to services.',
    },
    {
        title: 'Coupon and deal information',
        content:
            'Coupello provides savings information for educational and discovery purposes. Offers may vary by merchant, product, region, eligibility or expiration date. Users should always check the retailer’s terms before purchase.',
    },
    {
        title: 'No automatic application',
        content:
            'The platform does not auto-apply coupons, use browser automation or install extensions. Customers must redeem codes manually on the merchant website when checking out.',
    },
    {
        title: 'User responsibility',
        content:
            'Users are responsible for confirming the validity and applicability of promotional offers, as well as for their own purchase decisions and account security.',
    },
    {
        title: 'Service updates',
        content:
            'We may revise, suspend or discontinue access to some features at any time without prior notice. We reserve the right to update the site and support the user experience as needed.',
    },
];

export default function TermsPage() {
    return (
        <PublicPageShell>
            <PageHeader
                eyebrow="Terms & conditions"
                title="Website terms of use"
                description="These terms set out the rules for using Coupello and explain how coupon discovery and merchant information should be interpreted."
            />

            <section className="container-page py-8 md:py-10">
                <div className="mx-auto max-w-4xl rounded-3xl border border-border bg-card p-6 shadow-soft md:p-8">
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
