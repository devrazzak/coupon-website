import Link from 'next/link';
import { notFound } from 'next/navigation';

import { CalendarDays, UserRound } from 'lucide-react';
import type { Metadata } from 'next';

import { BlogShareButtons } from '@/components/blog/BlogShareButtons';
import { Breadcrumbs, PublicPageShell } from '@/components/public/page-layout';
import siteConfig from '@/utils/SiteConfig';
import { getPublicBlogBySlug } from '@/utils/api/blog';
import { getPublicBlogCategories } from '@/utils/api/blog-category';

function formatDate(dateStr?: string): string {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    if (Number.isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

async function fetchBlog(slug: string) {
    try {
        const res = await getPublicBlogBySlug(slug);
        return res?.data?.data ?? null;
    } catch {
        return null;
    }
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { slug } = await params;
    const blog = await fetchBlog(slug);

    if (!blog) {
        return {
            title: `Blog | ${siteConfig.company_name}`,
            description: 'Savings guides and tips.',
        };
    }

    const title = blog.meta_title || `${blog.title} | ${siteConfig.company_name} Blog`;
    const description =
        blog.meta_description ||
        blog.short_description ||
        blog.description?.replace(/\s+/g, ' ').trim().slice(0, 160) ||
        `Read ${blog.title} and discover practical shopping tips from ${siteConfig.company_name}.`;

    return {
        title,
        description,
        alternates: {
            canonical: `/blog/${blog.slug}`,
        },
        openGraph: {
            title,
            description,
            url: `/blog/${blog.slug}`,
            siteName: siteConfig.company_name,
            type: 'article',
            ...(blog.thumbnail ? { images: [{ url: blog.thumbnail, alt: blog.title }] } : {}),
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            ...(blog.thumbnail ? { images: [blog.thumbnail] } : {}),
        },
        robots: {
            index: true,
            follow: true,
        },
    } satisfies Metadata;
}

export default async function BlogDetailPage({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { slug } = await params;
    const [blog, categoriesResponse] = await Promise.all([
        fetchBlog(slug),
        getPublicBlogCategories(1, 100).catch(() => null),
    ]);

    if (!blog) {
        notFound();
    }

    const paragraphs = (blog.description || '')
        .split(/\n+/)
        .map(p => p.trim())
        .filter(Boolean);
    const categories = categoriesResponse?.data?.data ?? [];

    return (
        <PublicPageShell>
            <section className="container-page py-15">
                <Breadcrumbs
                    items={[
                        { label: 'Home', href: '/' },
                        { label: 'Blog', href: '/blog' },
                        { label: blog.title },
                    ]}
                />

                <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
                    <article className="min-w-0 overflow-hidden rounded-xl border border-border bg-card">
                        <div className="border-b border-border p-6 md:p-8">
                            <div className="flex flex-wrap items-center gap-3 text-[12px] text-muted-foreground">
                                <span className="inline-flex rounded-full bg-primary-light px-2.5 py-1 font-semibold text-primary">
                                    {blog.category?.name || 'Blog'}
                                </span>
                                <span>•</span>
                                <span className="inline-flex items-center gap-1">
                                    <CalendarDays className="h-3.5 w-3.5" />{' '}
                                    {formatDate(blog.created_at) || 'Recently published'}
                                </span>
                            </div>

                            <h1 className="mt-4 font-display text-[34px] font-semibold leading-tight text-foreground md:text-[46px]">
                                {blog.title}
                            </h1>
                            <p className="mt-4 max-w-3xl text-[16px] leading-7 text-muted-foreground">
                                {blog.short_description}
                            </p>

                            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-4">
                                <div className="flex items-center gap-3 text-[13px] text-muted-foreground">
                                    <span className="grid h-9 w-9 place-items-center rounded-full bg-primary-light text-primary">
                                        <UserRound className="h-4 w-4" />
                                    </span>
                                    <div>
                                        <p className="font-semibold text-foreground">
                                            {blog.view_count
                                                ? `${blog.view_count} views`
                                                : siteConfig.company_name}
                                        </p>
                                        <p>{blog.tags?.length ? blog.tags.join(', ') : 'Guide'}</p>
                                    </div>
                                </div>

                                <BlogShareButtons title={blog.title} />
                            </div>
                        </div>

                        <div className="overflow-hidden">
                            {blog.thumbnail ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={blog.thumbnail}
                                    alt={blog.title}
                                    className="h-70 w-full object-cover md:h-105"
                                />
                            ) : (
                                <div className="flex h-70 w-full items-center justify-center bg-muted text-4xl font-semibold text-muted-foreground md:h-105">
                                    {blog.title.charAt(0).toUpperCase()}
                                </div>
                            )}
                        </div>

                        <div className="p-8">
                            <div className="prose max-w-none text-[15px] leading-8 text-foreground prose-headings:font-display prose-headings:tracking-[-0.03em] prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground prose-li:text-muted-foreground">
                                {paragraphs.length > 0 ? (
                                    paragraphs.map((p, index) => (
                                        <p key={index} className={index === 0 ? 'mt-0' : ''}>
                                            {p}
                                        </p>
                                    ))
                                ) : (
                                    <p className="mt-0">
                                        {blog.short_description || 'No content yet.'}
                                    </p>
                                )}
                            </div>
                        </div>
                    </article>

                    <aside className="rounded-xl border border-border bg-card p-5 lg:sticky lg:top-24">
                        <h2 className="font-display text-lg font-bold text-foreground">
                            Blog Categories
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                            Explore more savings guides and shopping tips by category.
                        </p>
                        <nav aria-label="Blog categories" className="mt-5 space-y-2">
                            {categories.length > 0 ? (
                                categories.map(category => (
                                    <Link
                                        key={category.id}
                                        href={`/blog?category_id=${category.id}`}
                                        className="group flex items-center justify-between rounded-lg border border-border/60 bg-muted/20 px-3.5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/20 hover:bg-primary-light hover:text-primary"
                                    >
                                        <span>{category.name}</span>
                                        <span className="translate-x-1 text-primary opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">
                                            →
                                        </span>
                                    </Link>
                                ))
                            ) : (
                                <p className="rounded-lg bg-muted/50 px-3.5 py-3 text-sm text-muted-foreground">
                                    No categories available yet.
                                </p>
                            )}
                        </nav>
                    </aside>
                </div>
            </section>
        </PublicPageShell>
    );
}
