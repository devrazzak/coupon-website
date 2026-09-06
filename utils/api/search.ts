import { API_END_POINTS } from '@/api/APIEndpoint';
import AxiosServices from '@/api/AxiosService';

export type SearchStore = {
    id: number;
    name: string;
    slug: string;
    image?: string | null;
};

export type SearchCategory = {
    id: number;
    name: string;
    slug: string;
    image?: string | null;
};

export type SearchCoupon = {
    id: number;
    name?: string;
    title?: string;
    slug: string;
    code?: string | null;
    discount_type?: string;
    discount_value?: number;
    currency?: string;
    affiliate_url?: string;
    store_id?: number | null;
    store_name?: string | null;
    store_slug?: string | null;
    store_image?: string | null;
    category_id?: number | null;
    expires_at?: string;
};

export type SearchResults = {
    stores: SearchStore[];
    categories: SearchCategory[];
    coupons: SearchCoupon[];
};

export type SearchResponse = {
    success: boolean;
    message: string;
    data: SearchResults;
    meta: {
        query: string;
        limit: number;
    };
};

export type SearchQuery = {
    q: string;
};

export const getSearchResults = ({ q }: SearchQuery) => {
    return AxiosServices.get<SearchResponse>(API_END_POINTS.PUBLIC.SEARCH.GET(q), {});
};
