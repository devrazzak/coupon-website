'use client';

import { Edit3, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import type { MediaRecord } from '@/utils/admin-data';

export function MediaCard({
    media,
    onSelect,
    onEdit,
    onDelete,
    selectable = false,
    selected = false,
}: {
    media: MediaRecord;
    onSelect?: (media: MediaRecord) => void;
    onEdit?: (media: MediaRecord) => void;
    onDelete?: (media: MediaRecord) => void;
    selectable?: boolean;
    selected?: boolean;
}) {
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
                <img
                    src={media.url}
                    alt={media.altText || media.fileName}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
                {selected && (
                    <div className="absolute inset-0 flex items-center justify-center bg-primary/30 backdrop-blur-sm">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
                            ✓
                        </div>
                    </div>
                )}
            </div>

            {/* Info Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/60 via-transparent to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0 flex-1">
                        <p className="truncate text-[12px] font-semibold text-white">
                            {media.fileName}
                        </p>
                        <p className="text-[11px] text-slate-200">
                            {(media.fileSize / 1024).toFixed(1)} KB
                        </p>
                    </div>
                    {!selectable && (
                        <div className="flex gap-1">
                            {onEdit && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={e => {
                                        e.stopPropagation();
                                        onEdit(media);
                                    }}
                                    className="h-8 w-8 bg-white/10 text-white hover:bg-white/20"
                                >
                                    <Edit3 className="h-3.5 w-3.5" />
                                </Button>
                            )}
                            {onDelete && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={e => {
                                        e.stopPropagation();
                                        onDelete(media);
                                    }}
                                    className="h-8 w-8 bg-rose-500/20 text-rose-300 hover:bg-rose-500/40"
                                >
                                    <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Footer Info */}
            <div className="border-t border-border bg-card px-3 py-2">
                <p className="truncate text-[12px] font-medium text-foreground">{media.fileName}</p>
                <div className="mt-1 flex items-center justify-between text-[11px] text-muted-foreground">
                    <span>
                        {media.width}×{media.height}
                    </span>
                    <span>{media.createdAt}</span>
                </div>
            </div>
        </div>
    );
}

export function MediaGrid({
    media,
    onSelect,
    onEdit,
    onDelete,
    selectable = false,
    selectedId = null,
}: {
    media: MediaRecord[];
    onSelect?: (media: MediaRecord) => void;
    onEdit?: (media: MediaRecord) => void;
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
                    onEdit={onEdit}
                    onDelete={onDelete}
                    selectable={selectable}
                    selected={selectedId === item.id}
                />
            ))}
        </div>
    );
}
