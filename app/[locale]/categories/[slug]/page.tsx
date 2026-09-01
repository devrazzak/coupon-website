import { CategoryDetailClient } from '@/components/public/CategoryDetailClient';
import { getPublicBlogCategories } from '@/utils/api/blog-category';

async function resolveCategory(slug: string, queryCategoryId?: string | null) {
    // Prefer the explicit id passed via query param (e.g. from category cards).
    if (queryCategoryId && !Number.isNaN(Number(queryCategoryId))) {
        const id = Number(queryCategoryId);
        return { id, name: slug, slug };
    }
    try {
        const res = await getPublicBlogCategories(1, 500);
        const category = res?.data?.data?.find(item => item.slug === slug);
        if (category) {
            return { id: category.id, name: category.name, slug: category.slug };
        }
    } catch {
        /* fall through */
    }
    return { id: undefined, name: slug, slug };
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { slug } = await params;
    const category = await resolveCategory(slug);

    return {
        title: `${category.name} Coupons & Deals | Coupello`,
        description: `Browse the latest verified coupons and deals for ${category.name}.`,
        alternates: {
            canonical: `/categories/${slug}`,
        },
    };
}

export default async function CategoryDetailPage({
    params,
    searchParams,
}: {
    params: Promise<{ locale: string; slug: string }>;
    searchParams: Promise<{ category_id?: string | null }>;
}) {
    const [{ slug }, sp] = await Promise.all([params, searchParams]);
    const category = await resolveCategory(slug, sp.category_id);

    return <CategoryDetailClient categoryId={category.id} categoryName={category.name} />;
}
