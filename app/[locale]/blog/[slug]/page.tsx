import Image from 'next/image';
import Link from 'next/link';

import {
    ArrowLeft,
    ArrowRight,
    CalendarDays,
    Clock3,
    Globe,
    MessageSquareText,
    Send,
    Share2,
    UserRound,
} from 'lucide-react';

import { BlogCard, Breadcrumbs, PublicPageShell } from '@/components/public/page-layout';
import { blogPosts } from '@/utils/public-content';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { slug } = await params;
    const post = blogPosts.find(item => item.slug === slug) ?? blogPosts[0];

    return {
        title: `${post.title} | Coupello Blog`,
        description: post.excerpt,
        alternates: {
            canonical: `/blog/${slug}`,
        },
    };
}

export default async function BlogDetailPage({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { slug } = await params;
    const post = blogPosts.find(item => item.slug === slug) ?? blogPosts[0];
    const related = blogPosts.filter(item => item.slug !== post.slug).slice(0, 3);
    const index = blogPosts.findIndex(item => item.slug === post.slug);
    const previous = blogPosts[index - 1] ?? blogPosts[blogPosts.length - 1];
    const next = blogPosts[index + 1] ?? blogPosts[0];

    return (
        <PublicPageShell>
            <section className="container-page py-8 md:py-10">
                <Breadcrumbs
                    items={[
                        { label: 'Home', href: '/' },
                        { label: 'Blog', href: '/blog' },
                        { label: post.title },
                    ]}
                />

                <article className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
                    <div className="border-b border-border p-6 md:p-8">
                        <div className="flex flex-wrap items-center gap-3 text-[12px] text-muted-foreground">
                            <span className="inline-flex rounded-full bg-primary-light px-2.5 py-1 font-semibold text-primary">
                                {post.category}
                            </span>
                            <span>•</span>
                            <span className="inline-flex items-center gap-1">
                                <CalendarDays className="h-3.5 w-3.5" /> {post.date}
                            </span>
                            <span>•</span>
                            <span className="inline-flex items-center gap-1">
                                <Clock3 className="h-3.5 w-3.5" /> {post.readTime}
                            </span>
                        </div>

                        <h1 className="mt-4 font-display text-[34px] font-extrabold leading-tight text-foreground md:text-[46px]">
                            {post.title}
                        </h1>
                        <p className="mt-4 max-w-3xl text-[16px] leading-7 text-muted-foreground">
                            {post.excerpt}
                        </p>

                        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-4">
                            <div className="flex items-center gap-3 text-[13px] text-muted-foreground">
                                <span className="grid h-9 w-9 place-items-center rounded-full bg-primary-light text-primary">
                                    <UserRound className="h-4 w-4" />
                                </span>
                                <div>
                                    <p className="font-semibold text-foreground">{post.author}</p>
                                    <p>Updated {post.updated ?? post.date}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                {[Globe, Send, MessageSquareText, Share2].map((Icon, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        aria-label="Share article"
                                        className="grid h-9 w-9 place-items-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                                    >
                                        <Icon className="h-3.5 w-3.5" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="overflow-hidden">
                        <Image
                            src={post.image}
                            alt={post.title}
                            width={1600}
                            height={900}
                            className="h-[280px] w-full object-cover md:h-[420px]"
                        />
                    </div>

                    <div className="grid gap-8 p-6 md:grid-cols-[220px_minmax(0,1fr)] md:p-8">
                        <aside className="md:sticky md:top-24 md:self-start">
                            <div className="rounded-2xl border border-border bg-surface p-4">
                                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                                    Table of contents
                                </p>
                                <ul className="mt-3 space-y-2 text-[13px] text-muted-foreground">
                                    <li>
                                        <a href="#intro" className="hover:text-primary">
                                            Introduction
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#tips" className="hover:text-primary">
                                            Smart tips
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#strategy" className="hover:text-primary">
                                            Strategy
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#final" className="hover:text-primary">
                                            Take action
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </aside>

                        <div className="prose max-w-none text-[15px] leading-8 text-foreground prose-headings:font-display prose-headings:tracking-[-0.03em] prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground prose-li:text-muted-foreground">
                            <h2 id="intro" className="mt-0 text-[28px] font-extrabold">
                                Introduction
                            </h2>
                            <p>
                                Saving money online is less about chasing every discount and more
                                about building better shopping habits. When you understand how
                                offers work and what terms matter most, you make more confident
                                decisions and keep more money in your wallet.
                            </p>
                            <p>
                                Coupon discovery is most valuable when it helps you compare purchase
                                timing, retailer policies and product value. With a clear strategy,
                                even small savings can add up quickly over a month or a season.
                            </p>

                            <h2 id="tips" className="text-[26px] font-extrabold">
                                Smart tips that actually work
                            </h2>
                            <ul>
                                <li>
                                    Check current retailer terms before you buy, especially return
                                    and shipping policies.
                                </li>
                                <li>
                                    Compare bundle savings with single-item discounts to find the
                                    best total value.
                                </li>
                                <li>
                                    Look for seasonal promotions and retailer-specific offers before
                                    purchasing premium items.
                                </li>
                            </ul>

                            <blockquote className="border-l-4 border-primary bg-primary-light px-4 py-3 text-[18px] font-medium leading-8 text-foreground">
                                ‘The best deals are often the ones that align with your actual need,
                                not the flashiest discount on the page.’
                            </blockquote>

                            <h2 id="strategy" className="text-[26px] font-extrabold">
                                Build a simple strategy
                            </h2>
                            <p>
                                Start with your planned purchase, then compare offer type, minimum
                                spend and expiry date. A code with a smaller discount can still win
                                if it applies to a larger cart or has fewer restrictions. That’s why
                                careful comparison matters more than pure discount size.
                            </p>

                            <table className="w-full border-collapse overflow-hidden rounded-2xl border border-border text-left text-[13px]">
                                <thead className="bg-surface">
                                    <tr>
                                        <th className="border border-border px-3 py-2 font-semibold text-foreground">
                                            Step
                                        </th>
                                        <th className="border border-border px-3 py-2 font-semibold text-foreground">
                                            Why it matters
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border border-border px-3 py-2 text-muted-foreground">
                                            1. Shortlist
                                        </td>
                                        <td className="border border-border px-3 py-2 text-muted-foreground">
                                            Set your budget and required product category.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border border-border px-3 py-2 text-muted-foreground">
                                            2. Compare offers
                                        </td>
                                        <td className="border border-border px-3 py-2 text-muted-foreground">
                                            Check exclusions, expiry and the final total after
                                            discounts.
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <h2 id="final" className="text-[26px] font-extrabold">
                                Take action with confidence
                            </h2>
                            <p>
                                The goal isn’t to collect every offer. It’s to use the right one at
                                the right time. Stay organized, shop intentionally and rely on
                                verified guidance so your savings feel predictable and effortless.
                            </p>
                        </div>
                    </div>
                </article>

                <div className="mt-10">
                    <div className="mb-5 flex items-center justify-between gap-3">
                        <h2 className="font-display text-[28px] font-extrabold tracking-tight text-foreground">
                            Related posts
                        </h2>
                        <Link
                            href="/blog"
                            className="text-[13px] font-semibold text-primary hover:text-primary-hover"
                        >
                            See all
                        </Link>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {related.map(item => (
                            <BlogCard key={item.slug} item={item} />
                        ))}
                    </div>
                </div>

                <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <Link
                        href={`/blog/${previous.slug}`}
                        className="inline-flex items-center gap-2 text-[13px] font-semibold text-foreground hover:text-primary"
                    >
                        <ArrowLeft className="h-4 w-4" /> Previous article
                    </Link>
                    <Link
                        href={`/blog/${next.slug}`}
                        className="inline-flex items-center gap-2 text-[13px] font-semibold text-foreground hover:text-primary"
                    >
                        Next article <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </section>
        </PublicPageShell>
    );
}
