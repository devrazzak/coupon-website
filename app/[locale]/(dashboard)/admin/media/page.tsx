'use client';

import { Info, Plus } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

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
import { file_base_url } from '@/utils/config';
import { useDeleteMedia, useGetMedia } from '@/utils/hooks/media';

const pageSize = 8;

function inferMimeType(filePath: string): string {
    const normalized = String(filePath ?? '').toLowerCase();
    if (normalized.endsWith('.png')) return 'image/png';
    if (normalized.endsWith('.webp')) return 'image/webp';
    if (normalized.endsWith('.jpg') || normalized.endsWith('.jpeg')) return 'image/jpeg';
    if (normalized.endsWith('.gif')) return 'image/gif';
    return 'image/jpeg';
}

function getMediaUrl(filePath: string): string {
    const value = String(filePath ?? '').replace(/\\/g, '/');

    if (!value) return '';
    if (/^https?:\/\//i.test(value)) return value;

    const normalizedBase = file_base_url.replace(/\/$/, '');
    const normalizedPath = value.replace(/^\/+/, '');

    return `${normalizedBase}/${normalizedPath}`;
}

function normalizeMediaItem(item: Record<string, any>): MediaRecord {
    const filePath = String(item?.file_path ?? item?.url ?? item?.filePath ?? '');
    const fileName = String(item?.name ?? item?.fileName ?? filePath.split('/').pop() ?? 'media');
    const safeId = String(item?.id ?? (filePath || 'media-default'));
    const altText = String(item?.alt_text ?? item?.altText ?? '');
    const createdAt = String(item?.created_at ?? item?.createdAt ?? '');
    const updatedAt = String(item?.updated_at ?? item?.updatedAt ?? createdAt);

    return {
        id: safeId,
        fileName,
        url: getMediaUrl(filePath),
        mimeType: String(item?.mime_type ?? item?.mimeType ?? inferMimeType(filePath)),
        fileSize: Number(item?.file_size ?? item?.fileSize ?? 0),
        width: Number(item?.width ?? 0),
        height: Number(item?.height ?? 0),
        altText,
        uploadedBy: String(item?.uploaded_by ?? item?.uploadedBy ?? ''),
        createdAt,
        updatedAt,
        usedBy: Array.isArray(item?.used_by) ? item.used_by : [],
    };
}

function getMediaItems(response: unknown): {
    items: MediaRecord[];
    meta: { totalPages?: number } | null;
} {
    if (!response || typeof response !== 'object') {
        return { items: [], meta: null };
    }

    const apiResponse = response as {
        data?: unknown;
        meta?: { totalPages?: number; currentPage?: number; perPage?: number; totalCount?: number };
    };
    const responseData = apiResponse.data;

    if (Array.isArray(responseData)) {
        return {
            items: responseData.map(item =>
                normalizeMediaItem((item || {}) as Record<string, any>),
            ),
            meta: null,
        };
    }

    if (
        responseData &&
        typeof responseData === 'object' &&
        Array.isArray((responseData as { data?: unknown }).data)
    ) {
        const nestedData = (responseData as { data?: unknown }).data as unknown[];
        return {
            items: nestedData.map(item => normalizeMediaItem((item || {}) as Record<string, any>)),
            meta: (responseData as { meta?: { totalPages?: number } }).meta ?? null,
        };
    }

    const fallbackItems = (
        Array.isArray(responseData)
            ? responseData
            : Array.isArray((response as { items?: unknown[] }).items)
              ? (response as { items?: unknown[] }).items
              : []
    ) as unknown[];

    return {
        items: fallbackItems.map(item => normalizeMediaItem((item || {}) as Record<string, any>)),
        meta: apiResponse.meta ?? null,
    };
}

export default function MediaLibraryPage() {
    const [allMedia, setAllMedia] = useState(mediaData);
    const [search, setSearch] = useState('');
    const [typeFilter, setTypeFilter] = useState('all');
    const [sortFilter, setSortFilter] = useState('newest');
    const [page, setPage] = useState(1);
    const [uploadOpen, setUploadOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState<MediaRecord | null>(null);
    const [toast, setToast] = useState('');

    const { data, isFetching } = useGetMedia(page, pageSize);
    const { mutateAsync: deleteMediaMutation } = useDeleteMedia();

    const mediaResponse = useMemo(() => getMediaItems(data), [data]);

    useEffect(() => {
        if (!mediaResponse.items.length) {
            return;
        }

        // This is an incremental pagination cache; it cannot be derived from one API page.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setAllMedia(prev => {
            if (page === 1) return mediaResponse.items;
            const existingIds = new Set(prev.map(item => item.id));
            const merged = [
                ...prev,
                ...mediaResponse.items.filter(item => !existingIds.has(item.id)),
            ];
            return merged;
        });
    }, [mediaResponse.items, page]);

    const hasMore = useMemo(() => {
        if (mediaResponse.meta && typeof mediaResponse.meta.totalPages === 'number') {
            return page < mediaResponse.meta.totalPages;
        }

        return mediaResponse.items.length >= pageSize && page >= 1;
    }, [mediaResponse.items.length, mediaResponse.meta, page]);

    const filteredMedia = useMemo(() => {
        const normalizedSearch = String(search ?? '').toLowerCase();
        const getCreatedAtTime = (value: string | number | Date | null | undefined) => {
            const time = new Date(String(value ?? 0)).getTime();
            return Number.isNaN(time) ? 0 : time;
        };

        let results = allMedia.filter(item => {
            const fileName = String(item?.fileName ?? '').toLowerCase();
            const altText = String(item?.altText ?? '').toLowerCase();
            const mimeType = String(item?.mimeType ?? '').toLowerCase();
            const matchesSearch =
                fileName.includes(normalizedSearch) || altText.includes(normalizedSearch);
            const matchesType =
                typeFilter === 'all' ||
                mimeType.includes(String(typeFilter.split('/')[1] || '').toLowerCase());

            return matchesSearch && matchesType;
        });

        // Sort
        if (sortFilter === 'newest') {
            results.sort((a, b) => getCreatedAtTime(b?.createdAt) - getCreatedAtTime(a?.createdAt));
        } else if (sortFilter === 'oldest') {
            results.sort((a, b) => getCreatedAtTime(a?.createdAt) - getCreatedAtTime(b?.createdAt));
        } else if (sortFilter === 'largest') {
            results.sort((a, b) => Number(b?.fileSize ?? 0) - Number(a?.fileSize ?? 0));
        } else if (sortFilter === 'smallest') {
            results.sort((a, b) => Number(a?.fileSize ?? 0) - Number(b?.fileSize ?? 0));
        }

        return results;
    }, [allMedia, search, typeFilter, sortFilter]);

    const handleUpload = (newMedia: MediaRecord[]) => {
        setAllMedia(prev => [newMedia, ...prev].flat());
        setToast(
            `Successfully uploaded ${newMedia.length} image${newMedia.length !== 1 ? 's' : ''}.`,
        );
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;

        const usageText =
            deleteTarget.usedBy && deleteTarget.usedBy.length > 0
                ? ` It is currently used by ${deleteTarget.usedBy.length} item(s).`
                : '';

        if (deleteTarget.usedBy && deleteTarget.usedBy.length > 0) {
            setToast(`Cannot delete: ${deleteTarget.fileName} is in use.${usageText}`);
            setDeleteTarget(null);
            return;
        }

        try {
            await deleteMediaMutation(deleteTarget.id);
            setAllMedia(prev => prev.filter(item => item.id !== deleteTarget.id));
            setToast(`Deleted ${deleteTarget.fileName}.`);
        } catch (error) {
            setToast('Failed to delete media.');
        } finally {
            setDeleteTarget(null);
        }
    };

    const stats = {
        total: allMedia.length,
        totalSize: (
            allMedia.reduce((sum, m) => sum + Number(m?.fileSize ?? 0), 0) /
            (1024 * 1024)
        ).toFixed(1),
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
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-4">
                <div className="rounded-2xl border border-border bg-card p-4">
                    <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                        Total Images
                    </p>
                    <p className="mt-2 font-display text-[28px] font-bold text-foreground">
                        {stats.total}
                    </p>
                </div>
            </div>

            {/* Search & Filters */}
            <div className="rounded-3xl border border-border bg-card p-4 shadow-soft mb-4">
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

            {/* Gallery */}
            <div>
                <MediaGrid media={filteredMedia} onDelete={setDeleteTarget} />
            </div>

            {hasMore && (
                <div className="mt-6 flex justify-center">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setPage(current => current + 1)}
                        disabled={isFetching}
                    >
                        {isFetching ? 'Loading...' : 'Load more'}
                    </Button>
                </div>
            )}

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
