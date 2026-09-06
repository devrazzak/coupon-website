'use client';

import { Edit3, Eye, EyeOff, Plus, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';

import {
    AdminModalShell,
    AdminPageHeader,
    ConfirmDeleteModal,
    FIELD_CONTROL_CLS,
    FIELD_TEXTAREA_CLS,
    FieldLabel,
    FilterSelect,
    SearchInput,
    StatusBadge,
    TableWrapper,
    Toast,
} from '@/components/admin/admin-shared';
import { Button } from '@/components/ui/button';
import { type CouponCreatePayload } from '@/utils/api/coupon';
import { useGetCategories } from '@/utils/hooks/category';
import {
    useCreateCoupon,
    useDeleteCoupon,
    useGetCoupons,
    useUpdateCoupon,
} from '@/utils/hooks/coupon';
import { useGetStores } from '@/utils/hooks/store';

export interface CouponApiItem {
    id: number;
    store_id: number;
    store?:
        | {
              id: number;
              name: string;
              slug?: string;
              logo?: string;
          }
        | string
        | null;
    category_id: number | null;
    category?:
        | {
              id: number;
              name: string;
              slug?: string;
          }
        | string
        | null;
    title: string;
    slug: string;
    code: string | null;
    coupon_type: string;
    discount_type: string;
    discount_value: number | string;
    currency: string | null;
    short_description: string | null;
    terms_conditions: string | null;
    minimum_order_amount: number | string | null;
    affiliate_url: string | null;
    start_at: string | null;
    expires_at: string | null;
    is_featured: boolean;
    is_verified: boolean;
    status: string;
    seo_title: string | null;
    meta_description: string | null;
    created_at: string;
    updated_at: string;
}

export interface CouponsResponse {
    success: boolean;
    message: string;
    data: CouponApiItem[];
    meta: {
        currentPage: number;
        totalCount: number;
    };
}

function getCouponsResponse(response: unknown): CouponsResponse | null {
    if (!response || typeof response !== 'object') return null;

    const payload = (response as { data?: unknown }).data;
    if (
        payload &&
        typeof payload === 'object' &&
        Array.isArray((payload as CouponsResponse).data)
    ) {
        return payload as CouponsResponse;
    }

    return null;
}

function getStoresList(response: unknown): { id: number; name: string }[] {
    if (!response || typeof response !== 'object') return [];
    const payload = (response as { data?: unknown }).data;
    const list = Array.isArray(payload)
        ? payload
        : payload &&
            typeof payload === 'object' &&
            Array.isArray((payload as { data?: unknown }).data)
          ? ((payload as { data?: unknown[] }).data ?? [])
          : [];

    return list.map((item: any) => ({
        id: Number(item.id),
        name: String(item.name || `Store #${item.id}`),
    }));
}

function getCategoriesList(response: unknown): { id: number; name: string }[] {
    if (!response || typeof response !== 'object') return [];
    const payload = (response as { data?: unknown }).data;
    const list = Array.isArray(payload)
        ? payload
        : payload &&
            typeof payload === 'object' &&
            Array.isArray((payload as { data?: unknown }).data)
          ? ((payload as { data?: unknown[] }).data ?? [])
          : [];

    return list.map((item: any) => ({
        id: Number(item.id),
        name: String(item.name || `Category #${item.id}`),
    }));
}

const pageSize = 10;

function slugify(value: string) {
    return (
        value
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '') || ''
    );
}

export type CouponUiRecord = {
    id: string;
    storeId: number;
    storeName: string;
    categoryId: number | null;
    categoryName: string;
    title: string;
    slug: string;
    code: string;
    couponType: string;
    discountType: string;
    discountValue: number | string;
    currency: string;
    shortDescription: string;
    termsConditions: string;
    minimumOrderAmount: number | string;
    affiliateUrl: string;
    startAt: string;
    expiresAt: string;
    isFeatured: boolean;
    isVerified: boolean;
    status: string;
    seoTitle: string;
    metaDescription: string;
    createdAt: string;
};

