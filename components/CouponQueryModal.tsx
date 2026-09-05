'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { CouponModal } from '@/components/CouponModal';
import { useGetPublicCouponBySlug } from '@/utils/hooks/coupon';

export function CouponQueryModal() {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const couponSlug = searchParams.get('coupon_slug') || undefined;
    const { data } = useGetPublicCouponBySlug(couponSlug);
    const coupon = data?.data?.data ?? null;

    const handleClose = () => {
        const nextParams = new URLSearchParams(searchParams.toString());
        nextParams.delete('coupon_slug');
        const query = nextParams.toString();
        router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    };

    return <CouponModal coupon={couponSlug ? coupon : null} onClose={handleClose} />;
}
