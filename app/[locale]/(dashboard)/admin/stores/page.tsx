'use client';

import { Edit3, Eye, EyeOff, Plus, Trash2 } from 'lucide-react';
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
import { MediaPicker } from '@/components/admin/media-picker';
import { Button } from '@/components/ui/button';
import { type MediaRecord, type StoreRecord, mediaData, storeData } from '@/utils/admin-data';

const pageSize = 6;

function slugify(value: string) {
    return (
        value
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '') || 'store'
    );
}

function StoreModal({
    initialData,
    onClose,
    onSave,
    allMedia,
    onUploadMedia,
}: {
    initialData: StoreRecord | null;
    onClose: () => void;
    onSave: (payload: StoreRecord) => void;
    allMedia: MediaRecord[];
    onUploadMedia: (media: MediaRecord[]) => void;
}) {
    const [form, setForm] = useState<StoreRecord>(
        initialData ?? {
            id: '',
            name: '',
            slug: '',
            logo: '',
            coverImage: '',
            shortDescription: '',
            description: '',
            categories: [],
            websiteUrl: '',
            affiliateUrl: '',
            status: 'active',
            featured: false,
            popular: false,
            verified: false,
            displayOrder: 1,
            metaTitle: '',
            metaDescription: '',
            createdAt: new Date().toISOString().slice(0, 10),
        },
    );
    const [error, setError] = useState('');

    const updateField = <K extends keyof StoreRecord>(key: K, value: StoreRecord[K]) => {
        setForm(current => ({ ...current, [key]: value }));
    };

    const handleSubmit = () => {
        if (!form.name.trim()) {
            setError('Store name is required.');
            return;
        }
        if (!form.slug.trim()) {
            setError('Slug is required.');
            return;
        }

        onSave({
            ...form,
            id: form.id || `store-${Date.now()}`,
            name: form.name.trim(),
            slug: form.slug.trim(),
            metaTitle: form.metaTitle || form.name,
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

                    <div className="md:col-span-1">
                        <MediaPicker
                            label="Store Logo"
                            value={form.logo}
                            onChange={url => updateField('logo', url)}
                            allMedia={allMedia}
                            onUpload={onUploadMedia}
                            helpText="Logo for storefront"
                        />
                    </div>

                    <div className="md:col-span-1">
                        <MediaPicker
                            label="Cover Image"
                            value={form.coverImage}
                            onChange={url => updateField('coverImage', url)}
                            allMedia={allMedia}
                            onUpload={onUploadMedia}
                            helpText="Banner image for store page"
                        />
                    </div>

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
                        <span className="mb-2 block">Categories</span>
                        <input
                            value={form.categories.join(', ')}
                            onChange={event =>
                                updateField(
                                    'categories',
                                    event.target.value
                                        .split(',')
                                        .map(item => item.trim())
                                        .filter(Boolean),
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

                    <label className="block text-[13px] font-semibold text-foreground md:col-span-1">
                        <span className="mb-2 block">Status</span>
                        <select
                            value={form.status}
                            onChange={event =>
                                updateField('status', event.target.value as StoreRecord['status'])
                            }
                            className="h-11 w-full rounded-xl border border-border bg-background px-3 text-[14px] text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="draft">Draft</option>
                        </select>
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

                    <label className="flex items-center gap-2 text-[13px] font-semibold text-foreground">
                        <input
                            type="checkbox"
                            checked={form.featured}
                            onChange={event => updateField('featured', event.target.checked)}
                            className="h-4 w-4 rounded border-border text-primary"
                        />
                        Featured
                    </label>
                    <label className="flex items-center gap-2 text-[13px] font-semibold text-foreground">
                        <input
                            type="checkbox"
                            checked={form.popular}
                            onChange={event => updateField('popular', event.target.checked)}
                            className="h-4 w-4 rounded border-border text-primary"
                        />
                        Popular
                    </label>
                    <label className="flex items-center gap-2 text-[13px] font-semibold text-foreground">
                        <input
                            type="checkbox"
                            checked={form.verified}
                            onChange={event => updateField('verified', event.target.checked)}
                            className="h-4 w-4 rounded border-border text-primary"
                        />
                        Verified
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
    const [stores, setStores] = useState(storeData);
    const [allMedia, setAllMedia] = useState(mediaData);
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

    const handleSave = (payload: StoreRecord) => {
        setStores(current => {
            const index = current.findIndex(item => item.id === payload.id);
            if (index >= 0) {
                const updated = [...current];
                updated[index] = payload;
                return updated;
            }
            return [payload, ...current];
        });
        setModalOpen(false);
        setEditing(null);
        setToast(payload.id ? 'Store updated successfully.' : 'Store created successfully.');
    };

    const handleDelete = () => {
        if (!deleteTarget) return;
        setStores(current => current.filter(item => item.id !== deleteTarget.id));
        setDeleteTarget(null);
        setToast('Store deleted successfully.');
    };

    const toggleStatus = (id: string) => {
        setStores(current =>
            current.map(store =>
                store.id === id
                    ? { ...store, status: store.status === 'active' ? 'inactive' : 'active' }
                    : store,
            ),
        );
        setToast('Store status updated.');
    };

    const toggleFeatured = (id: string) => {
        setStores(current =>
            current.map(store =>
                store.id === id ? { ...store, featured: !store.featured } : store,
            ),
        );
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
                                            <img
                                                src={store.logo}
                                                alt={store.name}
                                                className="h-10 w-10 rounded-xl border border-border bg-surface object-contain p-2"
                                            />
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="font-semibold">{store.name}</div>
                                            <div className="text-[12px] text-muted-foreground">
                                                {store.shortDescription}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            {store.categories.join(', ') || '—'}
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
                                            <StatusBadge
                                                status={store.popular ? 'featured' : 'inactive'}
                                            />
                                        </td>
                                        <td className="px-4 py-3">
                                            <StatusBadge
                                                status={store.verified ? 'active' : 'inactive'}
                                            />
                                        </td>
                                        <td className="px-4 py-3">{store.createdAt}</td>
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
                    onUploadMedia={newMedia => setAllMedia(prev => [...newMedia, ...prev])}
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