type CouponFormState = {
    id: string | number;
    storeId: number | string;
    categoryId: number | string;
    title: string;
    slug: string;
    code: string;
    couponType: string;
    discountType: string;
    discountValue: number | string;
    currency: string;
    shortDescription: string;
    termsConditions: string;
    minimumOrderAmount: number | string;
    affiliateUrl: string;
    startAt: string;
    expiresAt: string;
    isFeatured: boolean;
    isVerified: boolean;
    status: string;
    seoTitle: string;
    metaDescription: string;
};

function getDefaultCouponForm(): CouponFormState {
    const today = new Date();
    const thirtyDaysOut = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
    return {
        id: '',
        storeId: '',
        categoryId: '',
        title: '',
        slug: '',
        code: '',
        couponType: 'coupon',
        discountType: 'percentage',
        discountValue: 20,
        currency: 'BDT',
        shortDescription: '',
        termsConditions: '',
        minimumOrderAmount: 0,
        affiliateUrl: '',
        startAt: today.toISOString().slice(0, 10),
        expiresAt: thirtyDaysOut.toISOString().slice(0, 10),
        isFeatured: false,
        isVerified: true,
        status: 'active',
        seoTitle: '',
        metaDescription: '',
    };
}

function CouponModal({
    initialData,
    stores,
    categories,
    onClose,
    onSave,
}: {
    initialData: CouponUiRecord | null;
    stores: { id: number; name: string }[];
    categories: { id: number; name: string }[];
    onClose: () => void;
    onSave: (payload: CouponFormState) => void;
}) {
    const [form, setForm] = useState<CouponFormState>(
        initialData
            ? {
                  id: initialData.id,
                  storeId: initialData.storeId,
                  categoryId: initialData.categoryId ?? '',
                  title: initialData.title,
                  slug: initialData.slug,
                  code: initialData.code,
                  couponType: initialData.couponType,
                  discountType: initialData.discountType,
                  discountValue: initialData.discountValue,
                  currency: initialData.currency,
                  shortDescription: initialData.shortDescription,
                  termsConditions: initialData.termsConditions,
                  minimumOrderAmount: initialData.minimumOrderAmount,
                  affiliateUrl: initialData.affiliateUrl,
                  startAt: initialData.startAt
                      ? initialData.startAt.slice(0, 10)
                      : new Date().toISOString().slice(0, 10),
                  expiresAt: initialData.expiresAt
                      ? initialData.expiresAt.slice(0, 10)
                      : new Date().toISOString().slice(0, 10),
                  isFeatured: initialData.isFeatured,
                  isVerified: initialData.isVerified,
                  status: initialData.status,
                  seoTitle: initialData.seoTitle,
                  metaDescription: initialData.metaDescription,
              }
            : getDefaultCouponForm(),
    );
    const [error, setError] = useState('');
    const [slugTouched, setSlugTouched] = useState(false);

    const updateField = <K extends keyof CouponFormState>(key: K, value: CouponFormState[K]) => {
        setForm(current => ({ ...current, [key]: value }));
    };

    const handleTitleChange = (value: string) => {
        setForm(current => ({
            ...current,
            title: value,
            // Auto-generate the slug from the title while typing, unless the
            // user has manually edited the slug field.
            ...(!slugTouched ? { slug: slugify(value) } : {}),
            seoTitle: current.seoTitle || value,
        }));
    };

    const handleSubmit = () => {
        if (!form.title.trim()) {
            setError('Coupon title is required.');
            return;
        }
        if (!form.storeId) {
            setError('Please select a store.');
            return;
        }
        if (form.couponType === 'coupon' && !form.code.trim()) {
            setError('Coupon code is required for coupon type.');
            return;
        }

        onSave({
            ...form,
            title: form.title.trim(),
            slug: form.slug.trim() || slugify(form.title),
            code: form.code.trim().toUpperCase(),
            seoTitle: form.seoTitle || form.title.trim(),
            metaDescription: form.metaDescription || form.shortDescription,
        });
    };

    // Always include the edited coupon's existing store in the dropdown options,
    // even if it isn't part of the (paginated/limited) `stores` list. Otherwise a
    // controlled <select> with a `value` that has no matching <option> shows blank.
    const storeOptions = useMemo(() => {
        const exists = stores.some(s => s.id === initialData?.storeId);
        if (!initialData || exists) return stores;
        if (!initialData.storeId) return stores;
        return [
            {
                id: initialData.storeId as number,
                name: initialData.storeName || `Store #${initialData.storeId}`,
            },
            ...stores,
        ];
    }, [initialData, stores]);

    // Same guarantee for the coupon's existing category so it always shows in the
    // Category dropdown when editing, even if it's not in the fetched list.
    const categoryOptions = useMemo(() => {
        const exists = categories.some(c => c.id === initialData?.categoryId);
        if (!initialData || exists) return categories;
        if (!initialData.categoryId) return categories;
        return [
            {
                id: initialData.categoryId,
                name: initialData.categoryName || `Category #${initialData.categoryId}`,
            },
            ...categories,
        ];
    }, [categories, initialData]);

    return (
        <AdminModalShell
            eyebrow="Coupon"
            title={initialData ? 'Edit Coupon' : 'Create Coupon'}
            subtitle={
                initialData
                    ? 'Update the details for this coupon or deal.'
                    : 'Add a new coupon or deal to your catalog.'
            }
            onClose={onClose}
            actions={
                <>
                    <Button type="button" variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="button" onClick={handleSubmit}>
                        {initialData ? 'Save Changes' : 'Create Coupon'}
                    </Button>
                </>
            }
        >
            {error && (
                <div className="mb-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-[13px] font-medium text-rose-700">
                    {error}
                </div>
            )}

            <div className="grid gap-5 md:grid-cols-3">
                <div className="md:col-span-2">
                    <FieldLabel required>Coupon Title</FieldLabel>
                    <input
                        value={form.title}
                        onChange={event => handleTitleChange(event.target.value)}
                        placeholder="e.g. 20% off Summer sale"
                        className={`${FIELD_CONTROL_CLS} mt-2`}
                    />
                </div>

                <div className="md:col-span-1">
                    <FieldLabel>Slug</FieldLabel>
                    <input
                        value={form.slug}
                        onChange={event => {
                            setSlugTouched(true);
                            updateField('slug', event.target.value);
                        }}
                        placeholder="e.g. 20-off-summer-sale"
                        className={`${FIELD_CONTROL_CLS} mt-2`}
                    />
                </div>

                <div className="md:col-span-1">
                    <FieldLabel required>Store</FieldLabel>
                    <select
                        value={
                            form.storeId === '' || form.storeId == null ? '' : String(form.storeId)
                        }
                        onChange={event =>
                            updateField(
                                'storeId',
                                event.target.value ? Number(event.target.value) : '',
                            )
                        }
                        className={`${FIELD_CONTROL_CLS} mt-2`}
                    >
                        <option value="">Select a store</option>
                        {storeOptions.map(store => (
                            <option key={store.id} value={String(store.id)}>
                                {store.name} (ID: {store.id})
                            </option>
                        ))}
                    </select>
                </div>

                <div className="md:col-span-1">
                    <FieldLabel>Category</FieldLabel>
                    <select
                        value={
                            form.categoryId === '' || form.categoryId == null
                                ? ''
                                : String(form.categoryId)
                        }
                        onChange={event =>
                            updateField(
                                'categoryId',
                                event.target.value ? Number(event.target.value) : '',
                            )
                        }
                        className={`${FIELD_CONTROL_CLS} mt-2`}
                    >
                        <option value="">Select a category</option>
                        {categoryOptions.map(category => (
                            <option key={category.id} value={String(category.id)}>
                                {category.name} (ID: {category.id})
                            </option>
                        ))}
                    </select>
                </div>

                <div className="md:col-span-1">
                    <FieldLabel required>Coupon Type</FieldLabel>
                    <select
                        value={form.couponType}
                        onChange={event => updateField('couponType', event.target.value)}
                        className={`${FIELD_CONTROL_CLS} mt-2`}
                    >
                        <option value="coupon">Coupon (Promo Code)</option>
                        <option value="deal">Deal (No Code)</option>
                    </select>
                </div>

                <div className="md:col-span-1">
                    <FieldLabel>Coupon Code</FieldLabel>
                    <input
                        value={form.code}
                        onChange={event => updateField('code', event.target.value)}
                        placeholder="e.g. SAVE20"
                        className={`${FIELD_CONTROL_CLS} mt-2 font-mono uppercase`}
                    />
                </div>

                <div className="md:col-span-1">
                    <FieldLabel>Discount Type</FieldLabel>
                    <select
                        value={form.discountType}
                        onChange={event => updateField('discountType', event.target.value)}
                        className={`${FIELD_CONTROL_CLS} mt-2`}
                    >
                        <option value="percentage">Percentage (%)</option>
                        <option value="fixed">Fixed Amount</option>
                        <option value="cashback">Cashback</option>
                    </select>
                </div>

                <div className="md:col-span-1">
                    <FieldLabel required>Discount Value</FieldLabel>
                    <input
                        type="number"
                        value={form.discountValue}
                        onChange={event =>
                            updateField('discountValue', Number(event.target.value) || 0)
                        }
                        placeholder="e.g. 20"
                        className={`${FIELD_CONTROL_CLS} mt-2`}
                    />
                </div>

                <div className="md:col-span-1">
                    <FieldLabel>Currency</FieldLabel>
                    <input
                        value={form.currency}
                        onChange={event => updateField('currency', event.target.value)}
                        placeholder="e.g. BDT"
                        className={`${FIELD_CONTROL_CLS} mt-2`}
                    />
                </div>

                <div className="md:col-span-1">
                    <FieldLabel>Minimum Order Amount</FieldLabel>
                    <input
                        type="number"
                        value={form.minimumOrderAmount}
                        onChange={event =>
                            updateField('minimumOrderAmount', Number(event.target.value) || 0)
                        }
                        placeholder="e.g. 1000"
                        className={`${FIELD_CONTROL_CLS} mt-2`}
                    />
                </div>

                <div className="md:col-span-1">
                    <FieldLabel>Status</FieldLabel>
                    <select
                        value={form.status}
                        onChange={event => updateField('status', event.target.value)}
                        className={`${FIELD_CONTROL_CLS} mt-2`}
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="expired">Expired</option>
                        <option value="draft">Draft</option>
                    </select>
                </div>

                <div className="md:col-span-3">
                    <FieldLabel>Affiliate URL</FieldLabel>
                    <input
                        value={form.affiliateUrl}
                        onChange={event => updateField('affiliateUrl', event.target.value)}
                        placeholder="https://..."
                        className={`${FIELD_CONTROL_CLS} mt-2`}
                    />
                </div>

                <div className="md:col-span-3">
                    <FieldLabel>Short Description</FieldLabel>
                    <textarea
                        value={form.shortDescription}
                        onChange={event => updateField('shortDescription', event.target.value)}
                        placeholder="e.g. Get extra savings"
                        className={`${FIELD_TEXTAREA_CLS} mt-2 resize-none`}
                    />
                </div>

                <div className="md:col-span-3">
                    <FieldLabel>Terms & Conditions</FieldLabel>
                    <textarea
                        value={form.termsConditions}
                        onChange={event => updateField('termsConditions', event.target.value)}
                        placeholder="e.g. Valid on selected products"
                        className={`${FIELD_TEXTAREA_CLS} mt-2 resize-none`}
                    />
                </div>

                <div className="md:col-span-1">
                    <FieldLabel>Start Date</FieldLabel>
                    <input
                        type="date"
                        value={form.startAt}
                        onChange={event => updateField('startAt', event.target.value)}
                        className={`${FIELD_CONTROL_CLS} mt-2`}
                    />
                </div>

                <div className="md:col-span-1">
                    <FieldLabel>Expiration Date</FieldLabel>
                    <input
                        type="date"
                        value={form.expiresAt}
                        onChange={event => updateField('expiresAt', event.target.value)}
                        className={`${FIELD_CONTROL_CLS} mt-2`}
                    />
                </div>

                <div className="flex items-end gap-4 md:col-span-1">
                    <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-border bg-surface/60 px-3 py-2.5 text-[13px] font-semibold text-foreground">
                        <input
                            type="checkbox"
                            checked={form.isFeatured}
                            onChange={event => updateField('isFeatured', event.target.checked)}
                            className="h-4 w-4 rounded border-border text-primary focus:ring-primary/20"
                        />
                        Featured
                    </label>
                    <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-border bg-surface/60 px-3 py-2.5 text-[13px] font-semibold text-foreground">
                        <input
                            type="checkbox"
                            checked={form.isVerified}
                            onChange={event => updateField('isVerified', event.target.checked)}
                            className="h-4 w-4 rounded border-border text-primary focus:ring-primary/20"
                        />
                        Verified
                    </label>
                </div>

                <div className="md:col-span-3">
                    <FieldLabel>SEO Title</FieldLabel>
                    <input
                        value={form.seoTitle}
                        onChange={event => updateField('seoTitle', event.target.value)}
                        placeholder="e.g. 20% off Summer sale"
                        className={`${FIELD_CONTROL_CLS} mt-2`}
                    />
                </div>

                <div className="md:col-span-3">
                    <FieldLabel>Meta Description</FieldLabel>
                    <textarea
                        value={form.metaDescription}
                        onChange={event => updateField('metaDescription', event.target.value)}
                        placeholder="e.g. Summer offer"
                        className={`${FIELD_TEXTAREA_CLS} mt-2 resize-none`}
                    />
                </div>
            </div>
        </AdminModalShell>
    );
}

