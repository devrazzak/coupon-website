import { API_END_POINTS } from '@/api/APIEndpoint';
import AxiosServices from '@/api/AxiosService';

export type StoreCreatePayload = {
    name: string;
    slug: string;
    logo?: string;
    logo_alt_txt?: string;
    categories?: number[];
    website_url?: string;
    affiliate_url?: string;
    short_description?: string;
    description?: string;
    how_to_use?: string;
    is_featured?: boolean;
    is_active?: boolean;
    sort_order?: number;
    seo_title?: string;
    meta_description?: string;
};

export type StoreUpdatePayload = Partial<StoreCreatePayload>;

export const getStores = (page: number, limit: number) => {
    return AxiosServices.get(API_END_POINTS.DASHBOARD.STORE.GET(page, limit), {});
};

export const createStore = (data: StoreCreatePayload) => {
    return AxiosServices.post(API_END_POINTS.DASHBOARD.STORE.POST, data);
};

export const updateStore = (id: string | number, data: StoreUpdatePayload) => {
    return AxiosServices.put(API_END_POINTS.DASHBOARD.STORE.PUT(String(id)), data);
};

export const deleteStore = (id: string | number) => {
    return AxiosServices.remove(API_END_POINTS.DASHBOARD.STORE.DELETE(String(id)));
};
