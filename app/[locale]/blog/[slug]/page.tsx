import Image from 'next/image';

import {
    CalendarDays,
    Clock3,
    Globe,
    MessageSquareText,
    Send,
    Share2,
    UserRound,
} from 'lucide-react';

import { Breadcrumbs, PublicPageShell } from '@/components/public/page-layout';
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
            <section className="container-page py-15">
                <Breadcrumbs
                    items={[
                        { label: 'Home', href: '/' },
                        { label: 'Blog', href: '/blog' },
                        { label: post.title },
                    ]}
                />

                <article className="mx-auto overflow-hidden rounded-xl border border-border bg-card">
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

                    <div className="p-8">
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
                            <p>
                                Saving money online is less about chasing every discount and more
                                about building better shopping habits. When you understand how
                                offers work and what terms matter most, you make more confident
                                decisions and keep more money in your wallet.
                            </p>
                            <p>
                                Saving money online is less about chasing every discount and more
                                about building better shopping habits. When you understand how
                                offers work and what terms matter most, you make more confident
                                decisions and keep more money in your wallet.
                            </p>
                        </div>
                    </div>
                </article>
            </section>
        </PublicPageShell>
    );
}
