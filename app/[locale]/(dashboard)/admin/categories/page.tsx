'use client';

import { Edit3, Eye, EyeOff, Plus, Sparkles, Trash2 } from 'lucide-react';
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
import { CreateCategoryModal } from '@/components/admin/category-modal';
import { MediaPicker } from '@/components/admin/media-picker';
import { Button } from '@/components/ui/button';
import { type CategoryRecord, type MediaRecord } from '@/utils/admin-data';
import { file_base_url } from '@/utils/config';
import {
    useCreateCategory,
    useDeleteCategory,
    useGetCategories,
    useUpdateCategory,
} from '@/utils/hooks/category';
import { useGetMedia } from '@/utils/hooks/media';

export interface CategoryApiItem {
    id: number;
    name: string;
    slug: string;
    image: string | null;
    short_description: string | null;
    description: string | null;
    is_featured: boolean;
    is_active: boolean;
    sort_order: number;
    seo_title: string | null;
    meta_description: string | null;
    created_at: string;
    updated_at: string;
}

export interface CategoriesResponse {
    success: boolean;
    message: string;
    data: CategoryApiItem[];
    meta: {
        currentPage: number;
        totalCount: number;
    };
}

function getCategoriesResponse(response: unknown): CategoriesResponse | null {
    if (!response || typeof response !== 'object') return null;

    const payload = (response as { data?: unknown }).data;
    if (
        payload &&
        typeof payload === 'object' &&
        Array.isArray((payload as CategoriesResponse).data)
    ) {
        return payload as CategoriesResponse;
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

function slugify(value: string) {
    return (
        value
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '') || 'category'
    );
}

function CategoryModal({
    initialData,
    onClose,
    onSave,
    allMedia,
    onUploadMedia,
}: {
    initialData: CategoryRecord | null;
    onClose: () => void;
    onSave: (payload: CategoryRecord) => void;
    allMedia: MediaRecord[];
    onUploadMedia: (media: MediaRecord[]) => void;
}) {
    const [form, setForm] = useState<CategoryRecord>(
        initialData ?? {
            id: '',
            name: '',
            slug: '',
            description: '',
            image: '',
            status: true,
            featured: false,
            displayOrder: 1,
            metaTitle: '',
            metaDescription: '',
        },
    );
    const [error, setError] = useState('');

    const updateField = <K extends keyof CategoryRecord>(key: K, value: CategoryRecord[K]) => {
        setForm(current => ({ ...current, [key]: value }));
    };

    const handleNameChange = (value: string) => {
        setForm(current => ({
            ...current,
            name: value,
            slug: current.slug || slugify(value),
        }));
    };

    const handleSubmit = () => {
        const name = form.name.trim();
        if (!name) {
            setError('Category name is required.');
            return;
        }
        if (!form.slug.trim()) {
            setError('Slug is required.');
            return;
        }
        onSave({
            ...form,
            id: form.id || form.slug || 'new-category',
            name,
            slug: form.slug.trim(),
            metaTitle: form.metaTitle || name,
            metaDescription: form.metaDescription || form.description,
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-border bg-card p-5 shadow-lift md:p-6">
                <div className="mb-5 flex items-center justify-between gap-3">
                    <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
                            Category
                        </p>
                        <h3 className="mt-1 font-display text-[26px] font-extrabold text-foreground">
                            {initialData ? 'Edit Category' : 'Create Category'}
                        </h3>
                    </div>
                    <div>
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-full border border-border p-2 text-muted-foreground hover:bg-muted"
                        >
                            ×
                        </button>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <label className="block text-[13px] font-semibold text-foreground md:col-span-1">
                        <span className="mb-2 block">Category Name</span>
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

                    <label className="block text-[13px] font-semibold text-foreground md:col-span-2">
                        <span className="mb-2 block">Description</span>
                        <textarea
                            value={form.description}
                            onChange={event => updateField('description', event.target.value)}
                            className="min-h-24 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-[14px] text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        />
                    </label>

                    <div className="md:col-span-2">
                        <MediaPicker
                            label="Category Image"
                            value={form.image}
                            onChange={url => updateField('image', url)}
                            allMedia={allMedia}
                            onUpload={onUploadMedia}
                            helpText="Select an image from the Media Library or upload a new one"
                        />
                    </div>
                    <label className="flex items-center gap-2 text-[13px] font-semibold text-foreground md:col-span-1">
                        <input
                            type="checkbox"
                            checked={form.status}
                            onChange={event => updateField('status', event.target.checked)}
                            className="h-4 w-4 rounded border-border text-primary"
                        />
                        Status
                    </label>

                    <label className="block text-[13px] font-semibold text-foreground md:col-span-1">
                        <span className="mb-2 block">Display Order</span>
                        <input
                            type="number"
                            value={form.displayOrder}
                            onChange={event =>
                                updateField('displayOrder', Number(event.target.value) || 1)
                            }
                            className="h-11 w-full rounded-xl border border-border bg-background px-3 text-[14px] text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        />
                    </label>

                    <label className="flex items-center gap-2 text-[13px] font-semibold text-foreground md:col-span-1">
                        <input
                            type="checkbox"
                            checked={form.featured}
                            onChange={event => updateField('featured', event.target.checked)}
                            className="h-4 w-4 rounded border-border text-primary"
                        />
                        Featured
                    </label>

                    <label className="block text-[13px] font-semibold text-foreground md:col-span-2">
                        <span className="mb-2 block">Meta Title</span>
                        <input
                            value={form.metaTitle}
                            onChange={event => updateField('metaTitle', event.target.value)}
                            className="h-11 w-full rounded-xl border border-border bg-background px-3 text-[14px] text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        />
                    </label>

                    <label className="block text-[13px] font-semibold text-foreground md:col-span-2">
                        <span className="mb-2 block">Meta Description</span>
                        <textarea
                            value={form.metaDescription}
                            onChange={event => updateField('metaDescription', event.target.value)}
                            className="min-h-22 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-[14px] text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        />
                    </label>
                </div>

                {error && <p className="mt-4 text-[13px] font-medium text-rose-600">{error}</p>}

                <div className="mt-6 flex justify-end gap-3">
                    <Button type="button" variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="button" onClick={handleSubmit}>
                        {initialData ? 'Save Changes' : 'Create Category'}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default function CategoriesAdminPage() {
    const [categoryOverrides, setCategoryOverrides] = useState<
        Record<string, CategoryRecord | null>
    >({});
    const [uploadedMedia, setUploadedMedia] = useState<MediaRecord[]>([]);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [featuredFilter, setFeaturedFilter] = useState('all');
    const [page, setPage] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<CategoryRecord | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<CategoryRecord | null>(null);
    const [toast, setToast] = useState('');

    const pageSize = 6;

    // API hooks
    const { data: apiData, isFetching } = useGetCategories(page, pageSize);
    const { data: mediaApiData } = useGetMedia(1, 100);
    const { mutateAsync: createCategoryMutation } = useCreateCategory();
    const { mutateAsync: updateCategoryMutation } = useUpdateCategory();
    const { mutateAsync: deleteCategoryMutation } = useDeleteCategory();
    const categoriesResponse = useMemo(() => getCategoriesResponse(apiData), [apiData]);
    const mediaItems = useMemo(() => getMediaItems(mediaApiData), [mediaApiData]);
    const allMedia = useMemo(() => [...uploadedMedia, ...mediaItems], [uploadedMedia, mediaItems]);

    const categories = useMemo(() => {
        const items =
            categoriesResponse?.data.map(category => ({
                id: String(category.id),
                name: category.name,
                slug: category.slug,
                description: category.description ?? category.short_description ?? '',
                image: category.image ?? '',
                status: category.is_active,
                featured: category.is_featured,
                displayOrder: category.sort_order,
                metaTitle: category.seo_title ?? '',
                metaDescription: category.meta_description ?? '',
                storesCount: 0,
                couponsCount: 0,
            })) ?? [];

        return items.flatMap(category => {
            const override = categoryOverrides[category.id];
            return override === null ? [] : [override ?? category];
        });
    }, [categoriesResponse, categoryOverrides]);

    const filteredCategories = useMemo(() => {
        return categories.filter(category => {
            const matchesSearch =
                category.name.toLowerCase().includes(search.toLowerCase()) ||
                category.slug.toLowerCase().includes(search.toLowerCase());
            const matchesStatus =
                statusFilter === 'all' ||
                (statusFilter === 'active' && category.status === true) ||
                (statusFilter === 'inactive' && category.status === false);
            const matchesFeatured =
                featuredFilter === 'all' ||
                (featuredFilter === 'featured' ? category.featured : !category.featured);
            return matchesSearch && matchesStatus && matchesFeatured;
        });
    }, [categories, featuredFilter, search, statusFilter]);

    const totalCount = categoriesResponse?.meta.totalCount ?? filteredCategories.length;
    const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
    const visibleCategories = filteredCategories;

    const handleSave = async (payload: CategoryRecord) => {
        try {
            if (editing?.id) {
                // Update existing category
                await updateCategoryMutation({
                    id: payload.id,
                    values: {
                        name: payload.name,
                        slug: payload.slug,
                        image: payload.image,
                        short_description: payload.description,
                        description: payload.description,
                        is_featured: payload.featured,
                        is_active: payload.status,
                        sort_order: payload.displayOrder,
                        seo_title: payload.metaTitle,
                        meta_description: payload.metaDescription,
                    },
                });
                setToast('Category updated successfully.');
            } else {
                // Create new category
                await createCategoryMutation({
                    name: payload.name,
                    slug: payload.slug,
                    image: payload.image,
                    short_description: payload.description,
                    description: payload.description,
                    is_featured: payload.featured,
                    is_active: payload.status,
                    sort_order: payload.displayOrder,
                    seo_title: payload.metaTitle,
                    meta_description: payload.metaDescription,
                });
                setToast('Category created successfully.');
            }

            // Update local state
            if (editing?.id) {
                setCategoryOverrides(current => ({ ...current, [payload.id]: payload }));
            }

            setModalOpen(false);
            setEditing(null);
        } catch (error) {
            setToast('Failed to save category.');
            console.error('Save error:', error);
        }
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;

        try {
            await deleteCategoryMutation(deleteTarget.id);
            setCategoryOverrides(current => ({ ...current, [deleteTarget.id]: null }));
            setDeleteTarget(null);
            setToast('Category deleted successfully.');
        } catch (error) {
            setToast('Failed to delete category.');
            console.error('Delete error:', error);
        }
    };

    const toggleStatus = async (id: string) => {
        const category = categories.find(item => item.id === id);

        if (!category) return;

        const newStatus = !category.status;

        try {
            await updateCategoryMutation({
                id,
                values: {
                    is_active: newStatus,
                },
            });

            setCategoryOverrides(current => ({
                ...current,
                [id]: { ...category, status: newStatus },
            }));

            setToast(`Category ${newStatus ? 'activated' : 'deactivated'} successfully.`);
        } catch (error) {
            console.error('Status update error:', error);
            setToast('Failed to update category status.');
        }
    };

    const toggleFeatured = async (id: string) => {
        const category = categories.find(item => item.id === id);
        if (!category) return;

        const featured = !category.featured;
        try {
            await updateCategoryMutation({ id, values: { is_featured: featured } });
            setCategoryOverrides(current => ({
                ...current,
                [id]: { ...category, featured },
            }));
            setToast('Featured status updated.');
        } catch (error) {
            console.error('Featured update error:', error);
            setToast('Failed to update featured status.');
        }
    };

    return (
        <>
            <AdminPageHeader
                title="Categories"
                subtitle="Manage storefront categories and merchandising priorities."
                breadcrumb={['Dashboard', 'Categories']}
                action={
                    <Button
                        onClick={() => {
                            setEditing(null);
                            setModalOpen(true);
                        }}
                    >
                        <Plus className="mr-2 h-4 w-4" /> Add Category
                    </Button>
                }
            />

            <div className="rounded-3xl border border-border bg-card p-4 shadow-soft">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <SearchInput
                        value={search}
                        onChange={setSearch}
                        placeholder="Search categories"
                    />
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <FilterSelect
                            value={statusFilter}
                            onChange={setStatusFilter}
                            placeholder="All statuses"
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
                            placeholder="Featured filter"
                            options={[
                                { value: 'all', label: 'All items' },
                                { value: 'featured', label: 'Featured only' },
                                { value: 'non-featured', label: 'Not featured' },
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
                                    <th className="px-4 py-3">Icon</th>
                                    <th className="px-4 py-3">Category</th>
                                    <th className="px-4 py-3">Slug</th>
                                    <th className="px-4 py-3">Stores</th>
                                    <th className="px-4 py-3">Coupons</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3">Featured</th>
                                    <th className="px-4 py-3">Order</th>
                                    <th className="px-4 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {visibleCategories.map(category => (
                                    <tr
                                        key={category.id}
                                        className="border-t border-border text-[14px] text-foreground"
                                    >
                                        <td className="px-4 py-3">
                                            <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-light text-primary">
                                                {category.image ? (
                                                    <img
                                                        src={category.image}
                                                        alt={category.name}
                                                        className="h-6 w-6 rounded"
                                                    />
                                                ) : (
                                                    <span className="text-[12px] font-bold uppercase text-primary">
                                                        {category.name.charAt(0)}
                                                    </span>
                                                )}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="font-semibold">{category.name}</div>
                                            <div className="text-[12px] text-muted-foreground">
                                                {category.description}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">/{category.slug}</td>
                                        <td className="px-4 py-3">0</td>
                                        <td className="px-4 py-3">0</td>
                                        <td className="px-4 py-3">
                                            <StatusBadge
                                                status={category.status ? 'active' : 'inactive'}
                                            />
                                        </td>
                                        <td className="px-4 py-3">
                                            <StatusBadge
                                                status={category.featured ? 'featured' : 'inactive'}
                                            />
                                        </td>
                                        <td className="px-4 py-3">{category.displayOrder}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => toggleStatus(category.id)}
                                                    title="Toggle status"
                                                >
                                                    {category.status ? (
                                                        <Eye className="h-4 w-4" />
                                                    ) : (
                                                        <EyeOff className="h-4 w-4" />
                                                    )}
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => toggleFeatured(category.id)}
                                                    title="Toggle featured"
                                                >
                                                    <Sparkles className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => {
                                                        setEditing(category);
                                                        setModalOpen(true);
                                                    }}
                                                    title="Edit"
                                                >
                                                    <Edit3 className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => setDeleteTarget(category)}
                                                    title="Delete"
                                                    className="text-rose-600 hover:text-rose-700"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {!isFetching && visibleCategories.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={9}
                                            className="px-4 py-10 text-center text-sm text-muted-foreground"
                                        >
                                            No categories found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </TableWrapper>
            </div>

            <div className="mt-6 flex items-center justify-between">
                <div className="text-[13px] text-muted-foreground">
                    Showing {visibleCategories.length} of {totalCount} categories
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

            {modalOpen &&
                (editing ? (
                    <CategoryModal
                        initialData={editing}
                        onClose={() => {
                            setEditing(null);
                            setModalOpen(false);
                        }}
                        onSave={handleSave}
                        allMedia={allMedia}
                        onUploadMedia={newMedia => setUploadedMedia(prev => [...newMedia, ...prev])}
                    />
                ) : (
                    <CreateCategoryModal
                        onClose={() => setModalOpen(false)}
                        onSave={handleSave}
                        allMedia={allMedia}
                        onUploadMedia={newMedia => setUploadedMedia(prev => [...newMedia, ...prev])}
                    />
                ))}

            <ConfirmDeleteModal
                open={!!deleteTarget}
                title="Delete category"
                description={
                    deleteTarget
                        ? `This category contains coupons. Deleting it may affect related catalog data.`
                        : 'Delete this category?'
                }
                onClose={() => setDeleteTarget(null)}
                onConfirm={handleDelete}
            />

            <Toast message={toast} visible={!!toast} onClose={() => setToast('')} />
        </>
    );
}
