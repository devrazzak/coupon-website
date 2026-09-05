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
    categoryIds?: number[];
    storeId?: number;
    page?: number;
    limit?: number;
    sort?: string;
};

export const getPublicCoupons = ({
    search,
    categoryIds,
    storeId,
    page = 1,
    limit = 20,
    sort,
}: PublicCouponsQuery = {}) => {
    return AxiosServices.get<PublicCouponsResponse>(
        API_END_POINTS.PUBLIC.COUPON.GET(search, categoryIds, storeId, page, limit, sort),
        {},
    );
};

export const getPublicCouponBySlug = (slug: string) => {
    return AxiosServices.get<PublicCouponDetailResponse>(
        API_END_POINTS.PUBLIC.COUPON.GET_BY_SLUG(slug),
        {},
    );
};

export const getCoupons = (page: number, limit: number) => {
    return AxiosServices.get(API_END_POINTS.DASHBOARD.COUPON.GET(page, limit), {});
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
