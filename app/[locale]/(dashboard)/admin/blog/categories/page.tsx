'use client';

import Link from 'next/link';

import { ArrowLeft, Edit3, Eye, EyeOff, Plus, Trash2 } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useMemo, useState } from 'react';

import {
    AdminPageHeader,
    ConfirmDeleteModal,
    FilterSelect,
    SearchInput,
    StatusBadge,
    TableWrapper,
    Toast,
} from '@/components/admin/admin-shared';
import { Button } from '@/components/ui/button';
import { type BlogCategoryCreatePayload } from '@/utils/api/blog-category';
import {
    useCreateBlogCategory,
    useDeleteBlogCategory,
    useGetBlogCategories,
    useUpdateBlogCategory,
} from '@/utils/hooks/blog-category';

export interface BlogCategoryApiItem {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    is_active: boolean;
    sort_order: number;
    created_at?: string;
    updated_at?: string;
}

export interface BlogCategoriesResponse {
    success: boolean;
    message: string;
    data: BlogCategoryApiItem[];
    meta: {
        currentPage: number;
        totalCount: number;
    };
}

function getBlogCategoriesResponse(response: unknown): BlogCategoriesResponse | null {
    if (!response || typeof response !== 'object') return null;

    const payload = (response as { data?: unknown }).data;
    if (
        payload &&
        typeof payload === 'object' &&
        Array.isArray((payload as BlogCategoriesResponse).data)
    ) {
        return payload as BlogCategoriesResponse;
    }

    return null;
}

const pageSize = 10;

function slugify(value: string) {
    return (
        value
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '') || 'blog-category'
    );
}

export type BlogCategoryUiRecord = {
    id: string;
    name: string;
    slug: string;
    description: string;
    isActive: boolean;
    sortOrder: number;
    createdAt: string;
};

type BlogCategoryFormState = {
    id: string | number;
    name: string;
    slug: string;
    description: string;
    isActive: boolean;
    sortOrder: number;
};

function getDefaultBlogCategoryForm(): BlogCategoryFormState {
    return {
        id: '',
        name: '',
        slug: '',
        description: '',
        isActive: true,
        sortOrder: 1,
    };
}

