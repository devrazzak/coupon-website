import { notFound } from 'next/navigation';

import type { Metadata } from 'next';

import { CategoryDetailClient } from '@/components/public/CategoryDetailClient';
import { JsonLd } from '@/components/seo/JsonLd';
import siteConfig from '@/utils/SiteConfig';
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

async function resolveCategory(slug: string): Promise<ResolvedCategory | null> {
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

    return null;
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { slug } = await params;
    const category = await resolveCategory(slug);

    if (!category) {
        return {
            title: `Category coupons | ${siteConfig.company_name}`,
            robots: { index: false, follow: true },
        } satisfies Metadata;
    }

    const title =
        category.seo_title || `${category.name} Coupons & Deals | ${siteConfig.company_name}`;
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
            siteName: siteConfig.company_name,
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
}: {
    params: Promise<{ locale: string; slug: string }>;
}) {
    const { slug } = await params;
    const category = await resolveCategory(slug);

    if (!category) {
        notFound();
    }

    const pageUrl = `${siteConfig.site_url}/categories/${category.slug}`;
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.site_url },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Categories',
                item: `${siteConfig.site_url}/categories`,
            },
            { '@type': 'ListItem', position: 3, name: category.name, item: pageUrl },
        ],
    };

    return (
        <>
            <JsonLd data={breadcrumbSchema} />
            <CategoryDetailClient
                categorySlug={category.slug}
                categoryName={category.name}
                categoryImage={category.image || undefined}
                categoryShortDescription={category.short_description || undefined}
                categoryDescription={category.description || undefined}
            />
        </>
    );
}
