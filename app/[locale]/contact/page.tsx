import { MessageSquareText } from 'lucide-react';
import type { Metadata } from 'next';

import ContactForm from '@/components/ContactForm';
import { PageHeader, PublicPageShell } from '@/components/public/page-layout';

export const metadata: Metadata = {
    title: 'Contact Coupello | Coupon Support & Feedback',
    description:
        'Contact Coupello for help with coupons, partnerships, store listings, or feedback about your shopping experience.',
    alternates: {
        canonical: '/contact',
    },
    openGraph: {
        title: 'Contact Coupello | Coupon Support & Feedback',
        description:
            'Contact Coupello for help with coupons, partnerships, store listings, or feedback about your shopping experience.',
        url: '/contact',
        siteName: 'Coupello',
        type: 'website',
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
                description="Need help with a coupon or want to share feedback? Send us a message and our team will get back to you as soon as possible."
            />

            <section className="container-page py-8 md:py-10">
                <div className="flex justify-center">
                    <div className="w-full max-w-2xl rounded-xl border border-border bg-card p-5 shadow-soft md:p-6">
                        <ContactForm />
                    </div>
                </div>

                <div className="mt-10 rounded-3xl border border-border bg-surface p-5 md:p-6">
                    <div className="flex items-center gap-3">
                        <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-light text-primary">
                            <MessageSquareText className="h-5 w-5" />
                        </span>
                        <h2 className="font-display text-[26px] font-semibold text-foreground">
                            Support & FAQ
                        </h2>
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
