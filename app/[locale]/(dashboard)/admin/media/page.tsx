'use client';

import { Info, Plus } from 'lucide-react';
import { useMemo, useState } from 'react';

import {
    AdminPageHeader,
    ConfirmDeleteModal,
    FilterSelect,
    SearchInput,
    Toast,
} from '@/components/admin/admin-shared';
import { MediaGrid } from '@/components/admin/media-gallery';
import { MediaUploadModal } from '@/components/admin/media-upload-modal';
import { Button } from '@/components/ui/button';
import { type MediaRecord, mediaData } from '@/utils/admin-data';

export default function MediaLibraryPage() {
    const [allMedia, setAllMedia] = useState(mediaData);
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState('all');
    const [sortFilter, setSortFilter] = useState('newest');
    const [uploadOpen, setUploadOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState<MediaRecord | null>(null);
    const [toast, setToast] = useState('');

    const filteredMedia = useMemo(() => {
        let results = allMedia.filter(item => {
            const matchesSearch =
                item.fileName.toLowerCase().includes(search.toLowerCase()) ||
                item.altText.toLowerCase().includes(search.toLowerCase());

            const matchesType =
                typeFilter === 'all' || item.mimeType.includes(typeFilter.split('/')[1] || '');

            return matchesSearch && matchesType;
        });

        // Sort
        if (sortFilter === 'newest') {
            results.sort(
                (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
            );
        } else if (sortFilter === 'oldest') {
            results.sort(
                (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
            );
        } else if (sortFilter === 'largest') {
            results.sort((a, b) => b.fileSize - a.fileSize);
        } else if (sortFilter === 'smallest') {
            results.sort((a, b) => a.fileSize - b.fileSize);
        }

        return results;
    }, [allMedia, search, typeFilter, sortFilter]);

    const handleUpload = (newMedia: MediaRecord[]) => {
        setAllMedia(prev => [newMedia, ...prev].flat());
        setToast(
            `Successfully uploaded ${newMedia.length} image${newMedia.length !== 1 ? 's' : ''}.`,
        );
    };

    const handleDelete = () => {
        if (!deleteTarget) return;

        const usageText =
            deleteTarget.usedBy && deleteTarget.usedBy.length > 0
                ? ` It is currently used by ${deleteTarget.usedBy.length} item(s).`
                : '';

        if (deleteTarget.usedBy && deleteTarget.usedBy.length > 0) {
            setToast(`Cannot delete: ${deleteTarget.fileName} is in use.${usageText}`);
        } else {
            setAllMedia(prev => prev.filter(item => item.id !== deleteTarget.id));
            setToast(`Deleted ${deleteTarget.fileName}.`);
        }
        setDeleteTarget(null);
    };

    const handleEdit = (media: MediaRecord) => {
        // In a real app, open an edit modal to update alt text, file name, etc.
        setToast(`Editing ${media.fileName} - feature coming soon.`);
    };

    const stats = {
        total: allMedia.length,
        totalSize: (allMedia.reduce((sum, m) => sum + m.fileSize, 0) / (1024 * 1024)).toFixed(1),
        usage: allMedia.filter(m => m.usedBy && m.usedBy.length > 0).length,
    };

    return (
        <>
            <AdminPageHeader
                title="Media Library"
                subtitle="Manage all website images in one centralized location."
                breadcrumb={['Dashboard', 'Media']}
                action={
                    <Button onClick={() => setUploadOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" /> Upload Media
                    </Button>
                }
            />

            {/* Stats */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-border bg-card p-4">
                    <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                        Total Images
                    </p>
                    <p className="mt-2 font-display text-[28px] font-bold text-foreground">
                        {stats.total}
                    </p>
                </div>
                <div className="rounded-2xl border border-border bg-card p-4">
                    <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                        Storage Used
                    </p>
                    <p className="mt-2 font-display text-[28px] font-bold text-foreground">
                        {stats.totalSize} MB
                    </p>
                </div>
                <div className="rounded-2xl border border-border bg-card p-4">
                    <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                        In Use
                    </p>
                    <p className="mt-2 font-display text-[28px] font-bold text-primary">
                        {stats.usage}
                    </p>
                </div>
            </div>

            {/* Search & Filters */}
            <div className="rounded-3xl border border-border bg-card p-4 shadow-soft">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <SearchInput
                        value={search}
                        onChange={setSearch}
                        placeholder="Search by name or alt text"
                    />
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <FilterSelect
                            value={typeFilter}
                            onChange={setTypeFilter}
                            placeholder="File type"
                            options={[
                                { value: 'all', label: 'All types' },
                                { value: 'image/jpeg', label: 'JPEG' },
                                { value: 'image/png', label: 'PNG' },
                                { value: 'image/webp', label: 'WebP' },
                            ]}
                        />
                        <FilterSelect
                            value={sortFilter}
                            onChange={setSortFilter}
                            placeholder="Sort by"
                            options={[
                                { value: 'newest', label: 'Newest first' },
                                { value: 'oldest', label: 'Oldest first' },
                                { value: 'largest', label: 'Largest first' },
                                { value: 'smallest', label: 'Smallest first' },
                            ]}
                        />
                    </div>
                </div>
            </div>

            {/* Results Info */}
            {filteredMedia.length > 0 && (
                <div className="flex items-center gap-2 rounded-2xl border border-amber-200/50 bg-amber-50 px-4 py-3 text-[13px] text-amber-900">
                    <Info className="h-4 w-4 flex-shrink-0" />
                    Showing {filteredMedia.length} of {allMedia.length} images
                </div>
            )}

            {/* Gallery */}
            <div>
                <MediaGrid media={filteredMedia} onEdit={handleEdit} onDelete={setDeleteTarget} />
            </div>

            {/* Modals */}
            <MediaUploadModal
                open={uploadOpen}
                onClose={() => setUploadOpen(false)}
                onUpload={handleUpload}
            />

            <ConfirmDeleteModal
                open={!!deleteTarget}
                title="Delete media"
                description={
                    deleteTarget && deleteTarget.usedBy && deleteTarget.usedBy.length > 0
                        ? `This image is currently used by:\n\n${deleteTarget.usedBy.map(u => `• ${u.name}`).join('\n')}\n\nDeleting it may break these references. Are you sure?`
                        : `This will permanently delete "${deleteTarget?.fileName}". This action cannot be undone.`
                }
                onClose={() => setDeleteTarget(null)}
                onConfirm={handleDelete}
                confirmLabel={
                    deleteTarget && deleteTarget.usedBy && deleteTarget.usedBy.length > 0
                        ? 'Delete Anyway'
                        : 'Delete'
                }
            />

            <Toast message={toast} visible={!!toast} onClose={() => setToast('')} />
        </>
    );
}
