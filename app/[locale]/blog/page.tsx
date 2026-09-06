'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { useEffect, useState } from 'react';

import { PageHeader, PublicPageShell } from '@/components/public/page-layout';
import PATHS from '@/routes/path';
import { useGetPublicBlogs } from '@/utils/hooks/blog';

const PAGE_LIMIT = 12;

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
    const router = useRouter();
    const searchParams = useSearchParams();
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const categoryId = (() => {
        const value = searchParams.get('category_id');
        const parsedValue = value ? Number(value) : NaN;
        return Number.isNaN(parsedValue) ? undefined : parsedValue;
    })();
    const page = (() => {
        const value = searchParams.get('page');
        const parsedValue = value ? Number(value) : NaN;
        return Number.isNaN(parsedValue) || parsedValue < 1 ? 1 : parsedValue;
    })();

    const updatePage = (newPage: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', String(newPage));
        router.push(`?${params.toString()}`);
    };

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(search), 300);
        return () => clearTimeout(timer);
    }, [search]);

    const { data: apiData, isLoading } = useGetPublicBlogs({
        search: debouncedSearch || undefined,
        categoryIds: categoryId ? [categoryId] : undefined,
        page,
        limit: PAGE_LIMIT,
    });
    const posts = apiData?.data?.data ?? [];
    const totalCount = apiData?.data?.meta?.totalCount ?? 0;
    const totalPages = Math.ceil(totalCount / PAGE_LIMIT);

    return (
        <PublicPageShell>
            <PageHeader
                title="Savings Guides & Tips"
                description="Read practical shopping guides, coupon tips, and money-saving advice to help you find better deals and make smarter online purchases with Coupello."
            />
            <section className="container-page py-15">
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="font-display text-[28px] font-semibold tracking-tight text-foreground">
                        Latest Articles
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

                {totalPages > 1 && (
                    <nav
                        aria-label="Blog pagination"
                        className="mt-10 flex flex-wrap items-center justify-center gap-2"
                    >
                        <button
                            type="button"
                            onClick={() => updatePage(Math.max(1, page - 1))}
                            disabled={page === 1 || isLoading}
                            className="rounded-md border border-border bg-card px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Previous
                        </button>
                        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                            pageNumber => (
                                <button
                                    key={pageNumber}
                                    type="button"
                                    onClick={() => updatePage(pageNumber)}
                                    disabled={isLoading}
                                    aria-current={page === pageNumber ? 'page' : undefined}
                                    className={`grid h-9 min-w-9 place-items-center rounded-md px-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
                                        page === pageNumber
                                            ? 'bg-primary text-primary-foreground'
                                            : 'border border-border bg-card text-foreground hover:border-primary hover:text-primary'
                                    }`}
                                >
                                    {pageNumber}
                                </button>
                            ),
                        )}
                        <button
                            type="button"
                            onClick={() => updatePage(Math.min(totalPages, page + 1))}
                            disabled={page === totalPages || isLoading}
                            className="rounded-md border border-border bg-card px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Next
                        </button>
                    </nav>
                )}
            </section>
        </PublicPageShell>
    );
}
