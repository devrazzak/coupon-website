'use client';

import { Plus, X } from 'lucide-react';
import { useMemo, useState } from 'react';

import { SearchInput } from '@/components/admin/admin-shared';
import { MediaGrid } from '@/components/admin/media-gallery';
import { MediaUploadModal } from '@/components/admin/media-upload-modal';
import { Button } from '@/components/ui/button';
import type { MediaRecord } from '@/utils/admin-data';

export function MediaPickerModal({
    open,
    onClose,
    onSelect,
    allMedia,
    onUpload,
}: {
    open: boolean;
    onClose: () => void;
    onSelect: (media: MediaRecord) => void;
    allMedia: MediaRecord[];
    onUpload: (media: MediaRecord[]) => void;
}) {
    const [search, setSearch] = useState('');
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [uploadOpen, setUploadOpen] = useState(false);

    const filteredMedia = useMemo(() => {
        return allMedia.filter(
            item =>
                item.fileName.toLowerCase().includes(search.toLowerCase()) ||
                item.altText.toLowerCase().includes(search.toLowerCase()),
        );
    }, [allMedia, search]);

    const handleSelect = () => {
        const selected = allMedia.find(m => m.id === selectedId);
        if (selected) {
            onSelect(selected);
            onClose();
        }
    };

    if (!open) return null;

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
                <div className="flex h-full max-h-[90vh] w-full max-w-4xl flex-col rounded-3xl border border-border bg-card shadow-lift md:max-h-[85vh]">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-border px-6 py-5">
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
                                Media Library
                            </p>
                            <h3 className="mt-1 font-display text-[22px] font-extrabold text-foreground">
                                Select Image
                            </h3>
                        </div>
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-full border border-border p-2 text-muted-foreground hover:bg-muted"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Search & Upload */}
                    <div className="border-b border-border px-6 py-4">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <SearchInput
                                value={search}
                                onChange={setSearch}
                                placeholder="Search media by name..."
                            />
                            <Button onClick={() => setUploadOpen(true)} className="sm:w-auto">
                                <Plus className="mr-2 h-4 w-4" /> Upload
                            </Button>
                        </div>
                    </div>

                    {/* Gallery */}
                    <div className="flex-1 overflow-y-auto px-6 py-5">
                        <MediaGrid
                            media={filteredMedia}
                            selectable
                            selectedId={selectedId}
                            onSelect={media => setSelectedId(media.id)}
                        />
                    </div>

                    {/* Footer */}
                    <div className="border-t border-border px-6 py-4 flex justify-end gap-3">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="button" onClick={handleSelect} disabled={!selectedId}>
                            Select Image
                        </Button>
                    </div>
                </div>
            </div>

            <MediaUploadModal
                open={uploadOpen}
                onClose={() => setUploadOpen(false)}
                onUpload={media => {
                    onUpload(media);
                    setUploadOpen(false);
                }}
            />
        </>
    );
}