export default function CouponsAdminPage() {
    const [couponOverrides, setCouponOverrides] = useState<Record<string, CouponUiRecord | null>>(
        {},
    );
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all');
    const [featuredFilter, setFeaturedFilter] = useState('all');
    const [verifiedFilter, setVerifiedFilter] = useState('all');
    const [page, setPage] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<CouponUiRecord | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<CouponUiRecord | null>(null);
    const [toast, setToast] = useState('');

    const { data: apiData } = useGetCoupons(page, pageSize);
    const { data: storesApiData } = useGetStores(1, 100);
    const { data: categoriesApiData } = useGetCategories(1, 100);

    const { mutateAsync: createCouponMutation } = useCreateCoupon();
    const { mutateAsync: updateCouponMutation } = useUpdateCoupon();
    const { mutateAsync: deleteCouponMutation } = useDeleteCoupon();

    const couponsResponse = useMemo(() => getCouponsResponse(apiData), [apiData]);
    const stores = useMemo(() => getStoresList(storesApiData), [storesApiData]);
    const categories = useMemo(() => getCategoriesList(categoriesApiData), [categoriesApiData]);

    const coupons = useMemo(() => {
        const items: CouponUiRecord[] =
            couponsResponse?.data.map(item => {
                const nestedStore =
                    typeof item.store === 'object' && item.store !== null ? item.store : null;
                const nestedCategory =
                    typeof item.category === 'object' && item.category !== null
                        ? item.category
                        : null;

                // Prefer the flat `store_id`/`category_id`, but fall back to the
                // nested relation id — some list responses only embed the full
                // store/category object and omit the flat foreign key, which would
                // otherwise leave the Edit modal's select blank.
                const storeIdRaw = item.store_id ?? nestedStore?.id;
                const categoryIdRaw = item.category_id ?? nestedCategory?.id ?? null;

                const storeName = nestedStore
                    ? nestedStore.name
                    : typeof item.store === 'string'
                      ? item.store
                      : stores.find(s => s.id === storeIdRaw)?.name || `Store #${storeIdRaw}`;

                const categoryName = nestedCategory
                    ? nestedCategory.name
                    : typeof item.category === 'string'
                      ? item.category
                      : categoryIdRaw
                        ? categories.find(c => c.id === categoryIdRaw)?.name ||
                          `Category #${categoryIdRaw}`
                        : '';

                return {
                    id: String(item.id),
                    storeId: storeIdRaw ?? 0,
                    storeName,
                    categoryId: categoryIdRaw,
                    categoryName,
                    title: item.title,
                    slug: item.slug,
                    code: item.code ?? '',
                    couponType: item.coupon_type || 'coupon',
                    discountType: item.discount_type || 'percentage',
                    discountValue: item.discount_value ?? 0,
                    currency: item.currency ?? 'BDT',
                    shortDescription: item.short_description ?? '',
                    termsConditions: item.terms_conditions ?? '',
                    minimumOrderAmount: item.minimum_order_amount ?? 0,
                    affiliateUrl: item.affiliate_url ?? '',
                    startAt: item.start_at ?? '',
                    expiresAt: item.expires_at ?? '',
                    isFeatured: Boolean(item.is_featured),
                    isVerified: Boolean(item.is_verified),
                    status: item.status || 'active',
                    seoTitle: item.seo_title ?? '',
                    metaDescription: item.meta_description ?? '',
                    createdAt: item.created_at ?? '',
                };
            }) ?? [];

        return items.flatMap(coupon => {
            const override = couponOverrides[coupon.id];
            return override === null ? [] : [override ?? coupon];
        });
    }, [categories, couponOverrides, couponsResponse, stores]);

    const filteredCoupons = useMemo(() => {
        return coupons.filter(coupon => {
            const matchesSearch =
                coupon.title.toLowerCase().includes(search.toLowerCase()) ||
                coupon.code.toLowerCase().includes(search.toLowerCase()) ||
                coupon.storeName.toLowerCase().includes(search.toLowerCase()) ||
                coupon.slug.toLowerCase().includes(search.toLowerCase());
            const matchesStatus = statusFilter === 'all' || coupon.status === statusFilter;
            const matchesType = typeFilter === 'all' || coupon.couponType === typeFilter;
            const matchesFeatured =
                featuredFilter === 'all' ||
                (featuredFilter === 'featured' ? coupon.isFeatured : !coupon.isFeatured);
            const matchesVerified =
                verifiedFilter === 'all' ||
                (verifiedFilter === 'verified' ? coupon.isVerified : !coupon.isVerified);
            return (
                matchesSearch && matchesStatus && matchesType && matchesFeatured && matchesVerified
            );
        });
    }, [coupons, featuredFilter, search, statusFilter, typeFilter, verifiedFilter]);

    const totalPages = Math.max(1, Math.ceil(filteredCoupons.length / pageSize));
    const visibleCoupons = filteredCoupons.slice((page - 1) * pageSize, page * pageSize);

    const handleSave = async (form: CouponFormState) => {
        try {
            const createPayload: CouponCreatePayload = {
                store_id: Number(form.storeId),
                category_id: form.categoryId ? Number(form.categoryId) : null,
                title: form.title.trim(),
                slug: form.slug.trim() || slugify(form.title),
                code: form.code.trim() ? form.code.trim().toUpperCase() : null,
                coupon_type: form.couponType || 'coupon',
                discount_type: form.discountType || 'percentage',
                discount_value: Number(form.discountValue) || 0,
                currency: form.currency || 'BDT',
                short_description: form.shortDescription,
                terms_conditions: form.termsConditions,
                minimum_order_amount: Number(form.minimumOrderAmount) || 0,
                affiliate_url: form.affiliateUrl,
                start_at: form.startAt,
                expires_at: form.expiresAt,
                is_featured: form.isFeatured,
                is_verified: form.isVerified,
                status: form.status,
                seo_title: form.seoTitle || form.title.trim(),
                meta_description: form.metaDescription || form.shortDescription,
            };

            const storeName =
                stores.find(s => s.id === Number(form.storeId))?.name || `Store #${form.storeId}`;
            const categoryName = form.categoryId
                ? categories.find(c => c.id === Number(form.categoryId))?.name ||
                  `Category #${form.categoryId}`
                : '';

            if (editing?.id) {
                await updateCouponMutation({
                    id: editing.id,
                    values: createPayload,
                });
                const updatedRecord: CouponUiRecord = {
                    id: String(editing.id),
                    storeId: Number(form.storeId),
                    storeName,
                    categoryId: form.categoryId ? Number(form.categoryId) : null,
                    categoryName,
                    title: form.title.trim(),
                    slug: form.slug.trim() || slugify(form.title),
                    code: form.code.trim() ? form.code.trim().toUpperCase() : '',
                    couponType: form.couponType,
                    discountType: form.discountType,
                    discountValue: Number(form.discountValue) || 0,
                    currency: form.currency || 'BDT',
                    shortDescription: form.shortDescription,
                    termsConditions: form.termsConditions,
                    minimumOrderAmount: Number(form.minimumOrderAmount) || 0,
                    affiliateUrl: form.affiliateUrl,
                    startAt: form.startAt,
                    expiresAt: form.expiresAt,
                    isFeatured: form.isFeatured,
                    isVerified: form.isVerified,
                    status: form.status,
                    seoTitle: form.seoTitle,
                    metaDescription: form.metaDescription,
                    createdAt: editing.createdAt ?? new Date().toISOString().slice(0, 10),
                };
                setCouponOverrides(current => ({
                    ...current,
                    [String(editing.id)]: updatedRecord,
                }));
                setToast('Coupon updated successfully.');
            } else {
                await createCouponMutation(createPayload);
                setToast('Coupon created successfully.');
            }

            setModalOpen(false);
            setEditing(null);
        } catch (error) {
            setToast('Failed to save coupon.');
            console.error('Save error:', error);
        }
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;

        try {
            await deleteCouponMutation(deleteTarget.id);
            setCouponOverrides(current => ({ ...current, [deleteTarget.id]: null }));
            setDeleteTarget(null);
            setToast('Coupon deleted successfully.');
        } catch (error) {
            setToast('Failed to delete coupon.');
            console.error('Delete error:', error);
        }
    };

    const toggleStatus = async (id: string) => {
        const coupon = coupons.find(item => item.id === id);
        if (!coupon) return;

        const nextStatus = coupon.status === 'active' ? 'inactive' : 'active';
        try {
            await updateCouponMutation({
                id,
                values: { status: nextStatus },
            });
            setCouponOverrides(current => ({
                ...current,
                [id]: { ...coupon, status: nextStatus },
            }));
            setToast('Coupon status updated.');
        } catch (error) {
            setToast('Failed to update status.');
            console.error('Status toggle error:', error);
        }
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
                                { value: 'draft', label: 'Draft' },
                            ]}
                        />
                        <FilterSelect
                            value={typeFilter}
                            onChange={setTypeFilter}
                            placeholder="Type"
                            options={[
                                { value: 'all', label: 'All types' },
                                { value: 'coupon', label: 'Coupon' },
                                { value: 'deal', label: 'Deal' },
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
                                                {coupon.shortDescription || 'N/A'}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 font-medium">
                                            {coupon.storeName}
                                        </td>
                                        <td className="px-4 py-3">
                                            {coupon.code ? (
                                                <code className="rounded bg-slate-100 px-2 py-1 font-mono text-[12px] font-bold text-slate-700">
                                                    {coupon.code}
                                                </code>
                                            ) : (
                                                <span className="text-[12px] text-muted-foreground italic">
                                                    Deal (No Code)
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 capitalize">
                                            {coupon.couponType}
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="font-semibold text-primary">
                                                {coupon.discountValue}{' '}
                                                {coupon.discountType === 'percentage' ||
                                                coupon.discountType === 'Percent'
                                                    ? '%'
                                                    : coupon.currency || coupon.discountType}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <StatusBadge status={coupon.status} />
                                        </td>
                                        <td className="px-4 py-3">
                                            <StatusBadge
                                                status={coupon.isFeatured ? 'featured' : 'inactive'}
                                            />
                                        </td>
                                        <td className="px-4 py-3">
                                            <StatusBadge
                                                status={coupon.isVerified ? 'active' : 'inactive'}
                                            />
                                        </td>
                                        <td className="px-4 py-3 text-[13px] text-muted-foreground">
                                            {coupon.expiresAt
                                                ? coupon.expiresAt.slice(0, 10)
                                                : 'N/A'}
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
                    stores={stores}
                    categories={categories}
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
