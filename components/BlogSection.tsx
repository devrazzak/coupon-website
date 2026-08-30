import Image from 'next/image';
import Link from 'next/link';

import PATHS from '@/routes/path';
import { posts } from '@/utils/coupello';

import { SectionHeading } from './SectionHeading';

export function BlogSection() {
    return (
        <section className="py-15">
            <div className="container-page">
                <SectionHeading
                    title="Savings Guides & Tips"
                    subtitle="Short reads that help you spend less."
                    action="View All Posts"
                    actionHref={PATHS.blog}
                />
                <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {posts.slice(0, 4).map((post, index) => (
                        <li key={index}>
                            <Link
                                href={PATHS.blogDetails.replace(':id', post.id)}
                                className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/40"
                            >
                                <Image
                                    src={post.image.src}
                                    alt={post.title}
                                    width={800}
                                    height={560}
                                    loading="lazy"
                                    className="aspect-[16/11] w-full object-cover"
                                />
                                <div className="flex flex-1 flex-col p-4">
                                    <span className="inline-flex w-fit rounded bg-primary-light px-2.5 py-1 text-[10.5px] font-semibold text-primary">
                                        {post.category}
                                    </span>
                                    <h3 className="mt-2.5 font-display text-[14.5px] font-bold leading-snug text-foreground">
                                        {post.title}
                                    </h3>
                                    <p className="mt-auto pt-3 text-[11.5px] text-subtle-foreground">
                                        {post.date} <span className="px-1 text-border">•</span>{' '}
                                        {post.read}
                                    </p>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
