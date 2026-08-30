import { StoreDetailClient } from '@/components/public/StoreDetailClient';
import { PublicPageShell } from '@/components/public/page-layout';
import { coupons } from '@/utils/coupello';
import { stores } from '@/utils/public-content';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { slug } = await params;
    const store = stores.find(item => item.slug === slug) ?? stores[0];

    return {
        title: `${store.name} Coupons & Deals | Coupello`,
        description: store.description,
        alternates: {
            canonical: `/shops/${slug}`,
        },
    };
}

export default async function StoreDetailPage({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { slug } = await params;
    const store = stores.find(item => item.slug === slug) ?? stores[0];
    const storeCoupons = coupons.filter(coupon => coupon.store === store.name);

    return (
        <PublicPageShell>
            <StoreDetailClient store={store} storeCoupons={storeCoupons} />
        </PublicPageShell>
    );
}
