import Link from 'next/link';

import { MessageSquareText } from 'lucide-react';
import type { Metadata } from 'next';

import ContactForm from '@/components/ContactForm';
import { PageHeader, PublicPageShell } from '@/components/public/page-layout';
import siteConfig from '@/utils/SiteConfig';

export const metadata: Metadata = {
    title: `Contact ${siteConfig.company_name} | Coupon Support & Feedback`,
    description: `Contact ${siteConfig.company_name} for help with coupons, partnerships, store listings, or feedback about your shopping experience.`,
    alternates: {
        canonical: '/contact',
    },
    openGraph: {
        title: `Contact ${siteConfig.company_name} | Coupon Support & Feedback`,
        description: `Contact ${siteConfig.company_name} for help with coupons, partnerships, store listings, or feedback about your shopping experience.`,
        url: '/contact',
        siteName: siteConfig.company_name,
        type: 'website',
        images: [
            {
                url: '/images/Coupola-logo-social.png',
                alt: `${siteConfig.company_name} Logo`,
            },
        ],
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function ContactPage() {
    return (
        <PublicPageShell>
            <PageHeader
                eyebrow="Contact"
                title="We’re here to help"
                description={`Need help with a coupon or want to share feedback with ${siteConfig.company_name}? Send us a message and our team will get back to you as soon as possible.`}
            />

            <section className="container-page py-8 md:py-10">
                <div className="flex justify-center">
                    <div className="w-full max-w-2xl rounded-xl border border-border bg-card p-5 shadow-soft md:p-6">
                        <ContactForm />
                    </div>
                </div>

                <div className="mt-10 rounded-xl border border-border bg-surface p-5 md:p-6">
                    <div className="flex items-center gap-3">
                        <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-light text-primary">
                            <MessageSquareText className="h-5 w-5" />
                        </span>
                        <h2 className="font-display text-[26px] font-semibold text-foreground">
                            Support & FAQs
                        </h2>
                        <Link
                            href="/faqs"
                            className="ml-auto text-[13px] font-semibold text-primary hover:text-primary-hover"
                        >
                            View all FAQs
                        </Link>
                    </div>
                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                        <div className="rounded-2xl border border-border bg-card p-4">
                            <p className="font-semibold text-foreground">
                                How do I redeem a coupon?
                            </p>
                            <p className="mt-2 text-[13px] leading-6 text-muted-foreground">
                                Open an offer, reveal or copy the code, then apply it at the
                                store&apos;s checkout. Each store may have its own terms and expiry
                                date.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-border bg-card p-4">
                            <p className="font-semibold text-foreground">Can I contact support?</p>
                            <p className="mt-2 text-[13px] leading-6 text-muted-foreground">
                                Yes. Tell us what went wrong, include the store or coupon link if
                                possible, and we&apos;ll investigate it for you.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </PublicPageShell>
    );
}
