import { API_END_POINTS } from '@/api/APIEndpoint';
import AxiosServices from '@/api/AxiosService';

export type BlogCreatePayload = {
    category_id?: number | null;
    title: string;
    slug: string;
    short_description?: string;
    description: string;
    tags?: string[];
    thumbnail?: string;
    is_active?: boolean;
    view_count?: number;
    author?: string;
    featured_image?: string;
    is_featured?: boolean;
    is_trending?: boolean;
    reading_time?: string;
    sort_order?: number;
    published_date?: string;
    meta_title?: string;
    meta_description?: string;
    canonical_url?: string;
};

export type BlogUpdatePayload = Partial<BlogCreatePayload>;

export type PublicBlogCategoryRef = {
    id: number;
    name: string;
    slug: string;
};

export type PublicBlog = {
    id: number;
    title: string;
    slug: string;
    short_description?: string;
    description?: string;
    meta_title?: string;
    meta_description?: string;
    canonical_url?: string;
    thumbnail?: string;
    tags?: string[];
    category?: PublicBlogCategoryRef;
    view_count?: number;
    created_at?: string;
};

export type PublicBlogsResponse = {
    success: boolean;
    message: string;
    data: PublicBlog[];
    meta: {
        currentPage: number;
        totalCount: number;
    } | null;
};

export type PublicBlogsQuery = {
    search?: string;
    categoryIds?: number[];
    page?: number;
    limit?: number;
};

export type PublicBlogDetailResponse = {
    success: boolean;
    message: string;
    data: PublicBlog;
    meta: null;
};

export const getPublicBlogs = ({
    search,
    categoryIds,
    page = 1,
    limit = 20,
}: PublicBlogsQuery = {}) => {
    return AxiosServices.get<PublicBlogsResponse>(
        API_END_POINTS.PUBLIC.BLOG.GET(search, categoryIds, page, limit),
        {},
    );
};

export const getPublicBlogBySlug = (slug: string) => {
    return AxiosServices.get<PublicBlogDetailResponse>(
        API_END_POINTS.PUBLIC.BLOG.GET_BY_SLUG(slug),
        {},
    );
};

export type AdminBlogQuery = {
    search?: string;
    is_active?: boolean;
    is_featured?: boolean;
};
export const getBlogs = (page: number, limit: number, query: AdminBlogQuery = {}) => {
    const params: Record<string, string | number | boolean | undefined> = {};
    if (query.search) params.search = query.search;
    if (query.is_active !== undefined) params.is_active = query.is_active;
    if (query.is_featured !== undefined) params.is_featured = query.is_featured;
    return AxiosServices.get(API_END_POINTS.DASHBOARD.BLOG.GET(page, limit, params), {});
};

export const createBlog = (data: BlogCreatePayload) => {
    return AxiosServices.post(API_END_POINTS.DASHBOARD.BLOG.POST, data);
};

export const updateBlog = (id: string | number, data: BlogUpdatePayload) => {
    return AxiosServices.put(API_END_POINTS.DASHBOARD.BLOG.PUT(String(id)), data);
};

export const deleteBlog = (id: string | number) => {
    return AxiosServices.remove(API_END_POINTS.DASHBOARD.BLOG.DELETE(String(id)));
};
