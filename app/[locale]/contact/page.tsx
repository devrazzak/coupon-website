import { Mail, MapPin, MessageSquareText, Phone } from 'lucide-react';

import { PageHeader, PublicPageShell } from '@/components/public/page-layout';

export default function ContactPage() {
    return (
        <PublicPageShell>
            <PageHeader
                eyebrow="Contact"
                title="We’re here to help"
                description="Reach out for support, partnership questions or general feedback about how Coupello helps shoppers discover better deals."
            />

            <section className="container-page py-8 md:py-10">
                <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
                    <div className="space-y-4">
                        <div className="rounded-3xl border border-border bg-card p-5 shadow-soft">
                            <div className="flex items-center gap-3">
                                <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-light text-primary">
                                    <Mail className="h-5 w-5" />
                                </span>
                                <div>
                                    <p className="text-[12px] uppercase tracking-[0.12em] text-muted-foreground">
                                        Email
                                    </p>
                                    <a
                                        href="mailto:hello@coupello.com"
                                        className="mt-1 block text-[15px] font-semibold text-foreground"
                                    >
                                        hello@coupello.com
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-3xl border border-border bg-card p-5 shadow-soft">
                            <div className="flex items-center gap-3">
                                <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-light text-primary">
                                    <Phone className="h-5 w-5" />
                                </span>
                                <div>
                                    <p className="text-[12px] uppercase tracking-[0.12em] text-muted-foreground">
                                        Phone
                                    </p>
                                    <a
                                        href="tel:+15550198"
                                        className="mt-1 block text-[15px] font-semibold text-foreground"
                                    >
                                        +1 (555) 0198
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-3xl border border-border bg-card p-5 shadow-soft">
                            <div className="flex items-center gap-3">
                                <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-light text-primary">
                                    <MapPin className="h-5 w-5" />
                                </span>
                                <div>
                                    <p className="text-[12px] uppercase tracking-[0.12em] text-muted-foreground">
                                        Office
                                    </p>
                                    <p className="mt-1 text-[15px] font-semibold text-foreground">
                                        Coupello HQ, New York, NY
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-3xl border border-border bg-card p-5 shadow-soft md:p-6">
                        <form className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <label className="block text-[13px] font-medium text-foreground">
                                    Name
                                    <input
                                        type="text"
                                        defaultValue=""
                                        className="mt-2 h-11 w-full rounded-xl border border-border bg-background px-3 text-[14px] text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                                    />
                                </label>
                                <label className="block text-[13px] font-medium text-foreground">
                                    Email
                                    <input
                                        type="email"
                                        defaultValue=""
                                        className="mt-2 h-11 w-full rounded-xl border border-border bg-background px-3 text-[14px] text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                                    />
                                </label>
                            </div>
                            <label className="block text-[13px] font-medium text-foreground">
                                Subject
                                <input
                                    type="text"
                                    defaultValue=""
                                    className="mt-2 h-11 w-full rounded-xl border border-border bg-background px-3 text-[14px] text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                                />
                            </label>
                            <label className="block text-[13px] font-medium text-foreground">
                                Message
                                <textarea
                                    rows={6}
                                    defaultValue=""
                                    className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-3 text-[14px] text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                                />
                            </label>
                            <button
                                type="submit"
                                className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-[13px] font-bold text-primary-foreground hover:bg-primary-hover"
                            >
                                Send message
                            </button>
                        </form>
                    </div>
                </div>

                <div className="mt-10 rounded-3xl border border-border bg-surface p-5 md:p-6">
                    <div className="flex items-center gap-3">
                        <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-light text-primary">
                            <MessageSquareText className="h-5 w-5" />
                        </span>
                        <h2 className="font-display text-[26px] font-extrabold text-foreground">
                            Support & FAQ
                        </h2>
                    </div>
                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                        <div className="rounded-2xl border border-border bg-card p-4">
                            <p className="font-semibold text-foreground">
                                How do I redeem a coupon?
                            </p>
                            <p className="mt-2 text-[13px] leading-6 text-muted-foreground">
                                Browse the offer, copy or reveal the code and apply it on the
                                merchant checkout page during purchase.
                            </p>
                        </div>
                        <div className="rounded-2xl border border-border bg-card p-4">
                            <p className="font-semibold text-foreground">Can I contact support?</p>
                            <p className="mt-2 text-[13px] leading-6 text-muted-foreground">
                                Yes. Use the form or email above and we’ll get back to you as
                                quickly as possible.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </PublicPageShell>
    );
}
