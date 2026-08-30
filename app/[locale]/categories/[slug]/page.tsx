import { CategoryDetailClient } from '@/components/public/CategoryDetailClient';
import { categories, coupons, stores } from '@/utils/public-content';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { slug } = await params;
    const category = categories.find(item => item.slug === slug) ?? categories[0];

    return {
        title: `${category.name} Coupons & Deals | Coupello`,
        description: category.description,
        alternates: {
            canonical: `/categories/${slug}`,
        },
    };
}

export default async function CategoryDetailPage({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { slug } = await params;
    const category = categories.find(item => item.slug === slug) ?? categories[0];
    const categoryCoupons = coupons.filter(
        coupon => coupon.category === category.name || category.name === 'All Categories',
    );
    const relatedStores = stores.filter(store => store.category === category.name).slice(0, 3);

    return (
        <CategoryDetailClient
            category={category}
            categoryCoupons={categoryCoupons}
            relatedStores={relatedStores}
        />
    );
}
