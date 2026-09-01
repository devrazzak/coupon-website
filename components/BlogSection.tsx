'use client';

import Link from 'next/link';

import PATHS from '@/routes/path';
import { useGetPublicBlogs } from '@/utils/hooks/blog';

import { SectionHeading } from './SectionHeading';

function formatDate(dateStr?: string): string {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    if (Number.isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}

export function BlogSection() {
    const { data: apiData, isLoading } = useGetPublicBlogs({ page: 1, limit: 4 });
    const posts = apiData?.data?.data ?? [];

    return (
        <section className="py-15">
            <div className="container-page">
                <SectionHeading
                    title="Savings Guides & Tips"
                    subtitle="Short reads that help you spend less."
                    action="View All Posts"
                    actionHref={PATHS.blog}
                />
                {isLoading ? (
                    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <li key={i}>
                                <div className="flex animate-pulse flex-col overflow-hidden rounded-2xl border border-border bg-card">
                                    <div className="aspect-16/11 w-full bg-muted" />
                                    <div className="flex flex-1 flex-col p-4">
                                        <div className="h-4 w-24 rounded bg-muted" />
                                        <div className="mt-2.5 h-4 w-full rounded bg-muted" />
                                        <div className="mt-1.5 h-4 w-3/4 rounded bg-muted" />
                                        <div className="mt-auto pt-3 h-3 w-32 rounded bg-muted" />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {posts.map(post => (
                            <li key={post.id}>
                                <Link
                                    href={PATHS.blogDetails.replace(':id', post.slug)}
                                    className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/40"
                                >
                                    {post.thumbnail ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={post.thumbnail}
                                            alt={post.title}
                                            loading="lazy"
                                            className="aspect-16/11 w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex aspect-16/11 w-full items-center justify-center bg-muted text-muted-foreground">
                                            {post.title.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                    <div className="flex flex-1 flex-col p-4">
                                        <span className="inline-flex w-fit rounded bg-primary-light px-2.5 py-1 text-[10.5px] font-semibold text-primary">
                                            {post.category?.name || 'Blog'}
                                        </span>
                                        <h3 className="mt-2.5 font-display text-[14.5px] font-bold leading-snug text-foreground">
                                            {post.title}
                                        </h3>
                                        <p className="mt-auto pt-3 text-[11.5px] text-subtle-foreground">
                                            {formatDate(post.created_at) || 'Recently published'}
                                        </p>
                                    </div>
                                </Link>
                            </li>
                        ))}
                        {posts.length === 0 && (
                            <li className="col-span-full p-8 text-center text-sm text-muted-foreground">
                                No articles found.
                            </li>
                        )}
                    </ul>
                )}
            </div>
        </section>
    );
}