function BlogCategoryModal({
    initialData,
    onClose,
    onSave,
}: {
    initialData: BlogCategoryUiRecord | null;
    onClose: () => void;
    onSave: (payload: BlogCategoryFormState) => void;
}) {
    const [form, setForm] = useState<BlogCategoryFormState>(
        initialData
            ? {
                  id: initialData.id,
                  name: initialData.name,
                  slug: initialData.slug,
                  description: initialData.description,
                  isActive: initialData.isActive,
                  sortOrder: initialData.sortOrder,
              }
            : getDefaultBlogCategoryForm(),
    );
    const [error, setError] = useState('');

    const updateField = <K extends keyof BlogCategoryFormState>(
        key: K,
        value: BlogCategoryFormState[K],
    ) => {
        setForm(current => ({ ...current, [key]: value }));
    };

    const handleSubmit = () => {
        const name = form.name.trim();
        if (!name) {
            setError('Category name is required.');
            return;
        }

        onSave({
            ...form,
            name,
            slug: form.slug.trim() || slugify(name),
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
            <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-border bg-card p-5 shadow-lift md:p-6">
                <div className="mb-5 flex items-center justify-between gap-3">
                    <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
                            Blog Category
                        </p>
                        <h3 className="mt-1 font-display text-[26px] font-extrabold text-foreground">
                            {initialData ? 'Edit Category' : 'Create Category'}
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

                <div className="grid gap-4">
                    <label className="block text-[13px] font-semibold text-foreground">
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
                            placeholder="e.g. Marketing"
                            className="h-11 w-full rounded-xl border border-border bg-background px-3 text-[14px] text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        />
                    </label>

                    <label className="block text-[13px] font-semibold text-foreground">
                        <span className="mb-2 block">Slug</span>
                        <input
                            value={form.slug}
                            onChange={event => updateField('slug', event.target.value)}
                            placeholder="e.g. marketing"
                            className="h-11 w-full rounded-xl border border-border bg-background px-3 text-[14px] text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        />
                    </label>

                    <label className="block text-[13px] font-semibold text-foreground">
                        <span className="mb-2 block">Description</span>
                        <textarea
                            value={form.description}
                            onChange={event => updateField('description', event.target.value)}
                            placeholder="e.g. Growth and acquisition"
                            className="min-h-[88px] w-full rounded-xl border border-border bg-background px-3 py-2.5 text-[14px] text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        />
                    </label>

                    <div className="grid grid-cols-2 gap-4">
                        <label className="block text-[13px] font-semibold text-foreground">
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

                        <div className="flex items-center pt-6">
                            <label className="flex items-center gap-2 text-[13px] font-semibold text-foreground cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={form.isActive}
                                    onChange={event =>
                                        updateField('isActive', event.target.checked)
                                    }
                                    className="h-4 w-4 rounded border-border text-primary"
                                />
                                Active
                            </label>
                        </div>
                    </div>
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

export default function BlogCategoriesAdminPage() {
    const locale = useLocale();
    const [categoryOverrides, setCategoryOverrides] = useState<
        Record<string, BlogCategoryUiRecord | null>
    >({});
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [page, setPage] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<BlogCategoryUiRecord | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<BlogCategoryUiRecord | null>(null);
    const [toast, setToast] = useState('');

    const { data: apiData } = useGetBlogCategories(page, pageSize);
    const { mutateAsync: createCategoryMutation } = useCreateBlogCategory();
    const { mutateAsync: updateCategoryMutation } = useUpdateBlogCategory();
    const { mutateAsync: deleteCategoryMutation } = useDeleteBlogCategory();

    const categoriesResponse = useMemo(() => getBlogCategoriesResponse(apiData), [apiData]);

    const categories = useMemo(() => {
        const items: BlogCategoryUiRecord[] =
            categoriesResponse?.data.map(item => ({
                id: String(item.id),
                name: item.name,
                slug: item.slug,
                description: item.description ?? '',
                isActive: Boolean(item.is_active),
                sortOrder: item.sort_order ?? 1,
                createdAt: item.created_at ?? '',
            })) ?? [];

        return items.flatMap(cat => {
            const override = categoryOverrides[cat.id];
            return override === null ? [] : [override ?? cat];
        });
    }, [categoryOverrides, categoriesResponse]);

    const filteredCategories = useMemo(() => {
        return categories.filter(cat => {
            const matchesSearch =
                cat.name.toLowerCase().includes(search.toLowerCase()) ||
                cat.slug.toLowerCase().includes(search.toLowerCase()) ||
                cat.description.toLowerCase().includes(search.toLowerCase());
            const matchesStatus =
                statusFilter === 'all' ||
                (statusFilter === 'active' ? cat.isActive : !cat.isActive);
            return matchesSearch && matchesStatus;
        });
    }, [categories, search, statusFilter]);

    const totalPages = Math.max(1, Math.ceil(filteredCategories.length / pageSize));
    const visibleCategories = filteredCategories.slice((page - 1) * pageSize, page * pageSize);

    const handleSave = async (form: BlogCategoryFormState) => {
        try {
            const payload: BlogCategoryCreatePayload = {
                name: form.name.trim(),
                slug: form.slug.trim() || slugify(form.name),
                description: form.description,
                is_active: form.isActive,
                sort_order: form.sortOrder,
            };

            if (editing?.id) {
                await updateCategoryMutation({
                    id: editing.id,
                    values: payload,
                });
                const updatedRecord: BlogCategoryUiRecord = {
                    id: String(editing.id),
                    name: form.name.trim(),
                    slug: form.slug.trim() || slugify(form.name),
                    description: form.description,
                    isActive: form.isActive,
                    sortOrder: form.sortOrder,
                    createdAt: editing.createdAt ?? new Date().toISOString().slice(0, 10),
                };
                setCategoryOverrides(current => ({
                    ...current,
                    [String(editing.id)]: updatedRecord,
                }));
                setToast('Blog category updated successfully.');
            } else {
                await createCategoryMutation(payload);
                setToast('Blog category created successfully.');
            }

            setModalOpen(false);
            setEditing(null);
        } catch (error) {
            setToast('Failed to save blog category.');
            console.error('Save blog category error:', error);
        }
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;

        try {
            await deleteCategoryMutation(deleteTarget.id);
            setCategoryOverrides(current => ({ ...current, [deleteTarget.id]: null }));
            setDeleteTarget(null);
            setToast('Blog category deleted successfully.');
        } catch (error) {
            setToast('Failed to delete blog category.');
            console.error('Delete error:', error);
        }
    };

    const toggleStatus = async (id: string) => {
        const cat = categories.find(item => item.id === id);
        if (!cat) return;

        const nextActive = !cat.isActive;
        try {
            await updateCategoryMutation({
                id,
                values: { is_active: nextActive },
            });
            setCategoryOverrides(current => ({
                ...current,
                [id]: { ...cat, isActive: nextActive },
            }));
            setToast('Blog category status updated.');
        } catch (error) {
            setToast('Failed to update status.');
            console.error('Status toggle error:', error);
        }
    };

    return (
        <>
            <div className="mb-4">
                <Link
                    href={`/${locale}/admin/blog`}
                    className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-muted-foreground hover:text-primary transition-colors"
                >
                    <ArrowLeft className="h-4 w-4" /> Back to Blog Posts
                </Link>
            </div>

            <AdminPageHeader
                title="Blog Categories"
                subtitle="Manage blog taxonomies and topic classifications."
                breadcrumb={['Dashboard', 'Blog', 'Categories']}
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
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <SearchInput
                        value={search}
                        onChange={setSearch}
                        placeholder="Search blog categories by name or slug"
                    />
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <FilterSelect
                            value={statusFilter}
                            onChange={setStatusFilter}
                            placeholder="Status"
                            options={[
                                { value: 'all', label: 'All statuses' },
                                { value: 'active', label: 'Active' },
                                { value: 'inactive', label: 'Inactive' },
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
                                    <th className="px-4 py-3">Category</th>
                                    <th className="px-4 py-3">Slug</th>
                                    <th className="px-4 py-3">Description</th>
                                    <th className="px-4 py-3">Sort Order</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {visibleCategories.map(cat => (
                                    <tr
                                        key={cat.id}
                                        className="border-t border-border text-[14px] text-foreground"
                                    >
                                        <td className="px-4 py-3">
                                            <div className="font-semibold">{cat.name}</div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <code className="rounded bg-slate-100 px-2 py-1 font-mono text-[12px] text-slate-700">
                                                {cat.slug}
                                            </code>
                                        </td>
                                        <td className="px-4 py-3 text-muted-foreground">
                                            {cat.description || 'N/A'}
                                        </td>
                                        <td className="px-4 py-3 font-mono">{cat.sortOrder}</td>
                                        <td className="px-4 py-3">
                                            <StatusBadge
                                                status={cat.isActive ? 'active' : 'inactive'}
                                            />
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => toggleStatus(cat.id)}
                                                    title="Toggle status"
                                                >
                                                    {cat.isActive ? (
                                                        <Eye className="h-4 w-4" />
                                                    ) : (
                                                        <EyeOff className="h-4 w-4" />
                                                    )}
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => {
                                                        setEditing(cat);
                                                        setModalOpen(true);
                                                    }}
                                                    title="Edit"
                                                >
                                                    <Edit3 className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => setDeleteTarget(cat)}
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
                    Showing {visibleCategories.length} of {filteredCategories.length} categories
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
                <BlogCategoryModal
                    initialData={editing}
                    onClose={() => {
                        setEditing(null);
                        setModalOpen(false);
                    }}
                    onSave={handleSave}
                />
            )}
            <ConfirmDeleteModal
                open={!!deleteTarget}
                title="Delete blog category"
                description={
                    deleteTarget
                        ? `This will permanently remove the blog category "${deleteTarget.name}".`
                        : 'Delete this category?'
                }
                onClose={() => setDeleteTarget(null)}
                onConfirm={handleDelete}
            />
            <Toast message={toast} visible={!!toast} onClose={() => setToast('')} />
        </>
    );
}
