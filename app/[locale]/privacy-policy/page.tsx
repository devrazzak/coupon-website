import type { Metadata } from 'next';

import { PageHeader, PublicPageShell } from '@/components/public/page-layout';
import siteConfig from '@/utils/SiteConfig';

export const metadata: Metadata = {
    title: 'Privacy Policy | Coupello',
    description:
        'Read how Coupello handles account, contact, and website usage information while you browse coupons and store deals.',
    alternates: {
        canonical: '/privacy-policy',
    },
    openGraph: {
        title: 'Privacy Policy | Coupello',
        description:
            'Read how Coupello handles account, contact, and website usage information while you browse coupons and store deals.',
        url: '/privacy-policy',
        siteName: 'Coupello',
        type: 'website',
    },
    robots: {
        index: true,
        follow: true,
    },
};

const sections = [
    {
        title: 'Information you provide',
        content: `When you contact ${siteConfig.company_name}, you may provide your name, email address, subject, and the details you choose to include in your message. We may also receive basic technical information, such as browser and device details, when you visit the site. ${siteConfig.company_name} does not currently offer shopper accounts or user login.`,
    },
    {
        title: 'How we use information',
        content: `We use contact information to respond to your message, keep the site working, understand which pages are useful, and improve the way shoppers find coupons, stores, categories, and articles. We do not use your contact message to send unrelated marketing unless you have clearly agreed to receive it.`,
    },
    {
        title: 'Cookies and browser storage',
        content: `${siteConfig.company_name} may use cookies or browser storage to remember essential preferences and support site functionality. The site may also use privacy-conscious analytics or similar tools to understand general usage and improve performance. You can block or remove cookies through your browser settings, although some features may not work as expected.`,
    },
    {
        title: 'Sharing and security',
        content:
            'We do not sell your personal information. We may share the minimum information needed with service providers that help us host, secure, operate, or support the website. We take reasonable steps to protect information, but no internet service can promise complete security.',
    },
    {
        title: 'Your choices and questions',
        content:
            'You can ask us about information connected to your contact request and manage cookies in your browser. To ask a privacy question or request help, use the Contact page. We may update this policy when the site or our practices change, so please check this page from time to time.',
    },
];

export default function PrivacyPolicyPage() {
    return (
        <PublicPageShell>
            <PageHeader
                eyebrow="Privacy policy"
                title="Your privacy matters"
                description={`This privacy policy explains how ${siteConfig.company_name} handles information and keeps the shopping and deal discovery experience secure and transparent.`}
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
