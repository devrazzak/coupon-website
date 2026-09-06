'use client';

import { Check, Link2, Share2 } from 'lucide-react';
import { useState } from 'react';

export function BlogShareButtons({ title }: { title: string }) {
    const [copied, setCopied] = useState(false);

    const getShareUrl = () => window.location.href;

    const openShareWindow = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const copyLink = async () => {
        await navigator.clipboard.writeText(getShareUrl());
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1800);
    };

    const shareArticle = async () => {
        if (navigator.share) {
            await navigator.share({ title, url: getShareUrl() });
            return;
        }
        await copyLink();
    };

    return (
        <div className="flex items-center gap-2">
            <button
                type="button"
                onClick={() =>
                    openShareWindow(
                        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getShareUrl())}`,
                    )
                }
                aria-label="Share article on Facebook"
                title="Share on Facebook"
                className="grid h-9 w-9 place-items-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 fill-current">
                    <path d="M14 8h3V4h-3c-3.314 0-6 2.686-6 6v2H5v4h3v8h4v-8h4l1-4h-5v-2c0-1.105.895-2 2-2Z" />
                </svg>
            </button>
            <button
                type="button"
                onClick={() =>
                    openShareWindow(
                        `https://wa.me/?text=${encodeURIComponent(`${title} ${getShareUrl()}`)}`,
                    )
                }
                aria-label="Share article on WhatsApp"
                title="Share on WhatsApp"
                className="grid h-9 w-9 place-items-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 fill-current">
                    <path d="M12.04 2a9.95 9.95 0 0 0-8.58 15l-1.02 3.73 3.82-1a9.95 9.95 0 1 0 5.78-17.73Zm0 18.1a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-2.27.6.61-2.21-.2-.32A8.1 8.1 0 1 1 12.04 20.1Zm4.44-6.08c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.92-1.18-.71-.63-1.19-1.41-1.33-1.65-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.58.18 1.11.16 1.53.1.47-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
                </svg>
            </button>
            <button
                type="button"
                onClick={copyLink}
                aria-label={copied ? 'Article link copied' : 'Copy article link'}
                title={copied ? 'Copied' : 'Copy link'}
                className="grid h-9 w-9 place-items-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Link2 className="h-3.5 w-3.5" />}
            </button>
            <button
                type="button"
                onClick={shareArticle}
                aria-label="Share article"
                title="Share article"
                className="grid h-9 w-9 place-items-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
                <Share2 className="h-3.5 w-3.5" />
            </button>
        </div>
    );
}
