import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
    type CouponCreatePayload,
    type CouponUpdatePayload,
    type PublicCouponsQuery,
    createCoupon,
    deleteCoupon,
    getCoupons,
    getPublicCouponBySlug,
    getPublicCoupons,
    updateCoupon,
} from '@/utils/api/coupon';

export function useGetPublicCoupons(query: PublicCouponsQuery = {}) {
    return useQuery({
        queryKey: ['GetPublicCoupons', query],
        queryFn: () => getPublicCoupons(query),
        retry: false,
    });
}

export function useInfinitePublicCoupons(query: PublicCouponsQuery = {}) {
    const limit = query.limit ?? 20;

    return useInfiniteQuery({
        queryKey: ['GetInfinitePublicCoupons', query],
        initialPageParam: 1,
        queryFn: ({ pageParam }) => getPublicCoupons({ ...query, page: pageParam, limit }),
        getNextPageParam: lastPage => {
            const { currentPage, totalCount } = lastPage.data.meta;
            return currentPage * limit < totalCount ? currentPage + 1 : undefined;
        },
        retry: false,
    });
}

export function useGetPublicCouponBySlug(slug?: string) {
    return useQuery({
        queryKey: ['GetPublicCouponBySlug', slug],
        queryFn: () => getPublicCouponBySlug(slug as string),
        enabled: Boolean(slug),
        retry: false,
    });
}

export function useGetCoupons(
    page = 1,
    limit = 10,
    query: {
        search?: string;
        status?: string;
        coupon_type?: string;
        is_featured?: boolean;
        is_verified?: boolean;
        is_active?: boolean;
    } = {},
) {
    return useQuery({
        queryKey: ['GetCoupons', page, limit, query],
        queryFn: () => getCoupons(page, limit, query),
        retry: false,
    });
}

export function useCreateCoupon() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['createCoupon'],
        mutationFn: (data: CouponCreatePayload) => createCoupon(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['GetCoupons'] });
        },
    });
}

export function useUpdateCoupon() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['updateCoupon'],
        mutationFn: ({ id, values }: { id: string | number; values: CouponUpdatePayload }) =>
            updateCoupon(id, values),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['GetCoupons'] });
        },
    });
}

export function useDeleteCoupon() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['deleteCoupon'],
        mutationFn: (id: string | number) => deleteCoupon(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['GetCoupons'] });
        },
    });
}
