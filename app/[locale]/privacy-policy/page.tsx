import { PageHeader, PublicPageShell } from '@/components/public/page-layout';

const sections = [
    {
        title: 'Information we collect',
        content:
            'We collect details necessary to provide account access, respond to support requests and improve site quality. This may include basic profile information, interaction data and technical information about how the website is used.',
    },
    {
        title: 'How we use data',
        content:
            'We use this information to maintain account access, improve the coupon discovery experience, measure performance and provide the tools shoppers need to compare relevant offers.',
    },
    {
        title: 'Cookies and analytics',
        content:
            'Coupello uses cookies and analytics tools to understand behavior, improve performance and remember essential preferences. You can manage settings in your browser to limit or disable non-essential cookies.',
    },
    {
        title: 'Sharing and security',
        content:
            'We do not sell personal data. We may share limited information with trusted service providers when needed to run the website securely and efficiently.',
    },
    {
        title: 'Your choices',
        content:
            'You can update account information, contact support and manage cookie preferences through the site or browser settings. We encourage users to review changes to this policy when they are published.',
    },
];

export default function PrivacyPolicyPage() {
    return (
        <PublicPageShell>
            <PageHeader
                eyebrow="Privacy policy"
                title="Your privacy matters"
                description="This privacy policy explains how Coupello handles information and keeps the shopping and deal discovery experience secure and transparent."
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
