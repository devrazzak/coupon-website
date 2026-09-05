import type { Metadata } from 'next';

import { CategoryDetailClient } from '@/components/public/CategoryDetailClient';
import {
    type PublicCategory,
    getPublicCategories,
    getPublicCategoryBySlug,
} from '@/utils/api/category';

type ResolvedCategory = Pick<PublicCategory, 'name' | 'slug'> &
    Partial<
        Pick<
            PublicCategory,
            'id' | 'image' | 'short_description' | 'description' | 'seo_title' | 'meta_description'
        >
    >;

async function resolveCategory(
    slug: string,
    queryCategoryId?: string | null,
): Promise<ResolvedCategory> {
    try {
        const detailResponse = await getPublicCategoryBySlug(slug);
        if (detailResponse?.data?.data) {
            return detailResponse.data.data;
        }
    } catch {
        /* fall back to the public category list */
    }

    try {
        const res = await getPublicCategories(1, 500);
        const category = res?.data?.data?.find(item => item.slug === slug);
        if (category) {
            return category;
        }
    } catch {
        /* fall through */
    }

    if (queryCategoryId && !Number.isNaN(Number(queryCategoryId))) {
        return { id: Number(queryCategoryId), name: slug, slug };
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

    const title = category.seo_title || `${category.name} Coupons & Deals | Coupello`;
    const description =
        category.meta_description ||
        `Browse verified coupon codes, promo offers, and the latest deals in ${category.name}.`;

    return {
        title,
        description,
        alternates: {
            canonical: `/categories/${slug}`,
        },
        openGraph: {
            title,
            description,
            url: `/categories/${slug}`,
            siteName: 'Coupello',
            type: 'website',
        },
        robots: {
            index: true,
            follow: true,
        },
    } satisfies Metadata;
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

    return (
        <CategoryDetailClient
            categoryId={category.id}
            categoryName={category.name}
            categoryImage={category.image || undefined}
            categoryShortDescription={category.short_description || undefined}
            categoryDescription={category.description || undefined}
        />
    );
}
