import { PageHeader, PublicPageShell } from '@/components/public/page-layout';

const sections = [
    {
        title: 'What are cookies?',
        content:
            'Cookies are small files stored on a device to help websites remember preferences, improve performance and understand how people use the platform.',
    },
    {
        title: 'Essential cookies',
        content:
            'Some cookies are required for the website to function correctly, such as session support, safety checks and remembering basic settings while you browse.',
    },
    {
        title: 'Analytics cookies',
        content:
            'Analytics cookies help us understand feature usage and identify which pages or offers users find useful, so we can keep improving the experience without compromising privacy.',
    },
    {
        title: 'Managing your preferences',
        content:
            'You can adjust or disable cookies in your browser settings, though some site features may not work properly if essential cookies are blocked.',
    },
];

export default function CookiePolicyPage() {
    return (
        <PublicPageShell>
            <PageHeader
                eyebrow="Cookie policy"
                title="How we use cookies"
                description="This policy explains the cookies used on Coupello and how they help support the website experience while protecting user privacy."
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
