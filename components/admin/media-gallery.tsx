'use client';

import { Eye, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import type { MediaRecord } from '@/utils/admin-data';

function formatMediaDate(value: string): string {
    if (!value) return '';

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);

    return `${day}/${month}/${year}`;
}

export function MediaCard({
    media,
    onSelect,
    onDelete,
    selectable = false,
    selected = false,
}: {
    media: MediaRecord;
    onSelect?: (media: MediaRecord) => void;
    onDelete?: (media: MediaRecord) => void;
    selectable?: boolean;
    selected?: boolean;
}) {
    const hasImage = Boolean(media.url && media.url.trim() && !media.url.startsWith('blob:'));

    return (
        <div
            className={`group relative overflow-hidden rounded-2xl border-2 transition-all ${
                selected
                    ? 'border-primary bg-primary-light/20'
                    : 'border-border hover:border-primary/50'
            }`}
            onClick={() => selectable && onSelect?.(media)}
            role={selectable ? 'button' : undefined}
            tabIndex={selectable ? 0 : undefined}
        >
            {/* Image Container */}
            <div className="relative aspect-square w-full overflow-hidden bg-surface">
                {hasImage ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                        src={media.url}
                        alt={media.altText || media.fileName}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-surface text-[11px] font-semibold text-muted-foreground">
                        No Image
                    </div>
                )}
                {selected && (
                    <div className="absolute inset-0 flex items-center justify-center bg-primary/30 backdrop-blur-sm">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
                            ✓
                        </div>
                    </div>
                )}

                {/* Info Overlay */}
                <div className="absolute inset-0 flex flex-col justify-between bg-linear-to-t from-black/75 via-black/20 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="flex items-start justify-between gap-2">
                        <span className="max-w-[70%] truncate rounded-full border border-white/20 bg-black/35 px-2 py-1 text-[10px] font-medium text-white backdrop-blur-sm">
                            {media.fileName}
                        </span>
                        {!selectable && (
                            <div className="flex gap-1">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={e => {
                                        e.stopPropagation();
                                        if (media.url) {
                                            window.open(media.url, '_blank', 'noopener,noreferrer');
                                        }
                                    }}
                                    className="h-8 w-8 bg-black text-white"
                                    aria-label="View image"
                                >
                                    <Eye className="h-3.5 w-3.5" />
                                </Button>
                                {onDelete && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={e => {
                                            e.stopPropagation();
                                            onDelete(media);
                                        }}
                                        className="h-8 w-8 bg-white text-black"
                                        aria-label="Delete image"
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="h-2" />
                </div>
            </div>

            {/* Footer Info */}
            <div className="border-t border-border bg-card px-3 py-2">
                <p className="truncate text-[12px] font-medium text-foreground">{media.fileName}</p>
                <div className="mt-1 flex items-center justify-between text-[11px] text-muted-foreground">
                    <span>
                        {media.width && media.height ? `${media.width}×${media.height}` : 'Image'}
                    </span>
                    <span>{formatMediaDate(media.createdAt)}</span>
                </div>
            </div>
        </div>
    );
}

export function MediaGrid({
    media,
    onSelect,
    onDelete,
    selectable = false,
    selectedId = null,
}: {
    media: MediaRecord[];
    onSelect?: (media: MediaRecord) => void;
    onDelete?: (media: MediaRecord) => void;
    selectable?: boolean;
    selectedId?: string | null;
}) {
    if (media.length === 0) {
        return (
            <div className="rounded-3xl border border-dashed border-border bg-surface p-12 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-light text-primary">
                    📷
                </div>
                <h3 className="mt-4 font-display text-[18px] font-bold text-foreground">
                    No media uploaded
                </h3>
                <p className="mt-2 text-[14px] text-muted-foreground">
                    Upload images to get started with the Media Library.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {media.map(item => (
                <MediaCard
                    key={item.id}
                    media={item}
                    onSelect={onSelect}
                    onDelete={onDelete}
                    selectable={selectable}
                    selected={selectedId === item.id}
                />
            ))}
        </div>
    );
}
