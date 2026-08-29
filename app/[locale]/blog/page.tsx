import Image from 'next/image';
import Link from 'next/link';

import { Search } from 'lucide-react';

import {
    BlogCard,
    FilterPill,
    PageHeader,
    Pagination,
    PublicPageShell,
} from '@/components/public/page-layout';
import { blogPosts } from '@/utils/public-content';

const categories = ['All', 'Shopping Tips', 'Deals Guide', 'Seasonal Deals', 'Budgeting'];

export default function BlogPage() {
    const featured = blogPosts[0];
    const remaining = blogPosts.slice(1);

    return (
        <PublicPageShell>
            <PageHeader
                eyebrow="Savings guides"
                title="Smart shopping ideas & money-saving tips"
                description="Browse practical advice, new deal trends and expert tips to help you make the most of every purchase."
            />

            <section className="container-page py-8 md:py-10">
                <div className="rounded-3xl border border-border bg-card p-4 shadow-soft md:p-5">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="relative w-full max-w-xl">
                            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <input
                                aria-label="Search blog posts"
                                placeholder="Search articles, tips, deals..."
                                className="h-11 w-full rounded-full border border-border bg-background pl-10 pr-3 text-[14px] text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10"
                            />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {categories.map((item, index) => (
                                <FilterPill key={item} active={index === 0}>
                                    {item}
                                </FilterPill>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-8 overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
                    <div className="grid gap-0 lg:grid-cols-[1.2fr_0.8fr]">
                        <div>
                            <Image
                                src={featured.image}
                                alt={featured.title}
                                width={1600}
                                height={900}
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div className="flex flex-col justify-center p-5 md:p-7">
                            <span className="inline-flex w-fit rounded bg-primary-light px-2.5 py-1 text-[10.5px] font-semibold text-primary">
                                {featured.category}
                            </span>
                            <h2 className="mt-3 font-display text-[26px] font-extrabold leading-tight text-foreground md:text-[32px]">
                                {featured.title}
                            </h2>
                            <p className="mt-3 text-[14px] leading-7 text-muted-foreground">
                                {featured.excerpt}
                            </p>
                            <div className="mt-4 flex flex-wrap items-center gap-3 text-[12px] text-muted-foreground">
                                <span>{featured.author}</span>
                                <span>•</span>
                                <span>{featured.date}</span>
                                <span>•</span>
                                <span>{featured.readTime}</span>
                            </div>
                            <Link
                                href={`/blog/${featured.slug}`}
                                className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-[13px] font-bold text-primary-foreground hover:bg-primary-hover"
                            >
                                Read article
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-10">
                    <div className="mb-5 flex items-center justify-between gap-3">
                        <h2 className="font-display text-[28px] font-extrabold tracking-tight text-foreground">
                            Latest articles
                        </h2>
                        <Link
                            href="/blog"
                            className="text-[13px] font-semibold text-primary hover:text-primary-hover"
                        >
                            View all
                        </Link>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {remaining.map(post => (
                            <BlogCard key={post.slug} item={post} />
                        ))}
                    </div>
                </div>

                <div className="mt-10">
                    <h2 className="mb-5 font-display text-[28px] font-extrabold tracking-tight text-foreground">
                        Popular & trending
                    </h2>
                    <div className="grid gap-4 lg:grid-cols-2">
                        {blogPosts.slice(0, 2).map(post => (
                            <BlogCard key={post.slug} item={post} />
                        ))}
                    </div>
                </div>

                <Pagination />
            </section>
        </PublicPageShell>
    );
}
