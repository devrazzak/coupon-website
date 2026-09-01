'use client';

import Link from 'next/link';

import { useEffect, useState } from 'react';

import { PublicPageShell } from '@/components/public/page-layout';
import PATHS from '@/routes/path';
import { useGetPublicBlogs } from '@/utils/hooks/blog';

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

export default function BlogPage() {
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(search), 300);
        return () => clearTimeout(timer);
    }, [search]);

    const { data: apiData, isLoading } = useGetPublicBlogs({
        search: debouncedSearch || undefined,
        page: 1,
        limit: 20,
    });
    const posts = apiData?.data?.data ?? [];

    return (
        <PublicPageShell>
            <section className="container-page py-15">
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="font-display text-[28px] font-extrabold tracking-tight text-foreground">
                        Latest articles
                    </h2>
                    <input
                        aria-label="Search articles"
                        placeholder="Search articles..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="h-10 w-full max-w-xs rounded-md border border-border bg-card px-3 text-[14px] text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary"
                    />
                </div>

                {isLoading ? (
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div
                                key={i}
                                className="flex animate-pulse flex-col overflow-hidden rounded-2xl border border-border bg-card"
                            >
                                <div className="aspect-16/11 w-full bg-muted" />
                                <div className="flex flex-1 flex-col p-4">
                                    <div className="h-4 w-24 rounded bg-muted" />
                                    <div className="mt-2.5 h-4 w-full rounded bg-muted" />
                                    <div className="mt-1.5 h-4 w-3/4 rounded bg-muted" />
                                    <div className="mt-auto pt-3 h-3 w-32 rounded bg-muted" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {posts.map(post => (
                            <div key={post.id}>
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
                            </div>
                        ))}
                        {posts.length === 0 && (
                            <p className="col-span-full p-8 text-center text-sm text-muted-foreground">
                                No articles found.
                            </p>
                        )}
                    </div>
                )}
            </section>
        </PublicPageShell>
    );
}
