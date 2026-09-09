// import config from "../config";

// Build a query string for the admin (dashboard) list endpoints. Always includes
// page & limit and appends any additional server-side search/filter params that
// are present. Values like 'all'/'ALL'/'' act as "no filter" and are skipped so
// an empty (meaningless) query param is never sent.
function buildAdminQuery(
    base: string,
    page: number,
    limit: number,
    params?: Record<string, string | number | boolean | undefined>,
): string {
    const searchParams = new URLSearchParams();
    searchParams.set('page', String(page));
    searchParams.set('limit', String(limit));
    if (params) {
        for (const [key, value] of Object.entries(params)) {
            if (value === undefined || value === null || value === '') continue;
            if (typeof value === 'string' && value.toLowerCase() === 'all') continue;
            searchParams.set(key, String(value));
        }
    }
    const query = searchParams.toString();
    return query ? `${base}?${query}` : base;
}

export const API_END_POINTS = {
    AUTH: {
        SIGN_IN: '/auth/signin',
        SIGN_UP: '/auth/signup',
        FORGOT_PASSWORD: '/auth/forgot-password',
        RESET_PASSWORD: '/auth/reset-password',
        ADMIN_SIGN_IN: '/api/v1/auth/login',
    },
    PUBLIC: {
        CATEGORY: {
            GET: (page = 1, limit = 20, sort?: string, search?: string) => {
                const params = new URLSearchParams();
                if (search) params.set('search', search);
                if (sort && sort !== 'All') params.set('sort', sort);
                params.set('page', String(page));
                params.set('limit', String(limit));
                return `/api/v1/categories?${params.toString()}`;
            },
            GET_BY_SLUG: (slug: string) => `/api/v1/categories/${encodeURIComponent(slug)}`,
        },
        STORE: {
            GET: (
                search?: string,
                categoryIds?: number[],
                page = 1,
                limit = 20,
                sort?: string,
                letter?: string,
            ) => {
                const params = new URLSearchParams();
                if (search) params.set('search', search);
                if (categoryIds && categoryIds.length)
                    params.set('category_id', categoryIds.join(','));
                if (sort && sort !== 'All') params.set('sort', sort);
                if (letter && letter !== 'All') params.set('letter', letter);
                params.set('page', String(page));
                params.set('limit', String(limit));
                return `/api/v1/stores?${params.toString()}`;
            },
            GET_BY_SLUG: (slug: string) => `/api/v1/stores/${encodeURIComponent(slug)}`,
        },
        SEARCH: {
            GET: (q: string) => `/api/v1/search?q=${encodeURIComponent(q)}`,
        },
        CONTACT: {
            POST: '/api/v1/contact-us',
        },
        COUPON: {
            GET: (
                search?: string,
                categorySlug?: string,
                storeSlug?: string,
                page = 1,
                limit = 20,
                sort?: string,
            ) => {
                const params = new URLSearchParams();
                if (search) params.set('search', search);
                if (categorySlug) params.set('category_slug', categorySlug);
                if (storeSlug) params.set('store_slug', storeSlug);
                if (sort && sort !== 'All') params.set('sort', sort);
                params.set('page', String(page));
                params.set('limit', String(limit));
                return `/api/v1/coupons?${params.toString()}`;
            },
            GET_BY_SLUG: (slug: string) => `/api/v1/coupons/${encodeURIComponent(slug)}`,
        },
        BLOG_CATEGORY: {
            GET: (page = 1, limit = 20, sort?: string) => {
                const params = new URLSearchParams();
                if (sort && sort !== 'All') params.set('sort', sort);
                params.set('page', String(page));
                params.set('limit', String(limit));
                return `/api/v1/blog-categories?${params.toString()}`;
            },
        },
        BLOG: {
            GET: (search?: string, categoryIds?: number[], page = 1, limit = 20) => {
                const params = new URLSearchParams();
                if (search) params.set('search', search);
                if (categoryIds && categoryIds.length)
                    params.set('category_id', categoryIds.join(','));
                params.set('page', String(page));
                params.set('limit', String(limit));
                return `/api/v1/blogs?${params.toString()}`;
            },
            GET_BY_SLUG: (slug: string) => `/api/v1/blogs/${slug}`,
        },
    },
    DASHBOARD: {
        CONTACT: {
            GET: (page = 1, limit = 20, isReply?: boolean) => {
                const params = new URLSearchParams();
                params.set('page', String(page));
                params.set('limit', String(limit));
                if (typeof isReply === 'boolean') params.set('is_reply', String(isReply));
                return `/api/v1/admin/contact-us?${params.toString()}`;
            },
        },
        MEDIA: {
            GET: (page: number, limit: number) => `/api/v1/admin/media?page=${page}&limit=${limit}`,
            POST: '/api/v1/admin/media',
            DELETE: (id: string) => `/api/v1/admin/media/${id}`,
        },
        CATEGORY: {
            GET: (
                page: number,
                limit: number,
                params?: Record<string, string | number | boolean | undefined>,
            ) => buildAdminQuery('/api/v1/admin/categories', page, limit, params),
            POST: '/api/v1/admin/categories',
            PUT: (id: string) => `/api/v1/admin/categories/${id}`,
            DELETE: (id: string) => `/api/v1/admin/categories/${id}`,
        },
        STORE: {
            GET: (
                page: number,
                limit: number,
                params?: Record<string, string | number | boolean | undefined>,
            ) => buildAdminQuery('/api/v1/admin/stores', page, limit, params),
            POST: '/api/v1/admin/stores',
            PUT: (id: string) => `/api/v1/admin/stores/${id}`,
            DELETE: (id: string) => `/api/v1/admin/stores/${id}`,
        },
        COUPON: {
            GET: (
                page: number,
                limit: number,
                params?: Record<string, string | number | boolean | undefined>,
            ) => buildAdminQuery('/api/v1/admin/coupons', page, limit, params),
            POST: '/api/v1/admin/coupons',
            PUT: (id: string) => `/api/v1/admin/coupons/${id}`,
            DELETE: (id: string) => `/api/v1/admin/coupons/${id}`,
        },
        BLOG_CATEGORY: {
            GET: (page: number, limit: number) =>
                `/api/v1/admin/blog-categories?page=${page}&limit=${limit}`,
            POST: '/api/v1/admin/blog-categories',
            PUT: (id: string) => `/api/v1/admin/blog-categories/${id}`,
            DELETE: (id: string) => `/api/v1/admin/blog-categories/${id}`,
        },
        BLOG: {
            GET: (
                page: number,
                limit: number,
                params?: Record<string, string | number | boolean | undefined>,
            ) => buildAdminQuery('/api/v1/admin/blogs', page, limit, params),
            POST: '/api/v1/admin/blogs',
            PUT: (id: string) => `/api/v1/admin/blogs/${id}`,
            DELETE: (id: string) => `/api/v1/admin/blogs/${id}`,
        },
    },
};
