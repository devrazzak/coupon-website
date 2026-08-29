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
import { Button } from '@/components/ui/button';
import { type CouponRecord, couponData } from '@/utils/admin-data';

const pageSize = 6;

function slugify(value: string) {
    return (
        value
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '') || 'coupon'
    );
}

function getDefaultCouponForm(): CouponRecord {
    const today = new Date();
    const thirtyDaysOut = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
    return {
        id: '',
        store: '',
        title: '',
        slug: '',
        shortDescription: '',
        description: '',
        type: 'Code',
        code: '',
        discountType: 'Percent',
        discountValue: '',
        minimumPurchase: '',
        maximumDiscount: '',
        membershipRequirement: '',
        restrictions: '',
        terms: '',
        startDate: today.toISOString().slice(0, 10),
        expirationDate: thirtyDaysOut.toISOString().slice(0, 10),
        alwaysActive: false,
        verified: false,
        verificationDate: '',
        lastTestedDate: '',
        verificationNotes: '',
        featured: false,
        popular: false,
        trending: false,
        displayOrder: 1,
        affiliateUrl: '',
        destinationUrl: '',
        metaTitle: '',
        metaDescription: '',
        status: 'active',
    };
}

function CouponModal({
    initialData,
    onClose,
    onSave,
}: {
    initialData: CouponRecord | null;
    onClose: () => void;
    onSave: (payload: CouponRecord) => void;
}) {
    const [form, setForm] = useState<CouponRecord>(initialData ?? getDefaultCouponForm());
    const [error, setError] = useState('');

    const updateField = <K extends keyof CouponRecord>(key: K, value: CouponRecord[K]) => {
        setForm(current => ({ ...current, [key]: value }));
    };

    const handleSubmit = () => {
        if (!form.title.trim()) {
            setError('Coupon title is required.');
            return;
        }
        if (!form.store.trim()) {
            setError('Store name is required.');
            return;
        }
        if (!form.code.trim()) {
            setError('Coupon code is required.');
            return;
        }

        onSave({
            ...form,
            id: form.id || `coupon-${Date.now()}`,
            title: form.title.trim(),
            store: form.store.trim(),
            slug: form.slug.trim() || slugify(form.title),
            code: form.code.trim().toUpperCase(),
            metaTitle: form.metaTitle || form.title,
            metaDescription: form.metaDescription || form.shortDescription,
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
            <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-border bg-card p-5 shadow-lift md:p-6">
                <div className="mb-5 flex items-center justify-between gap-3">
                    <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
                            Coupon
                        </p>
                        <h3 className="mt-1 font-display text-[26px] font-extrabold text-foreground">
                            {initialData ? 'Edit Coupon' : 'Create Coupon'}
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

                <div className="grid gap-4 md:grid-cols-3">
                    <label className="block text-[13px] font-semibold text-foreground md:col-span-2">
                        <span className="mb-2 block">Coupon Title</span>
                        <input
                            value={form.title}
                            onChange={event => {
                                const title = event.target.value;
                                setForm(current => ({
                                    ...current,
                                    title,
                                    slug: current.slug || slugify(title),
                                }));
                            }}
                            className="h-11 w-full rounded-xl border border-border bg-background px-3 text-[14px] text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        />
                    </label>

                    <label className="block text-[13px] font-semibold text-foreground md:col-span-1">
                        <span className="mb-2 block">Store</span>
                        <input
                            value={form.store}
                            onChange={event => updateField('store', event.target.value)}
                            className="h-11 w-full rounded-xl border border-border bg-background px-3 text-[14px] text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        />
                    </label>

                    <label className="block text-[13px] font-semibold text-foreground md:col-span-1">
                        <span className="mb-2 block">Type</span>
                        <select
                            value={form.type}
                            onChange={event =>
                                updateField('type', event.target.value as CouponRecord['type'])
                            }
                            className="h-11 w-full rounded-xl border border-border bg-background px-3 text-[14px] text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        >
                            <option value="Code">Code</option>
                            <option value="Deal">Deal</option>
                        </select>
                    </label>

                    <label className="block text-[13px] font-semibold text-foreground md:col-span-1">
                        <span className="mb-2 block">Code</span>
                        <input
                            value={form.code}
                            onChange={event => updateField('code', event.target.value)}
                            className="h-11 w-full rounded-xl border border-border bg-background px-3 text-[14px] text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        />
                    </label>

                    <label className="block text-[13px] font-semibold text-foreground md:col-span-1">
                        <span className="mb-2 block">Discount Type</span>
                        <select
                            value={form.discountType}
                            onChange={event =>
                                updateField(
                                    'discountType',
                                    event.target.value as CouponRecord['discountType'],
                                )
                            }
                            className="h-11 w-full rounded-xl border border-border bg-background px-3 text-[14px] text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        >
                            <option value="Percent">Percent</option>
                            <option value="Fixed">Fixed</option>
                            <option value="Cashback">Cashback</option>
                        </select>
                    </label>

                    <label className="block text-[13px] font-semibold text-foreground md:col-span-1">
                        <span className="mb-2 block">Discount Value</span>
                        <input
                            value={form.discountValue}
                            onChange={event => updateField('discountValue', event.target.value)}
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

                    <label className="block text-[13px] font-semibold text-foreground md:col-span-1">
                        <span className="mb-2 block">Status</span>
                        <select
                            value={form.status}
                            onChange={event =>
                                updateField('status', event.target.value as CouponRecord['status'])
                            }
                            className="h-11 w-full rounded-xl border border-border bg-background px-3 text-[14px] text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="expired">Expired</option>
                        </select>
                    </label>

                    <label className="block text-[13px] font-semibold text-foreground md:col-span-3">
                        <span className="mb-2 block">Description</span>
                        <textarea
                            value={form.description}
                            onChange={event => updateField('description', event.target.value)}
                            className="min-h-[110px] w-full rounded-xl border border-border bg-background px-3 py-2.5 text-[14px] text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        />
                    </label>

                    <label className="block text-[13px] font-semibold text-foreground md:col-span-1">
                        <span className="mb-2 block">Min Purchase</span>
                        <input
                            value={form.minimumPurchase}
                            onChange={event => updateField('minimumPurchase', event.target.value)}
                            className="h-11 w-full rounded-xl border border-border bg-background px-3 text-[14px] text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        />
                    </label>

                    <label className="block text-[13px] font-semibold text-foreground md:col-span-1">
                        <span className="mb-2 block">Max Discount</span>
                        <input
                            value={form.maximumDiscount}
                            onChange={event => updateField('maximumDiscount', event.target.value)}
                            className="h-11 w-full rounded-xl border border-border bg-background px-3 text-[14px] text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        />
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

                    <label className="block text-[13px] font-semibold text-foreground md:col-span-1">
                        <span className="mb-2 block">Start Date</span>
                        <input
                            type="date"
                            value={form.startDate}
                            onChange={event => updateField('startDate', event.target.value)}
                            className="h-11 w-full rounded-xl border border-border bg-background px-3 text-[14px] text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        />
                    </label>

                    <label className="block text-[13px] font-semibold text-foreground md:col-span-1">
                        <span className="mb-2 block">Expiration Date</span>
                        <input
                            type="date"
                            value={form.expirationDate}
                            onChange={event => updateField('expirationDate', event.target.value)}
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
                            checked={form.trending}
                            onChange={event => updateField('trending', event.target.checked)}
                            className="h-4 w-4 rounded border-border text-primary"
                        />
                        Trending
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
                </div>

                {error && <p className="mt-4 text-[13px] font-medium text-rose-600">{error}</p>}

                <div className="mt-6 flex justify-end gap-3">
                    <Button type="button" variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="button" onClick={handleSubmit}>
                        {initialData ? 'Save Changes' : 'Create Coupon'}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default function CouponsAdminPage() {
    const [coupons, setCoupons] = useState(couponData);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all');
    const [featuredFilter, setFeaturedFilter] = useState('all');
    const [page, setPage] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<CouponRecord | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<CouponRecord | null>(null);
    const [toast, setToast] = useState('');

    const filteredCoupons = useMemo(() => {
        return coupons.filter(coupon => {
            const matchesSearch =
                coupon.title.toLowerCase().includes(search.toLowerCase()) ||
                coupon.code.toLowerCase().includes(search.toLowerCase()) ||
                coupon.store.toLowerCase().includes(search.toLowerCase());
            const matchesStatus = statusFilter === 'all' || coupon.status === statusFilter;
            const matchesType = typeFilter === 'all' || coupon.type === typeFilter;
            const matchesFeatured =
                featuredFilter === 'all' ||
                (featuredFilter === 'featured' ? coupon.featured : !coupon.featured);
            return matchesSearch && matchesStatus && matchesType && matchesFeatured;
        });
    }, [coupons, featuredFilter, search, statusFilter, typeFilter]);

    const totalPages = Math.max(1, Math.ceil(filteredCoupons.length / pageSize));
    const visibleCoupons = filteredCoupons.slice((page - 1) * pageSize, page * pageSize);

    const handleSave = (payload: CouponRecord) => {
        setCoupons(current => {
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
        setToast(payload.id ? 'Coupon updated successfully.' : 'Coupon created successfully.');
    };

    const handleDelete = () => {
        if (!deleteTarget) return;
        setCoupons(current => current.filter(item => item.id !== deleteTarget.id));
        setDeleteTarget(null);
        setToast('Coupon deleted successfully.');
    };

    const toggleStatus = (id: string) => {
        setCoupons(current =>
            current.map(coupon =>
                coupon.id === id
                    ? { ...coupon, status: coupon.status === 'active' ? 'inactive' : 'active' }
                    : coupon,
            ),
        );
        setToast('Coupon status updated.');
    };

    return (
        <>
            <AdminPageHeader
                title="Coupons"
                subtitle="Manage offers, promo codes and deal visibility."
                breadcrumb={['Dashboard', 'Coupons']}
                action={
                    <Button
                        onClick={() => {
                            setEditing(null);
                            setModalOpen(true);
                        }}
                    >
                        <Plus className="mr-2 h-4 w-4" /> Add Coupon
                    </Button>
                }
            />

            <div className="rounded-3xl border border-border bg-card p-4 shadow-soft">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <SearchInput
                        value={search}
                        onChange={setSearch}
                        placeholder="Search coupons by title, code or store"
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
                                { value: 'expired', label: 'Expired' },
                            ]}
                        />
                        <FilterSelect
                            value={typeFilter}
                            onChange={setTypeFilter}
                            placeholder="Type"
                            options={[
                                { value: 'all', label: 'All types' },
                                { value: 'Code', label: 'Code' },
                                { value: 'Deal', label: 'Deal' },
                            ]}
                        />
                        <FilterSelect
                            value={featuredFilter}
                            onChange={setFeaturedFilter}
                            placeholder="Featured"
                            options={[
                                { value: 'all', label: 'All items' },
                                { value: 'featured', label: 'Featured' },
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
                                    <th className="px-4 py-3">Title</th>
                                    <th className="px-4 py-3">Store</th>
                                    <th className="px-4 py-3">Code</th>
                                    <th className="px-4 py-3">Type</th>
                                    <th className="px-4 py-3">Discount</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3">Featured</th>
                                    <th className="px-4 py-3">Verified</th>
                                    <th className="px-4 py-3">Expires</th>
                                    <th className="px-4 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {visibleCoupons.map(coupon => (
                                    <tr
                                        key={coupon.id}
                                        className="border-t border-border text-[14px] text-foreground"
                                    >
                                        <td className="px-4 py-3">
                                            <div className="font-semibold">{coupon.title}</div>
                                            <div className="text-[12px] text-muted-foreground">
                                                {coupon.shortDescription}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">{coupon.store}</td>
                                        <td className="px-4 py-3">
                                            <code className="rounded bg-slate-100 px-2 py-1 font-mono text-[12px] font-bold text-slate-700">
                                                {coupon.code}
                                            </code>
                                        </td>
                                        <td className="px-4 py-3">{coupon.type}</td>
                                        <td className="px-4 py-3">
                                            <span className="font-semibold text-primary">
                                                {coupon.discountValue}{' '}
                                                {coupon.discountType === 'Percent'
                                                    ? 'off'
                                                    : coupon.discountType}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <StatusBadge status={coupon.status} />
                                        </td>
                                        <td className="px-4 py-3">
                                            <StatusBadge
                                                status={coupon.featured ? 'featured' : 'inactive'}
                                            />
                                        </td>
                                        <td className="px-4 py-3">
                                            <StatusBadge
                                                status={coupon.verified ? 'active' : 'inactive'}
                                            />
                                        </td>
                                        <td className="px-4 py-3 text-[13px] text-muted-foreground">
                                            {coupon.expirationDate}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => toggleStatus(coupon.id)}
                                                    title="Toggle status"
                                                >
                                                    {coupon.status === 'active' ? (
                                                        <Eye className="h-4 w-4" />
                                                    ) : (
                                                        <EyeOff className="h-4 w-4" />
                                                    )}
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => {
                                                        setEditing(coupon);
                                                        setModalOpen(true);
                                                    }}
                                                    title="Edit"
                                                >
                                                    <Edit3 className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => setDeleteTarget(coupon)}
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
                    Showing {visibleCoupons.length} of {filteredCoupons.length} coupons
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
                <CouponModal
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
                title="Delete coupon"
                description={
                    deleteTarget
                        ? `This will permanently remove the coupon "${deleteTarget.title}".`
                        : 'Delete this coupon?'
                }
                onClose={() => setDeleteTarget(null)}
                onConfirm={handleDelete}
            />
            <Toast message={toast} visible={!!toast} onClose={() => setToast('')} />
        </>
    );
}
