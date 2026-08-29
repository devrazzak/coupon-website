'use client';
import Image from 'next/image';
import Link from 'next/link';

import { BadgePercent } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export function BrandMark({ className = 'h-9 w-9' }: { className?: string }) {
    return (
        <span
            className={`relative grid shrink-0 place-items-center rounded-xl bg-gradient-to-tr from-primary to-[#FF5457] shadow-sm ${className}`}
            aria-hidden="true"
        >
            <BadgePercent
                className="h-[55%] w-[55%] text-primary-foreground drop-shadow-sm"
                strokeWidth={2.4}
            />
        </span>
    );
}

export function Logo() {
    return (
        <Link
            href="/"
            className="group flex shrink-0 items-center gap-2.5"
            aria-label="Coupello home"
        >
            <BrandMark className="h-9 w-9 transition-transform group-hover:scale-105" />
            <span className="font-display text-[21px] font-extrabold tracking-tight text-foreground">
                Coup<span className="text-primary">ello</span>
            </span>
        </Link>
    );
}

/** Real store logo from the store's own brand asset, with a wordmark fallback. */
export function StoreLogo({
    name,
    domain,
    wordmark,
    accentClass,
    size = 'md',
}: {
    name: string;
    domain: string;
    wordmark: string;
    accentClass: string;
    size?: 'sm' | 'md';
}) {
    const [failed, setFailed] = useState(false);
    const ref = useRef<HTMLImageElement>(null);

    // Catch loads that failed before hydration attached the error handler.
    useEffect(() => {
        const el = ref.current;
        if (el && el.complete && el.naturalWidth === 0) setFailed(true);
    }, []);

    if (failed) {
        return (
            <span
                className={`font-display font-bold ${size === 'sm' ? 'text-[11px]' : 'text-[17px]'} ${accentClass}`}
            >
                {wordmark}
            </span>
        );
    }

    return (
        <Image
            ref={ref}
            src={`https://logo.clearbit.com/${domain}`}
            alt={`${name} logo`}
            onError={() => setFailed(true)}
            className={`object-contain ${size === 'sm' ? 'max-h-8 max-w-[64px]' : 'max-h-10 max-w-[104px]'}`}
        />
    );
}
