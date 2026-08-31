'use client';

import { Edit3, Eye, EyeOff, Plus, Trash2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import {
    AdminPageHeader,
    ConfirmDeleteModal,
    FilterSelect,
    SearchInput,
    StatusBadge,
    TableWrapper,
    Toast,
} from '@/components/admin/admin-shared';
import { MediaPicker } from '@/components/admin/media-picker';
import { Button } from '@/components/ui/button';
import { type MediaRecord, type StoreRecord } from '@/utils/admin-data';
import { file_base_url } from '@/utils/config';
import { useGetMedia } from '@/utils/hooks/media';
import { useCreateStore, useDeleteStore, useGetStores, useUpdateStore } from '@/utils/hooks/store';

export interface StoreApiItem {
    id: number;
    name: string;
    slug: string;
    logo: string | null;
    logo_alt_txt: string | null;
    categories: number[];
    website_url: string | null;
    affiliate_url: string | null;
    short_description: string | null;
    description: string | null;
    how_to_use: string | null;
    is_featured: boolean;
    is_active: boolean;
    sort_order: number;
    seo_title: string | null;
    meta_description: string | null;
    created_at: string;
    updated_at: string;
}

export interface StoresResponse {
    success: boolean;
    message: string;
    data: StoreApiItem[];
    meta: {
        currentPage: number;
        totalCount: number;
    };
}

function getStoresResponse(response: unknown): StoresResponse | null {
    if (!response || typeof response !== 'object') return null;

    const payload = (response as { data?: unknown }).data;
    if (payload && typeof payload === 'object' && Array.isArray((payload as StoresResponse).data)) {
        return payload as StoresResponse;
    }

    return null;
}

function normalizeMediaUrl(value: string | null | undefined): string {
    const normalized = String(value ?? '').trim();
    if (!normalized || normalized.startsWith('blob:')) return '';
    if (/^https?:\/\//i.test(normalized)) return normalized;

    const base = file_base_url.replace(/\/$/, '');
    const path = normalized.replace(/^\/+/, '');
    return `${base}/${path}`;
}

function normalizeMediaItem(item: Record<string, any>): MediaRecord {
    const filePath = String(item?.file_path ?? item?.url ?? item?.filePath ?? '');
    const fileName = String(item?.name ?? item?.fileName ?? filePath.split('/').pop() ?? 'media');
    const safeId = String(item?.id ?? (filePath || 'media-default'));

    return {
        id: safeId,
        fileName,
        url: normalizeMediaUrl(filePath),
        mimeType: String(item?.mime_type ?? item?.mimeType ?? 'image/jpeg'),
        fileSize: Number(item?.file_size ?? item?.fileSize ?? 0),
        width: Number(item?.width ?? 0),
        height: Number(item?.height ?? 0),
        altText: String(item?.alt_text ?? item?.altText ?? ''),
        uploadedBy: String(item?.uploaded_by ?? item?.uploadedBy ?? 'admin'),
        createdAt: String(item?.created_at ?? item?.createdAt ?? new Date().toISOString()),
        updatedAt: String(item?.updated_at ?? item?.updatedAt ?? new Date().toISOString()),
        usedBy: Array.isArray(item?.used_by) ? item.used_by : [],
    };
}

function getMediaItems(response: unknown): MediaRecord[] {
    if (!response || typeof response !== 'object') return [];

    const payload = (response as { data?: unknown }).data;
    const list = Array.isArray(payload)
        ? payload
        : payload &&
            typeof payload === 'object' &&
            Array.isArray((payload as { data?: unknown }).data)
          ? ((payload as { data?: unknown[] }).data ?? [])
          : [];

    return list.map(item => normalizeMediaItem((item || {}) as Record<string, any>));
}

const pageSize = 6;

function normalizeStoreLogoUrl(value: string | null | undefined): string {
    const normalized = String(value ?? '').trim();
    if (!normalized || normalized.startsWith('blob:')) return '';
    if (/^https?:\/\//i.test(normalized)) return normalized;

    const base = file_base_url.replace(/\/$/, '');
    const path = normalized.replace(/^\/+/, '');
    return `${base}/${path}`;
}

function slugify(value: string) {
    return (
        value
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '') || 'store'
    );
}

type StoreFormState = {
    id: string;
    name: string;
    slug: string;
    logo: string;
    logoAltTxt: string;
    categories: number[];
    websiteUrl: string;
    affiliateUrl: string;
    shortDescription: string;
    description: string;
    howToUse: string;
    isFeatured: boolean;
    isActive: boolean;
    sortOrder: number;
    seoTitle: string;
    metaDescription: string;
};

function StoreModal({
    initialData,
    onClose,
    onSave,
    allMedia,
    onUploadMedia,
}: {
    initialData: StoreRecord | null;
    onClose: () => void;
    onSave: (payload: StoreFormState) => void;
    allMedia: MediaRecord[];
    onUploadMedia: (media: MediaRecord[]) => void;
}) {
    const [form, setForm] = useState<StoreFormState>(
        initialData
            ? {
                  id: initialData.id,
                  name: initialData.name,
                  slug: initialData.slug,
                  logo: normalizeStoreLogoUrl(initialData.logo),
                  logoAltTxt: '',
                  categories: Array.isArray(initialData.categories)
                      ? initialData.categories
                            .map(item => Number(item))
                            .filter(item => !Number.isNaN(item))
                      : [],
                  websiteUrl: initialData.websiteUrl,
                  affiliateUrl: initialData.affiliateUrl,
                  shortDescription: initialData.shortDescription,
                  description: initialData.description,
                  howToUse: '',
                  isFeatured: Boolean(initialData.featured),
                  isActive: initialData.status === 'active',
                  sortOrder: initialData.displayOrder,
                  seoTitle: initialData.metaTitle,
                  metaDescription: initialData.metaDescription,
              }
            : {
                  id: '',
                  name: '',
                  slug: '',
                  logo: '',
                  logoAltTxt: '',
                  categories: [],
                  websiteUrl: '',
                  affiliateUrl: '',
                  shortDescription: '',
                  description: '',
                  howToUse: '',
                  isFeatured: false,
                  isActive: true,
                  sortOrder: 1,
                  seoTitle: '',
                  metaDescription: '',
              },
    );
    const [error, setError] = useState('');

    const updateField = <K extends keyof StoreFormState>(key: K, value: StoreFormState[K]) => {
        setForm(current => ({ ...current, [key]: value }));
    };

    const handleSubmit = () => {
        const name = form.name.trim();
        if (!name) {
            setError('Store name is required.');
            return;
        }
        if (!form.slug.trim()) {
            setError('Slug is required.');
            return;
        }

        onSave({
            ...form,
            id: form.id || form.slug || 'new-store',
            name,
            slug: form.slug.trim(),
            seoTitle: form.seoTitle || form.name,
            metaDescription: form.metaDescription || form.shortDescription,
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
            <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-border bg-card p-5 shadow-lift md:p-6">
                <div className="mb-5 flex items-center justify-between gap-3">
                    <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
                            Store
                        </p>
                        <h3 className="mt-1 font-display text-[26px] font-extrabold text-foreground">
                            {initialData ? 'Edit Store' : 'Create Store'}
                        </h3>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full border border-border p-2 text-muted-foreground hover:bg-muted"
                    >
                        ×
                    </button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <label className="block text-[13px] font-semibold text-foreground md:col-span-1">
                        <span className="mb-2 block">Store Name</span>
                        <input
                            value={form.name}
                            onChange={event => {
                                const name = event.target.value;
                                setForm(current => ({
                                    ...current,
                                    name,
                                    slug: current.slug || slugify(name),
                                }));
                            }}
                            className="h-11 w-full rounded-xl border border-border bg-background px-3 text-[14px] text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        />
                    </label>

                    <label className="block text-[13px] font-semibold text-foreground md:col-span-1">
                        <span className="mb-2 block">Slug</span>
                        <input
                            value={form.slug}
                            onChange={event => updateField('slug', event.target.value)}
                            className="h-11 w-full rounded-xl border border-border bg-background px-3 text-[14px] text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        />
                    </label>

                    <div className="md:col-span-2">
                        <MediaPicker
                            label="Store Logo"
                            value={form.logo}
                            onChange={url => updateField('logo', url)}
                            allMedia={allMedia}
                            onUpload={onUploadMedia}
                            helpText="Logo for storefront"
                        />
                    </div>

                    <label className="block text-[13px] font-semibold text-foreground md:col-span-1">
                        <span className="mb-2 block">Logo Alt Text</span>
                        <input
                            value={form.logoAltTxt}
                            onChange={event => updateField('logoAltTxt', event.target.value)}
                            className="h-11 w-full rounded-xl border border-border bg-background px-3 text-[14px] text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        />
                    </label>

                    <label className="block text-[13px] font-semibold text-foreground md:col-span-1">
                        <span className="mb-2 block">Categories</span>
                        <input
                            value={form.categories.join(', ')}
                            onChange={event =>
                                updateField(
                                    'categories',
                                    event.target.value
                                        .split(',')
                                        .map(item => Number(item.trim()))
                                        .filter(value => !Number.isNaN(value)),
                                )
                            }
                            className="h-11 w-full rounded-xl border border-border bg-background px-3 text-[14px] text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        />
                    </label>

                    <label className="block text-[13px] font-semibold text-foreground md:col-span-1">
                        <span className="mb-2 block">Website URL</span>
                        <input
                            value={form.websiteUrl}
                            onChange={event => updateField('websiteUrl', event.target.value)}
                            className="h-11 w-full rounded-xl border border-border bg-background px-3 text-[14px] text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        />
                    </label>

                    <label className="block text-[13px] font-semibold text-foreground md:col-span-1">
                        <span className="mb-2 block">Affiliate URL</span>
                        <input
                            value={form.affiliateUrl}
                            onChange={event => updateField('affiliateUrl', event.target.value)}
                            className="h-11 w-full rounded-xl border border-border bg-background px-3 text-[14px] text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        />
                    </label>

                    <label className="block text-[13px] font-semibold text-foreground md:col-span-2">
                        <span className="mb-2 block">Short Description</span>
                        <textarea
                            value={form.shortDescription}
                            onChange={event => updateField('shortDescription', event.target.value)}
                            className="min-h-[78px] w-full rounded-xl border border-border bg-background px-3 py-2.5 text-[14px] text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        />
                    </label>

                    <label className="block text-[13px] font-semibold text-foreground md:col-span-2">
                        <span className="mb-2 block">Description</span>
                        <textarea
                            value={form.description}
                            onChange={event => updateField('description', event.target.value)}
                            className="min-h-[110px] w-full rounded-xl border border-border bg-background px-3 py-2.5 text-[14px] text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        />
                    </label>

                    <label className="block text-[13px] font-semibold text-foreground md:col-span-2">
                        <span className="mb-2 block">How to Use</span>
                        <textarea
                            value={form.howToUse}
                            onChange={event => updateField('howToUse', event.target.value)}
                            className="min-h-[88px] w-full rounded-xl border border-border bg-background px-3 py-2.5 text-[14px] text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        />
                    </label>

                    <label className="flex items-center gap-2 text-[13px] font-semibold text-foreground">
                        <input
                            type="checkbox"
                            checked={form.isFeatured}
                            onChange={event => updateField('isFeatured', event.target.checked)}
                            className="h-4 w-4 rounded border-border text-primary"
                        />
                        Featured
                    </label>

                    <label className="flex items-center gap-2 text-[13px] font-semibold text-foreground">
                        <input
                            type="checkbox"
                            checked={form.isActive}
                            onChange={event => updateField('isActive', event.target.checked)}
                            className="h-4 w-4 rounded border-border text-primary"
                        />
                        Active
                    </label>

                    <label className="block text-[13px] font-semibold text-foreground md:col-span-1">
                        <span className="mb-2 block">Sort Order</span>
                        <input
                            type="number"
                            value={form.sortOrder}
                            onChange={event =>
                                updateField('sortOrder', Number(event.target.value) || 1)
                            }
                            className="h-11 w-full rounded-xl border border-border bg-background px-3 text-[14px] text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        />
                    </label>

                    <label className="block text-[13px] font-semibold text-foreground md:col-span-2">
                        <span className="mb-2 block">SEO Title</span>
                        <input
                            value={form.seoTitle}
                            onChange={event => updateField('seoTitle', event.target.value)}
                            className="h-11 w-full rounded-xl border border-border bg-background px-3 text-[14px] text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        />
                    </label>

                    <label className="block text-[13px] font-semibold text-foreground md:col-span-2">
                        <span className="mb-2 block">Meta Description</span>
                        <textarea
                            value={form.metaDescription}
                            onChange={event => updateField('metaDescription', event.target.value)}
                            className="min-h-[88px] w-full rounded-xl border border-border bg-background px-3 py-2.5 text-[14px] text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        />
                    </label>
                </div>

                {error && <p className="mt-4 text-[13px] font-medium text-rose-600">{error}</p>}

                <div className="mt-6 flex justify-end gap-3">
                    <Button type="button" variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="button" onClick={handleSubmit}>
                        {initialData ? 'Save Changes' : 'Create Store'}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default function StoresAdminPage() {
    const [storeOverrides, setStoreOverrides] = useState<Record<string, StoreRecord | null>>({});
    const [uploadedMedia, setUploadedMedia] = useState<MediaRecord[]>([]);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [featuredFilter, setFeaturedFilter] = useState('all');
    const [popularFilter, setPopularFilter] = useState('all');
    const [verifiedFilter, setVerifiedFilter] = useState('all');
    const [page, setPage] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<StoreRecord | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<StoreRecord | null>(null);
    const [toast, setToast] = useState('');

    const { data: apiData } = useGetStores(page, pageSize);
    const { data: mediaApiData } = useGetMedia(1, 100);
    const { mutateAsync: createStoreMutation } = useCreateStore();
    const { mutateAsync: updateStoreMutation } = useUpdateStore();
    const { mutateAsync: deleteStoreMutation } = useDeleteStore();
    const storesResponse = useMemo(() => getStoresResponse(apiData), [apiData]);
    const mediaItems = useMemo(() => getMediaItems(mediaApiData), [mediaApiData]);
    const allMedia = useMemo(() => [...uploadedMedia, ...mediaItems], [uploadedMedia, mediaItems]);

    const stores = useMemo(() => {
        const items =
            storesResponse?.data.map(store => ({
                id: String(store.id),
                name: store.name,
                slug: store.slug,
                logo: normalizeStoreLogoUrl(store.logo),
                coverImage: '',
                shortDescription: store.short_description ?? '',
                description: store.description ?? '',
                categories: store.categories.map(String),
                websiteUrl: store.website_url ?? '',
                affiliateUrl: store.affiliate_url ?? '',
                status: store.is_active ? 'active' : 'inactive',
                featured: store.is_featured,
                popular: null,
                verified: null,
                displayOrder: store.sort_order,
                metaTitle: store.seo_title ?? '',
                metaDescription: store.meta_description ?? '',
                createdAt: store.created_at,
            })) ?? [];

        return items.flatMap(store => {
            const override = storeOverrides[store.id];
            return override === null ? [] : [override ?? store];
        });
    }, [storeOverrides, storesResponse]);

    const filteredStores = useMemo(() => {
        return stores.filter(store => {
            const matchesSearch =
                store.name.toLowerCase().includes(search.toLowerCase()) ||
                store.slug.toLowerCase().includes(search.toLowerCase());
            const matchesStatus = statusFilter === 'all' || store.status === statusFilter;
            const matchesFeatured =
                featuredFilter === 'all' ||
                (featuredFilter === 'featured' ? store.featured : !store.featured);
            const matchesPopular =
                popularFilter === 'all' ||
                (popularFilter === 'popular' ? store.popular : !store.popular);
            const matchesVerified =
                verifiedFilter === 'all' ||
                (verifiedFilter === 'verified' ? store.verified : !store.verified);
            return (
                matchesSearch &&
                matchesStatus &&
                matchesFeatured &&
                matchesPopular &&
                matchesVerified
            );
        });
    }, [featuredFilter, popularFilter, search, statusFilter, stores, verifiedFilter]);

    const totalPages = Math.max(1, Math.ceil(filteredStores.length / pageSize));
    const visibleStores = filteredStores.slice((page - 1) * pageSize, page * pageSize);

    const handleSave = async (payload: StoreFormState) => {
        try {
            const safeLogoUrl = normalizeStoreLogoUrl(payload.logo);

            const createdStore: StoreRecord = {
                id: payload.id,
                name: payload.name,
                slug: payload.slug,
                logo: safeLogoUrl,
                coverImage: '',
                shortDescription: payload.shortDescription,
                description: payload.description,
                categories: payload.categories.map(String),
                websiteUrl: payload.websiteUrl,
                affiliateUrl: payload.affiliateUrl,
                status: payload.isActive ? 'active' : 'inactive',
                featured: payload.isFeatured,
                popular: false,
                verified: false,
                displayOrder: payload.sortOrder,
                metaTitle: payload.seoTitle,
                metaDescription: payload.metaDescription,
                createdAt: editing?.createdAt ?? new Date().toISOString().slice(0, 10),
            };

            const createPayload = {
                name: payload.name,
                slug: payload.slug,
                logo: safeLogoUrl,
                logo_alt_txt: payload.logoAltTxt || payload.name,
                categories: payload.categories,
                website_url: payload.websiteUrl,
                affiliate_url: payload.affiliateUrl,
                short_description: payload.shortDescription,
                description: payload.description,
                how_to_use: payload.howToUse,
                is_featured: payload.isFeatured,
                is_active: payload.isActive,
                sort_order: payload.sortOrder,
                seo_title: payload.seoTitle,
                meta_description: payload.metaDescription,
            };

            if (editing?.id) {
                await updateStoreMutation({
                    id: payload.id,
                    values: {
                        ...createPayload,
                    },
                });
                setStoreOverrides(current => ({ ...current, [payload.id]: createdStore }));
                setToast('Store updated successfully.');
            } else {
                await createStoreMutation(createPayload);
                setToast('Store created successfully.');
            }

            setModalOpen(false);
            setEditing(null);
        } catch (error) {
            setToast('Failed to save store.');
            console.error('Save error:', error);
        }
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;

        try {
            await deleteStoreMutation(deleteTarget.id);
            setStoreOverrides(current => ({ ...current, [deleteTarget.id]: null }));
            setDeleteTarget(null);
            setToast('Store deleted successfully.');
        } catch (error) {
            setToast('Failed to delete store.');
            console.error('Delete error:', error);
        }
    };

    const toggleStatus = (id: string) => {
        const store = stores.find(item => item.id === id);
        if (!store) return;

        const nextStatus = store.status === 'active' ? 'inactive' : 'active';
        setStoreOverrides(current => ({ ...current, [id]: { ...store, status: nextStatus } }));
        setToast('Store status updated.');
    };

    const toggleFeatured = (id: string) => {
        const store = stores.find(item => item.id === id);
        if (!store) return;

        setStoreOverrides(current => ({
            ...current,
            [id]: { ...store, featured: !store.featured },
        }));
        setToast('Featured status updated.');
    };

    return (
        <>
            <AdminPageHeader
                title="Stores"
                subtitle="Manage brand relationships, offers and merchandising visibility."
                breadcrumb={['Dashboard', 'Stores']}
                action={
                    <Button
                        onClick={() => {
                            setEditing(null);
                            setModalOpen(true);
                        }}
                    >
                        <Plus className="mr-2 h-4 w-4" /> Add Store
                    </Button>
                }
            />

            <div className="rounded-3xl border border-border bg-card p-4 shadow-soft">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <SearchInput value={search} onChange={setSearch} placeholder="Search stores" />
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <FilterSelect
                            value={statusFilter}
                            onChange={setStatusFilter}
                            placeholder="Status"
                            options={[
                                { value: 'all', label: 'All statuses' },
                                { value: 'active', label: 'Active' },
                                { value: 'inactive', label: 'Inactive' },
                                { value: 'draft', label: 'Draft' },
                            ]}
                        />
                        <FilterSelect
                            value={featuredFilter}
                            onChange={setFeaturedFilter}
                            placeholder="Featured"
                            options={[
                                { value: 'all', label: 'All featured' },
                                { value: 'featured', label: 'Featured' },
                                { value: 'non-featured', label: 'Not featured' },
                            ]}
                        />
                        <FilterSelect
                            value={popularFilter}
                            onChange={setPopularFilter}
                            placeholder="Popular"
                            options={[
                                { value: 'all', label: 'All popularity' },
                                { value: 'popular', label: 'Popular' },
                                { value: 'non-popular', label: 'Not popular' },
                            ]}
                        />
                        <FilterSelect
                            value={verifiedFilter}
                            onChange={setVerifiedFilter}
                            placeholder="Verified"
                            options={[
                                { value: 'all', label: 'All verification' },
                                { value: 'verified', label: 'Verified' },
                                { value: 'non-verified', label: 'Unverified' },
                            ]}
                        />
                    </div>
                </div>
            </div>

            <div className="mt-6">
                <TableWrapper>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left">
                            <thead className="bg-surface text-[12px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                                <tr>
                                    <th className="px-4 py-3">Logo</th>
                                    <th className="px-4 py-3">Store</th>
                                    <th className="px-4 py-3">Categories</th>
                                    <th className="px-4 py-3">Coupons</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3">Featured</th>
                                    <th className="px-4 py-3">Popular</th>
                                    <th className="px-4 py-3">Verified</th>
                                    <th className="px-4 py-3">Created</th>
                                    <th className="px-4 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {visibleStores.map(store => (
                                    <tr
                                        key={store.id}
                                        className="border-t border-border text-[14px] text-foreground"
                                    >
                                        <td className="px-4 py-3">
                                            {store.logo ? (
                                                /* eslint-disable-next-line @next/next/no-img-element */
                                                <img
                                                    src={store.logo}
                                                    alt={store.name}
                                                    className="h-10 w-10 rounded-xl border border-border bg-surface object-contain p-2"
                                                />
                                            ) : (
                                                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-[10px] font-semibold text-muted-foreground">
                                                    N/A
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="font-semibold">{store.name}</div>
                                            <div className="text-[12px] text-muted-foreground">
                                                {store.shortDescription || 'N/A'}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            {store.categories.length
                                                ? store.categories.join(', ')
                                                : 'N/A'}
                                        </td>
                                        <td className="px-4 py-3">
                                            {store.status === 'active' ? '24' : '0'}
                                        </td>
                                        <td className="px-4 py-3">
                                            <StatusBadge status={store.status} />
                                        </td>
                                        <td className="px-4 py-3">
                                            <StatusBadge
                                                status={store.featured ? 'featured' : 'inactive'}
                                            />
                                        </td>
                                        <td className="px-4 py-3">
                                            {store.popular === null ||
                                            store.popular === undefined ? (
                                                'N/A'
                                            ) : (
                                                <StatusBadge
                                                    status={store.popular ? 'featured' : 'inactive'}
                                                />
                                            )}
                                        </td>
                                        <td className="px-4 py-3">
                                            {store.verified === null ||
                                            store.verified === undefined ? (
                                                'N/A'
                                            ) : (
                                                <StatusBadge
                                                    status={store.verified ? 'active' : 'inactive'}
                                                />
                                            )}
                                        </td>
                                        <td className="px-4 py-3">{store.createdAt || 'N/A'}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => toggleStatus(store.id)}
                                                    title="Toggle status"
                                                >
                                                    {store.status === 'active' ? (
                                                        <Eye className="h-4 w-4" />
                                                    ) : (
                                                        <EyeOff className="h-4 w-4" />
                                                    )}
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => {
                                                        setEditing(store);
                                                        setModalOpen(true);
                                                    }}
                                                    title="Edit"
                                                >
                                                    <Edit3 className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => setDeleteTarget(store)}
                                                    title="Delete"
                                                    className="text-rose-600 hover:text-rose-700"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </TableWrapper>
            </div>

            <div className="mt-6 flex items-center justify-between">
                <div className="text-[13px] text-muted-foreground">
                    Showing {visibleStores.length} of {filteredStores.length} stores
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage(current => Math.max(1, current - 1))}
                        disabled={page === 1}
                    >
                        Previous
                    </Button>
                    <span className="text-[13px] font-medium text-foreground">
                        Page {page} / {totalPages}
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage(current => Math.min(totalPages, current + 1))}
                        disabled={page >= totalPages}
                    >
                        Next
                    </Button>
                </div>
            </div>

            {modalOpen && (
                <StoreModal
                    initialData={editing}
                    onClose={() => {
                        setEditing(null);
                        setModalOpen(false);
                    }}
                    onSave={handleSave}
                    allMedia={allMedia}
                    onUploadMedia={newMedia => setUploadedMedia(prev => [...newMedia, ...prev])}
                />
            )}
            <ConfirmDeleteModal
                open={!!deleteTarget}
                title="Delete store"
                description={
                    deleteTarget
                        ? `This store has active coupons and deleting it may affect those coupon records.`
                        : 'Delete this store?'
                }
                onClose={() => setDeleteTarget(null)}
                onConfirm={handleDelete}
            />
            <Toast message={toast} visible={!!toast} onClose={() => setToast('')} />
        </>
    );
}
