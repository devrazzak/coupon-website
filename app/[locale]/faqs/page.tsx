import type { Metadata } from 'next';

import { PageHeader, PublicPageShell } from '@/components/public/page-layout';
import siteConfig from '@/utils/SiteConfig';

export const metadata: Metadata = {
    title: 'FAQs | Coupello Coupons and Store Deals',
    description:
        'Find answers about Coupello coupons, promo codes, store offers, checkout, expired deals, and affiliate links.',
    alternates: {
        canonical: '/faqs',
    },
    openGraph: {
        title: 'FAQs | Coupello Coupons and Store Deals',
        description:
            'Find answers about Coupello coupons, promo codes, store offers, checkout, expired deals, and affiliate links.',
        url: '/faqs',
        siteName: siteConfig.company_name,
        type: 'website',
    },
    robots: {
        index: true,
        follow: true,
    },
};

const faqs = [
    {
        question: 'How do I use a coupon?',
        answer: 'Open the offer you want, reveal or copy the code, and follow the link to the store. Enter the code in the coupon or promo field during checkout, then make sure the discount appears before placing your order.',
    },
    {
        question: 'Do I need an account to use Coupello?',
        answer: `No. You can browse ${siteConfig.company_name}, view store offers, and use coupon codes without creating a shopper account or signing in.`,
    },
    {
        question: 'Why did a coupon not work?',
        answer: 'A store may have changed the offer, or the code may apply only to certain products, locations, customers, or order amounts. Check the offer terms and the store checkout. If it still looks wrong, send us the store and coupon link through the Contact page.',
    },
    {
        question: 'Are all offers guaranteed to work?',
        answer: 'No. We try to keep offer information useful and remove deals that are clearly expired, but merchants can change or end promotions at any time. The store checkout is the final place to confirm the price and terms.',
    },
    {
        question: 'Does Coupello apply codes automatically?',
        answer: 'No. Coupello does not auto-apply coupons, install browser extensions, or complete purchases for you. You choose the offer and enter the code yourself on the merchant website.',
    },
    {
        question: 'Does Coupello sell the products or process my order?',
        answer: 'No. Coupello only helps you discover offers. Your order, payment, delivery, returns, refunds, and customer support are handled directly by the store you visit.',
    },
    {
        question: 'How can I report a problem with an offer?',
        answer: 'Use the Contact page and include the store name, coupon link, and what happened at checkout. The more detail you share, the easier it is for us to review the listing.',
    },
    {
        question: 'What are affiliate links?',
        answer: 'Some store links may be affiliate links. If you click one and make a qualifying purchase, Coupello may receive a commission at no extra cost to you. This does not guarantee that the offer will work or change the store price.',
    },
];

export default function FaqsPage() {
    return (
        <PublicPageShell>
            <PageHeader
                eyebrow="FAQs"
                title="Questions about coupons?"
                description={`Here are straightforward answers about using ${siteConfig.company_name}, checking offers, and getting help when something does not look right.`}
            />

            <section className="container-page py-8 md:py-10">
                <div className="mx-auto max-w-4xl space-y-4">
                    {faqs.map(faq => (
                        <section
                            key={faq.question}
                            className="rounded-xl border border-border bg-card p-5 shadow-soft md:p-6"
                        >
                            <h2 className="font-display text-[21px] font-bold text-foreground">
                                {faq.question}
                            </h2>
                            <p className="mt-3 text-[14px] leading-7 text-muted-foreground">
                                {faq.answer}
                            </p>
                        </section>
                    ))}
                </div>
            </section>
        </PublicPageShell>
    );
}
