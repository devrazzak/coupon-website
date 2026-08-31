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
