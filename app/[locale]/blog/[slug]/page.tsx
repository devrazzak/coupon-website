import { notFound } from 'next/navigation';

import { CalendarDays, Globe, MessageSquareText, Send, Share2, UserRound } from 'lucide-react';

import { Breadcrumbs, PublicPageShell } from '@/components/public/page-layout';
import { getPublicBlogBySlug } from '@/utils/api/blog';

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
            title: 'Blog | Coupello',
            description: 'Savings guides and tips.',
        };
    }

    return {
        title: `${blog.title} | Coupello Blog`,
        description: blog.short_description || '',
        alternates: {
            canonical: `/blog/${blog.slug}`,
        },
    };
}

export default async function BlogDetailPage({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { slug } = await params;
    const blog = await fetchBlog(slug);

    if (!blog) {
        notFound();
    }

    const paragraphs = (blog.description || '')
        .split(/\n+/)
        .map(p => p.trim())
        .filter(Boolean);

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

                <article className="mx-auto overflow-hidden rounded-xl border border-border bg-card">
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

                        <h1 className="mt-4 font-display text-[34px] font-extrabold leading-tight text-foreground md:text-[46px]">
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
                                        {blog.view_count ? `${blog.view_count} views` : 'Coupello'}
                                    </p>
                                    <p>{blog.tags?.length ? blog.tags.join(', ') : 'Guide'}</p>
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
                        {blog.thumbnail ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={blog.thumbnail}
                                alt={blog.title}
                                className="h-[280px] w-full object-cover md:h-[420px]"
                            />
                        ) : (
                            <div className="flex h-[280px] w-full items-center justify-center bg-muted text-4xl font-extrabold text-muted-foreground md:h-[420px]">
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
            </section>
        </PublicPageShell>
    );
}
