'use client';

import Image from 'next/image';
import Link from 'next/link';

import { ArrowRight, BadgeCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState } from 'react';

import Nike from '@/public/images/shops/nike.jpg';
import { stores } from '@/utils/coupello';

const filterCategories = ['All Stores', 'Hot Cash Back', 'Fashion', 'Electronics', 'Travel'];

export function PopularStores() {
    const trackRef = useRef<HTMLUListElement>(null);
    const [activeFilter, setActiveFilter] = useState('All Stores');

    const scrollBy = (dir: 1 | -1) => {
        trackRef.current?.scrollBy({ left: dir * 360, behavior: 'smooth' });
    };

    return (
        <section className="mt-15">
            <div className="container-page">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between items-center">
                    <div>
                        <h2 className="font-display text-[26px] font-extrabold tracking-tight text-foreground md:text-[32px]">
                            Popular Stores
                        </h2>
                    </div>
                    <Link
                        href="#"
                        className="inline-flex shrink-0 items-center gap-1.5 text-[13px] font-bold text-primary transition-colors hover:text-primary-hover"
                    >
                        View All Stores
                        <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                </div>
                <div className="relative mt-6">
                    <ul
                        ref={trackRef}
                        className="no-scrollbar flex snap-x gap-3.5 overflow-x-auto pb-3 pt-1"
                    >
                        {stores.map(store => (
                            <li key={store.name} className="w-42 shrink-0 snap-start sm:w-46">
                                <a
                                    href={`https://www.${store.domain}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative flex h-42 flex-col items-center justify-between rounded-xl border border-border bg-card p-3.5 text-center transition-all duration-200 hover:border-primary/50"
                                >
                                    <Image
                                        src={Nike.src}
                                        alt={`${store.name} logo`}
                                        width={64}
                                        height={64}
                                        className="w-full h-full pb-3 rounded-md"
                                    />
                                    {/* Footer Info */}
                                    <div className="flex w-full items-center justify-between border-t border-border/60 pt-2 text-[11px] text-muted-foreground">
                                        <span className="font-medium text-emerald-600 inline-flex items-center gap-0.5">
                                            <BadgeCheck className="h-3 w-3" />
                                            Active
                                        </span>
                                        <span className="font-semibold text-foreground/80 group-hover:text-primary">
                                            {store.coupons}
                                        </span>
                                    </div>
                                </a>
                            </li>
                        ))}
                    </ul>
                    <button
                        type="button"
                        onClick={() => scrollBy(-1)}
                        aria-label="Previous stores"
                        className="absolute -left-4 top-1/2 cursor-pointer hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-border bg-card text-foreground shadow-lift transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground lg:grid"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => scrollBy(1)}
                        aria-label="Next stores"
                        className="absolute -right-4 top-1/2 cursor-pointer hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-border bg-card text-foreground shadow-lift transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground lg:grid"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </section>
    );
}
