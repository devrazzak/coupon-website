import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
    type CouponCreatePayload,
    type CouponUpdatePayload,
    type PublicCouponsQuery,
    createCoupon,
    deleteCoupon,
    getCoupons,
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

export function useGetCoupons(page = 1, limit = 10) {
    return useQuery({
        queryKey: ['GetCoupons', page, limit],
        queryFn: () => getCoupons(page, limit),
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
