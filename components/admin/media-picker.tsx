'use client';

import { X } from 'lucide-react';
import { useState } from 'react';

import { MediaPickerModal } from '@/components/admin/media-picker-modal';
import { Button } from '@/components/ui/button';
import type { MediaRecord } from '@/utils/admin-data';

export function MediaPicker({
    label,
    value,
    onChange,
    allMedia,
    onUpload,
    helpText,
}: {
    label: string;
    value: string;
    onChange: (url: string, media?: MediaRecord) => void;
    allMedia: MediaRecord[];
    onUpload: (media: MediaRecord[]) => void;
    helpText?: string;
}) {
    const [pickerOpen, setPickerOpen] = useState(false);
    // Only treat as a real selection when `value` is non-empty AND a media item
    // actually resolves to that URL. This prevents a media record with a blank
    // `url` from matching when `value` is momentarily empty and rendering an
    // `<img src="">` (which makes the browser re-request the page).
    const valueUrl = String(value ?? '').trim();
    const selectedMedia = valueUrl
        ? allMedia.find(m => m.url && m.url.trim() === valueUrl)
        : undefined;

    return (
        <>
            <label className="block text-[13px] font-semibold text-foreground">
                <span className="mb-2 block">{label}</span>

                {selectedMedia ? (
                    <div className="relative w-full">
                        <div className="group relative overflow-hidden rounded-xl border border-border bg-surface">
                            <img
                                src={selectedMedia.url}
                                alt={selectedMedia.altText || selectedMedia.fileName}
                                className="h-32 w-full object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                                <Button
                                    type="button"
                                    size="sm"
                                    onClick={() => setPickerOpen(true)}
                                    className="h-9"
                                >
                                    Change
                                </Button>
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => onChange('')}
                                    className="h-9"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        <p className="mt-2 text-[12px] text-muted-foreground">
                            {selectedMedia.fileName} ({(selectedMedia.fileSize / 1024).toFixed(1)}{' '}
                            KB)
                        </p>
                    </div>
                ) : (
                    <div className="rounded-xl border border-dashed border-border bg-surface p-6 text-center">
                        <p className="text-[14px] text-muted-foreground">No image selected</p>
                        <Button type="button" onClick={() => setPickerOpen(true)} className="mt-3">
                            Select Image
                        </Button>
                    </div>
                )}

                {helpText && <p className="mt-2 text-[12px] text-muted-foreground">{helpText}</p>}
            </label>

            <MediaPickerModal
                open={pickerOpen}
                onClose={() => setPickerOpen(false)}
                onSelect={media => {
                    onChange(media.url, media);
                    setPickerOpen(false);
                }}
                allMedia={allMedia}
                onUpload={onUpload}
            />
        </>
    );
}
