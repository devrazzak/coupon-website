import { API_END_POINTS } from '@/api/APIEndpoint';
import AxiosServices from '@/api/AxiosService';

export type CouponCreatePayload = {
    store_id: number;
    category_id?: number | null;
    title: string;
    slug: string;
    code?: string | null;
    coupon_type?: string;
    discount_type?: string;
    discount_value?: number;
    currency?: string;
    short_description?: string;
    terms_conditions?: string;
    minimum_order_amount?: number;
    affiliate_url?: string;
    start_at?: string;
    expires_at?: string;
    is_featured?: boolean;
    is_verified?: boolean;
    status?: string;
    seo_title?: string;
    meta_description?: string;
};

export type CouponUpdatePayload = Partial<CouponCreatePayload>;

export type PublicStoreRef = {
    id: number;
    name: string;
    slug: string;
};

export type PublicCategoryRef = {
    id: number;
    name: string;
    slug: string;
};

export type PublicCoupon = {
    id: number;
    title: string;
    slug: string;
    code?: string | null;
    affiliate_url?: string;
    coupon_type?: string;
    discount_type?: string;
    discount_value?: number;
    currency?: string;
    short_description?: string;
    expires_at?: string;
    store?: PublicStoreRef;
    category?: PublicCategoryRef;
};

export type PublicCouponsResponse = {
    success: boolean;
    message: string;
    data: PublicCoupon[];
    meta: {
        currentPage: number;
        totalCount: number;
    };
};

export type PublicCouponDetailResponse = {
    success: boolean;
    message: string;
    data: PublicCoupon;
    meta: null;
};

export type PublicCouponsQuery = {
    search?: string;
    category_slug?: string;
    store_slug?: string;
    page?: number;
    limit?: number;
    sort?: string;
};

export const getPublicCoupons = ({
    search,
    category_slug,
    store_slug,
    page = 1,
    limit = 20,
    sort,
}: PublicCouponsQuery = {}) => {
    return AxiosServices.get<PublicCouponsResponse>(
        API_END_POINTS.PUBLIC.COUPON.GET(search, category_slug, store_slug, page, limit, sort),
        {},
    );
};

export const getPublicCouponBySlug = (slug: string) => {
    return AxiosServices.get<PublicCouponDetailResponse>(
        API_END_POINTS.PUBLIC.COUPON.GET_BY_SLUG(slug),
        {},
    );
};

export type AdminCouponQuery = {
    search?: string;
    status?: string;
    coupon_type?: string;
    is_featured?: boolean;
    is_verified?: boolean;
    is_active?: boolean;
};
export const getCoupons = (page: number, limit: number, query: AdminCouponQuery = {}) => {
    const params: Record<string, string | number | boolean | undefined> = {};
    if (query.search) params.search = query.search;
    if (query.status) params.status = query.status;
    if (query.coupon_type) params.coupon_type = query.coupon_type;
    if (query.is_featured !== undefined) params.is_featured = query.is_featured;
    if (query.is_verified !== undefined) params.is_verified = query.is_verified;
    if (query.is_active !== undefined) params.is_active = query.is_active;
    return AxiosServices.get(API_END_POINTS.DASHBOARD.COUPON.GET(page, limit, params), {});
};

export const createCoupon = (data: CouponCreatePayload) => {
    return AxiosServices.post(API_END_POINTS.DASHBOARD.COUPON.POST, data);
};

export const updateCoupon = (id: string | number, data: CouponUpdatePayload) => {
    return AxiosServices.put(API_END_POINTS.DASHBOARD.COUPON.PUT(String(id)), data);
};

export const deleteCoupon = (id: string | number) => {
    return AxiosServices.remove(API_END_POINTS.DASHBOARD.COUPON.DELETE(String(id)));
};
