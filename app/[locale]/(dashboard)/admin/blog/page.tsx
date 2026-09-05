'use client';

import Link from 'next/link';

import { Edit3, Eye, EyeOff, FolderOpen, Plus, Trash2 } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useMemo, useState } from 'react';

import {
    AdminModalShell,
    AdminPageHeader,
    ConfirmDeleteModal,
    FilterSelect,
    SearchInput,
    StatusBadge,
    TableWrapper,
    Toast,
} from '@/components/admin/admin-shared';
import { MediaPicker } from '@/components/admin/media-picker';
import { Button } from '@/components/ui/button';
import { type MediaRecord } from '@/utils/admin-data';
import { type BlogCreatePayload } from '@/utils/api/blog';
import { file_base_url } from '@/utils/config';
import { useCreateBlog, useDeleteBlog, useGetBlogs, useUpdateBlog } from '@/utils/hooks/blog';
import { useGetBlogCategories } from '@/utils/hooks/blog-category';
import { useGetMedia } from '@/utils/hooks/media';

export interface BlogApiItem {
    id: number;
    category_id: number | null;
    category?:
        | {
              id: number;
              name: string;
              slug?: string;
          }
        | string
        | null;
    title: string;
    slug: string;
    short_description: string | null;
    description: string | null;
    tags: string[] | string | null;
    thumbnail: string | null;
    featured_image?: string | null;
    is_active: boolean;
    view_count: number;
    author?: string | null;
    is_featured?: boolean;
    is_trending?: boolean;
    reading_time?: string | null;
    sort_order?: number;
    published_date?: string | null;
    meta_title?: string | null;
    meta_description?: string | null;
    canonical_url?: string | null;
    created_at?: string;
    updated_at?: string;
}

export interface BlogsResponse {
    success: boolean;
    message: string;
    data: BlogApiItem[];
    meta: {
        currentPage: number;
        totalCount: number;
    };
}

function getBlogsResponse(response: unknown): BlogsResponse | null {
    if (!response || typeof response !== 'object') return null;

    const payload = (response as { data?: unknown }).data;
    if (payload && typeof payload === 'object' && Array.isArray((payload as BlogsResponse).data)) {
        return payload as BlogsResponse;
    }

    return null;
}

function getCategoriesList(response: unknown): { id: number; name: string }[] {
    if (!response || typeof response !== 'object') return [];
    const payload = (response as { data?: unknown }).data;
    const list = Array.isArray(payload)
        ? payload
        : payload &&
            typeof payload === 'object' &&
            Array.isArray((payload as { data?: unknown }).data)
          ? ((payload as { data?: unknown[] }).data ?? [])
          : [];

    return list.map((item: any) => ({
        id: Number(item.id),
        name: String(item.name || `Category #${item.id}`),
    }));
}

function normalizeMediaUrl(value: string | null | undefined): string {
    const normalized = String(value ?? '').trim();
    if (!normalized || normalized.startsWith('blob:')) return '';
    if (/^https?:\/\//i.test(normalized)) return normalized;

    const base = file_base_url.replace(/\/$/, '');
    const path = normalized.replace(/^\/+/, '');
    return `${base}/${path}`;
}

function normalizeMediaItem(item: Record<string, any>): MediaRecord {
    const filePath = String(item?.file_path ?? item?.url ?? item?.filePath ?? '');
    const fileName = String(item?.name ?? item?.fileName ?? filePath.split('/').pop() ?? 'media');
    const safeId = String(item?.id ?? (filePath || 'media-default'));

    return {
        id: safeId,
        fileName,
        url: normalizeMediaUrl(filePath),
        mimeType: String(item?.mime_type ?? item?.mimeType ?? 'image/jpeg'),
        fileSize: Number(item?.file_size ?? item?.fileSize ?? 0),
        width: Number(item?.width ?? 0),
        height: Number(item?.height ?? 0),
        altText: String(item?.alt_text ?? item?.altText ?? ''),
        uploadedBy: String(item?.uploaded_by ?? item?.uploadedBy ?? 'admin'),
        createdAt: String(item?.created_at ?? item?.createdAt ?? new Date().toISOString()),
        updatedAt: String(item?.updated_at ?? item?.updatedAt ?? new Date().toISOString()),
        usedBy: Array.isArray(item?.used_by) ? item.used_by : [],
    };
}

function getMediaItems(response: unknown): MediaRecord[] {
    if (!response || typeof response !== 'object') return [];

    const payload = (response as { data?: unknown }).data;
    const list = Array.isArray(payload)
        ? payload
        : payload &&
            typeof payload === 'object' &&
            Array.isArray((payload as { data?: unknown }).data)
          ? ((payload as { data?: unknown[] }).data ?? [])
          : [];

    return list.map(item => normalizeMediaItem((item || {}) as Record<string, any>));
}

const pageSize = 10;

function slugify(value: string) {
    return (
        value
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '') || ''
    );
}

export type BlogUiRecord = {
    id: string;
    categoryId: number | null;
    categoryName: string;
    title: string;
    slug: string;
    shortDescription: string;
    description: string;
    tags: string[];
    thumbnail: string;
    featuredImage: string;
    isActive: boolean;
    viewCount: number;
    author: string;
    isFeatured: boolean;
    isTrending: boolean;
    readingTime: string;
    sortOrder: number;
    publishedDate: string;
    metaTitle: string;
    metaDescription: string;
    canonicalUrl: string;
    createdAt: string;
};

type BlogFormState = {
    id: string | number;
    categoryId: number | string;
    title: string;
    slug: string;
    shortDescription: string;
    description: string;
    tags: string[];
    thumbnail: string;
    featuredImage: string;
    isActive: boolean;
    viewCount: number;
    author: string;
    isFeatured: boolean;
    isTrending: boolean;
    readingTime: string;
    sortOrder: number;
    publishedDate: string;
    metaTitle: string;
    metaDescription: string;
    canonicalUrl: string;
};

function getDefaultBlogForm(): BlogFormState {
    return {
        id: '',
        categoryId: '',
        title: '',
        slug: '',
        shortDescription: '',
        description: '',
        tags: [],
        thumbnail: '',
        featuredImage: '',
        isActive: true,
        viewCount: 0,
        author: 'Admin',
        isFeatured: false,
        isTrending: false,
        readingTime: '5 min read',
        sortOrder: 1,
        publishedDate: new Date().toISOString().slice(0, 10),
        metaTitle: '',
        metaDescription: '',
        canonicalUrl: '',
    };
}

function BlogModal({
    initialData,
    categories,
    onClose,
    onSave,
    allMedia,
    onUploadMedia,
}: {
    initialData: BlogUiRecord | null;
    categories: { id: number; name: string }[];
    onClose: () => void;
    onSave: (payload: BlogFormState) => void;
    allMedia: MediaRecord[];
    onUploadMedia: (media: MediaRecord[]) => void;
}) {
    const [form, setForm] = useState<BlogFormState>(
        initialData
            ? {
                  id: initialData.id,
                  categoryId: initialData.categoryId ?? '',
                  title: initialData.title,
                  slug: initialData.slug,
                  shortDescription: initialData.shortDescription,
                  description: initialData.description,
                  tags: Array.isArray(initialData.tags) ? initialData.tags : [],
                  thumbnail: initialData.thumbnail,
                  featuredImage: initialData.featuredImage,
                  isActive: initialData.isActive,
                  viewCount: initialData.viewCount,
                  author: initialData.author,
                  isFeatured: initialData.isFeatured,
                  isTrending: initialData.isTrending,
                  readingTime: initialData.readingTime,
                  sortOrder: initialData.sortOrder,
                  publishedDate: initialData.publishedDate
                      ? initialData.publishedDate.slice(0, 10)
                      : new Date().toISOString().slice(0, 10),
                  metaTitle: initialData.metaTitle,
                  metaDescription: initialData.metaDescription,
                  canonicalUrl: initialData.canonicalUrl,
              }
            : getDefaultBlogForm(),
    );
    const [error, setError] = useState('');
    const [slugTouched, setSlugTouched] = useState(false);

    const updateField = <K extends keyof BlogFormState>(key: K, value: BlogFormState[K]) => {
        setForm(current => ({ ...current, [key]: value }));
    };

    const handleTitleChange = (value: string) => {
        setForm(current => ({
            ...current,
            title: value,
            // Auto-generate the slug from the title while typing, unless the
            // user has manually edited the slug field.
            ...(!slugTouched ? { slug: slugify(value) } : {}),
            metaTitle: current.metaTitle || value,
        }));
    };

    const handleSubmit = () => {
        if (!form.title.trim()) {
            setError('Blog post title is required.');
            return;
        }
        if (!form.description.trim()) {
            setError('Blog description / content is required.');
            return;
        }

        onSave({
            ...form,
            title: form.title.trim(),
            slug: form.slug.trim() || slugify(form.title),
            author: form.author.trim() || 'Admin',
            metaTitle: form.metaTitle || form.title.trim(),
            metaDescription: form.metaDescription || form.shortDescription,
            tags: Array.isArray(form.tags) ? form.tags : [],
        });
    };

    return (
        <AdminModalShell
            eyebrow="Blog Post"
            eyebrowClass="text-primary"
            title={initialData ? 'Edit Post' : 'Create Post'}
            subtitle={
                initialData
                    ? 'Update this article, its SEO and visibility settings.'
                    : 'Publish a new article to the blog.'
            }
            onClose={onClose}
            actions={
                <>
                    <Button type="button" variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="button" onClick={handleSubmit}>
                        {initialData ? 'Save Changes' : 'Create Post'}
                    </Button>
                </>
            }
        >
            {error && (
                <div className="mb-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-[13px] font-medium text-rose-700">
                    {error}
                </div>
            )}

            <div className="grid gap-5 md:grid-cols-3">
                <label className="block text-[13px] font-semibold text-foreground md:col-span-2">
                    <span className="mb-2 block">Post Title</span>
                    <input
                        value={form.title}
                        onChange={event => handleTitleChange(event.target.value)}
                        placeholder="e.g. Top deal strategies"
                        className="h-11 w-full rounded-xl border border-border bg-background px-3 text-[14px] text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                    />
                </label>

                <label className="block text-[13px] font-semibold text-foreground md:col-span-1">
                    <span className="mb-2 block">Slug</span>
                    <input
                        value={form.slug}
                        onChange={event => {
                            setSlugTouched(true);
                            updateField('slug', event.target.value);
                        }}
                        placeholder="e.g. top-deal-strategies"
                        className="h-11 w-full rounded-xl border border-border bg-background px-3 text-[14px] text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                    />
                </label>

                <label className="block text-[13px] font-semibold text-foreground md:col-span-1">
                    <span className="mb-2 block">Category</span>
                    <select
                        value={form.categoryId}
                        onChange={event =>
                            updateField(
                                'categoryId',
                                event.target.value ? Number(event.target.value) : '',
                            )
                        }
                        className="h-11 w-full rounded-xl border border-border bg-background px-3 text-[14px] text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                    >
                        <option value="">Select a category</option>
                        {categories.map(c => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="block text-[13px] font-semibold text-foreground md:col-span-1">
                    <span className="mb-2 block">Author</span>
                    <input
                        value={form.author}
                        onChange={event => updateField('author', event.target.value)}
                        placeholder="e.g. Admin"
                        className="h-11 w-full rounded-xl border border-border bg-background px-3 text-[14px] text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                    />
                </label>

                <label className="block text-[13px] font-semibold text-foreground md:col-span-1">
                    <span className="mb-2 block">Reading Time</span>
                    <input
                        value={form.readingTime}
                        onChange={event => updateField('readingTime', event.target.value)}
                        placeholder="e.g. 5 min read"
                        className="h-11 w-full rounded-xl border border-border bg-background px-3 text-[14px] text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                    />
                </label>

                <label className="block text-[13px] font-semibold text-foreground md:col-span-3">
                    <span className="mb-2 block">Short Description</span>
                    <textarea
                        value={form.shortDescription}
                        onChange={event => updateField('shortDescription', event.target.value)}
                        placeholder="e.g. Smart choices for deals"
                        className="min-h-[70px] w-full rounded-xl border border-border bg-background px-3 py-2.5 text-[14px] text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                    />
                </label>

                <div className="md:col-span-3">
                    <MediaPicker
                        label="Thumbnail Image"
                        value={form.thumbnail}
                        onChange={url => {
                            updateField('thumbnail', url);
                            if (!form.featuredImage) {
                                updateField('featuredImage', url);
                            }
                        }}
                        allMedia={allMedia}
                        onUpload={onUploadMedia}
                        helpText="Select or upload a thumbnail image"
                    />
                </div>

                <label className="block text-[13px] font-semibold text-foreground md:col-span-3">
                    <span className="mb-2 block">Tags (comma-separated)</span>
                    <input
                        value={Array.isArray(form.tags) ? form.tags.join(', ') : form.tags}
                        onChange={event =>
                            updateField(
                                'tags',
                                event.target.value
                                    .split(',')
                                    .map(tag => tag.trim())
                                    .filter(Boolean),
                            )
                        }
                        placeholder="e.g. deals, shopping"
                        className="h-11 w-full rounded-xl border border-border bg-background px-3 text-[14px] text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                    />
                </label>

                <label className="block text-[13px] font-semibold text-foreground md:col-span-3">
                    <span className="mb-2 block">Post Content / Description</span>
                    <textarea
                        value={form.description}
                        onChange={event => updateField('description', event.target.value)}
                        placeholder="Full blog content..."
                        className="min-h-[140px] w-full rounded-xl border border-border bg-background px-3 py-2.5 text-[14px] text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                    />
                </label>

                <div className="flex items-center gap-6 pt-2 md:col-span-3">
                    <label className="flex items-center gap-2 text-[13px] font-semibold text-foreground cursor-pointer">
                        <input
                            type="checkbox"
                            checked={form.isActive}
                            onChange={event => updateField('isActive', event.target.checked)}
                            className="h-4 w-4 rounded border-border text-primary"
                        />
                        Active
                    </label>
                    <label className="flex items-center gap-2 text-[13px] font-semibold text-foreground cursor-pointer">
                        <input
                            type="checkbox"
                            checked={form.isFeatured}
                            onChange={event => updateField('isFeatured', event.target.checked)}
                            className="h-4 w-4 rounded border-border text-primary"
                        />
                        Featured
                    </label>
                    <label className="flex items-center gap-2 text-[13px] font-semibold text-foreground cursor-pointer">
                        <input
                            type="checkbox"
                            checked={form.isTrending}
                            onChange={event => updateField('isTrending', event.target.checked)}
                            className="h-4 w-4 rounded border-border text-primary"
                        />
                        Trending
                    </label>
                </div>

                <label className="block text-[13px] font-semibold text-foreground md:col-span-2">
                    <span className="mb-2 block">Meta Title</span>
                    <input
                        value={form.metaTitle}
                        onChange={event => updateField('metaTitle', event.target.value)}
                        placeholder="e.g. Top deal strategies"
                        className="h-11 w-full rounded-xl border border-border bg-background px-3 text-[14px] text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                    />
                </label>

                <label className="block text-[13px] font-semibold text-foreground md:col-span-1">
                    <span className="mb-2 block">Canonical URL</span>
                    <input
                        value={form.canonicalUrl}
                        onChange={event => updateField('canonicalUrl', event.target.value)}
                        placeholder="https://..."
                        className="h-11 w-full rounded-xl border border-border bg-background px-3 text-[14px] text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                    />
                </label>

                <label className="block text-[13px] font-semibold text-foreground md:col-span-3">
                    <span className="mb-2 block">Meta Description</span>
                    <textarea
                        value={form.metaDescription}
                        onChange={event => updateField('metaDescription', event.target.value)}
                        placeholder="e.g. Smart choices for deals"
                        className="min-h-[70px] w-full rounded-xl border border-border bg-background px-3 py-2.5 text-[14px] text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                    />
                </label>
            </div>
        </AdminModalShell>
    );
}

export default function BlogAdminPage() {
    const locale = useLocale();
    const [blogOverrides, setBlogOverrides] = useState<Record<string, BlogUiRecord | null>>({});
    const [uploadedMedia, setUploadedMedia] = useState<MediaRecord[]>([]);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [featuredFilter, setFeaturedFilter] = useState('all');
    const [page, setPage] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<BlogUiRecord | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<BlogUiRecord | null>(null);
    const [toast, setToast] = useState('');

    const { data: apiData } = useGetBlogs(page, pageSize);
    const { data: blogCategoriesData } = useGetBlogCategories(1, 100);
    const { data: mediaApiData } = useGetMedia(1, 100);

    const { mutateAsync: createBlogMutation } = useCreateBlog();
    const { mutateAsync: updateBlogMutation } = useUpdateBlog();
    const { mutateAsync: deleteBlogMutation } = useDeleteBlog();

    const blogsResponse = useMemo(() => getBlogsResponse(apiData), [apiData]);
    const categories = useMemo(() => getCategoriesList(blogCategoriesData), [blogCategoriesData]);
    const mediaItems = useMemo(() => getMediaItems(mediaApiData), [mediaApiData]);
    const allMedia = useMemo(() => {
        const seen = new Set<string>();
        return [...uploadedMedia, ...mediaItems].filter(item => {
            if (seen.has(item.id)) return false;
            seen.add(item.id);
            return true;
        });
    }, [uploadedMedia, mediaItems]);

    const posts = useMemo(() => {
        const items: BlogUiRecord[] =
            blogsResponse?.data.map(item => {
                const categoryName =
                    typeof item.category === 'object' && item.category !== null
                        ? item.category.name
                        : typeof item.category === 'string'
                          ? item.category
                          : item.category_id
                            ? categories.find(c => c.id === item.category_id)?.name ||
                              `Category #${item.category_id}`
                            : 'General';

                const parsedTags = Array.isArray(item.tags)
                    ? item.tags
                    : typeof item.tags === 'string'
                      ? item.tags
                            .split(',')
                            .map(t => t.trim())
                            .filter(Boolean)
                      : [];

                return {
                    id: String(item.id),
                    categoryId: item.category_id,
                    categoryName,
                    title: item.title,
                    slug: item.slug,
                    shortDescription: item.short_description ?? '',
                    description: item.description ?? '',
                    tags: parsedTags,
                    thumbnail: item.thumbnail ? normalizeMediaUrl(item.thumbnail) : '',
                    featuredImage: item.featured_image
                        ? normalizeMediaUrl(item.featured_image)
                        : '',
                    isActive: Boolean(item.is_active),
                    viewCount: item.view_count ?? 0,
                    author: item.author || 'Admin',
                    isFeatured: Boolean(item.is_featured),
                    isTrending: Boolean(item.is_trending),
                    readingTime: item.reading_time || '5 min read',
                    sortOrder: item.sort_order ?? 1,
                    publishedDate:
                        item.published_date ??
                        (item.created_at ? item.created_at.slice(0, 10) : ''),
                    metaTitle: item.meta_title ?? '',
                    metaDescription: item.meta_description ?? '',
                    canonicalUrl: item.canonical_url ?? '',
                    createdAt: item.created_at ?? '',
                };
            }) ?? [];

        return items.flatMap(post => {
            const override = blogOverrides[post.id];
            return override === null ? [] : [override ?? post];
        });
    }, [blogOverrides, blogsResponse, categories]);

    const filteredPosts = useMemo(() => {
        return posts.filter(post => {
            const matchesSearch =
                post.title.toLowerCase().includes(search.toLowerCase()) ||
                post.author.toLowerCase().includes(search.toLowerCase()) ||
                post.categoryName.toLowerCase().includes(search.toLowerCase()) ||
                post.slug.toLowerCase().includes(search.toLowerCase());
            const matchesStatus =
                statusFilter === 'all' ||
                (statusFilter === 'active'
                    ? post.isActive
                    : statusFilter === 'inactive'
                      ? !post.isActive
                      : true);
            const matchesFeatured =
                featuredFilter === 'all' ||
                (featuredFilter === 'featured' ? post.isFeatured : !post.isFeatured);
            return matchesSearch && matchesStatus && matchesFeatured;
        });
    }, [featuredFilter, posts, search, statusFilter]);

    const totalPages = Math.max(1, Math.ceil(filteredPosts.length / pageSize));
    const visiblePosts = filteredPosts.slice((page - 1) * pageSize, page * pageSize);

    const handleSave = async (form: BlogFormState) => {
        try {
            const createPayload: BlogCreatePayload = {
                category_id: form.categoryId ? Number(form.categoryId) : null,
                title: form.title.trim(),
                slug: form.slug.trim() || slugify(form.title),
                short_description: form.shortDescription,
                description: form.description,
                tags: form.tags,
                thumbnail: form.thumbnail,
                is_active: form.isActive,
                view_count: Number(form.viewCount) || 0,
                author: form.author.trim() || 'Admin',
                featured_image: form.featuredImage || form.thumbnail,
                is_featured: form.isFeatured,
                is_trending: form.isTrending,
                reading_time: form.readingTime,
                sort_order: Number(form.sortOrder) || 1,
                published_date: form.publishedDate,
                meta_title: form.metaTitle || form.title.trim(),
                meta_description: form.metaDescription || form.shortDescription,
                canonical_url: form.canonicalUrl,
            };

            const categoryName = form.categoryId
                ? categories.find(c => c.id === Number(form.categoryId))?.name ||
                  `Category #${form.categoryId}`
                : '';

            if (editing?.id) {
                await updateBlogMutation({
                    id: editing.id,
                    values: createPayload,
                });
                const updatedRecord: BlogUiRecord = {
                    id: String(editing.id),
                    categoryId: form.categoryId ? Number(form.categoryId) : null,
                    categoryName,
                    title: form.title.trim(),
                    slug: form.slug.trim() || slugify(form.title),
                    shortDescription: form.shortDescription,
                    description: form.description,
                    tags: form.tags,
                    thumbnail: form.thumbnail,
                    featuredImage: form.featuredImage || form.thumbnail,
                    isActive: form.isActive,
                    viewCount: Number(form.viewCount) || 0,
                    author: form.author.trim() || 'Admin',
                    isFeatured: form.isFeatured,
                    isTrending: form.isTrending,
                    readingTime: form.readingTime,
                    sortOrder: Number(form.sortOrder) || 1,
                    publishedDate: form.publishedDate,
                    metaTitle: form.metaTitle,
                    metaDescription: form.metaDescription,
                    canonicalUrl: form.canonicalUrl,
                    createdAt: editing.createdAt ?? new Date().toISOString().slice(0, 10),
                };
                setBlogOverrides(current => ({ ...current, [String(editing.id)]: updatedRecord }));
                setToast('Blog post updated successfully.');
            } else {
                await createBlogMutation(createPayload);
                setToast('Blog post created successfully.');
            }

            setModalOpen(false);
            setEditing(null);
        } catch (error) {
            setToast('Failed to save blog post.');
            console.error('Save blog error:', error);
        }
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;

        try {
            await deleteBlogMutation(deleteTarget.id);
            setBlogOverrides(current => ({ ...current, [deleteTarget.id]: null }));
            setDeleteTarget(null);
            setToast('Blog post deleted successfully.');
        } catch (error) {
            setToast('Failed to delete blog post.');
            console.error('Delete error:', error);
        }
    };

    const toggleStatus = async (id: string) => {
        const post = posts.find(item => item.id === id);
        if (!post) return;

        const nextActive = !post.isActive;
        try {
            await updateBlogMutation({
                id,
                values: { is_active: nextActive },
            });
            setBlogOverrides(current => ({
                ...current,
                [id]: { ...post, isActive: nextActive },
            }));
            setToast('Post status updated.');
        } catch (error) {
            setToast('Failed to update status.');
            console.error('Status toggle error:', error);
        }
    };

    return (
        <>
            <AdminPageHeader
                title="Blog"
                subtitle="Create and manage blog content."
                breadcrumb={['Dashboard', 'Blog']}
                action={
                    <div className="flex items-center gap-3">
                        <Link href={`/${locale}/admin/blog/categories`}>
                            <Button variant="outline">
                                <FolderOpen className="mr-2 h-4 w-4" /> Categories
                            </Button>
                        </Link>
                        <Button
                            onClick={() => {
                                setEditing(null);
                                setModalOpen(true);
                            }}
                        >
                            <Plus className="mr-2 h-4 w-4" /> New Post
                        </Button>
                    </div>
                }
            />

            <div className="rounded-3xl border border-border bg-card p-4 shadow-soft">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <SearchInput
                        value={search}
                        onChange={setSearch}
                        placeholder="Search posts by title, author, category or slug"
                    />
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <FilterSelect
                            value={statusFilter}
                            onChange={setStatusFilter}
                            placeholder="Status"
                            options={[
                                { value: 'all', label: 'All statuses' },
                                { value: 'active', label: 'Active' },
                                { value: 'inactive', label: 'Inactive' },
                            ]}
                        />
                        <FilterSelect
                            value={featuredFilter}
                            onChange={setFeaturedFilter}
                            placeholder="Featured"
                            options={[
                                { value: 'all', label: 'All items' },
                                { value: 'featured', label: 'Featured' },
                                { value: 'non-featured', label: 'Not featured' },
                            ]}
                        />
                    </div>
                </div>
            </div>

            <div className="mt-6">
                <TableWrapper>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left">
                            <thead className="bg-surface text-[12px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                                <tr>
                                    <th className="px-4 py-3">Thumbnail</th>
                                    <th className="px-4 py-3">Title</th>
                                    <th className="px-4 py-3">Author</th>
                                    <th className="px-4 py-3">Category</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3">Featured</th>
                                    <th className="px-4 py-3">Views</th>
                                    <th className="px-4 py-3">Published</th>
                                    <th className="px-4 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {visiblePosts.map(post => (
                                    <tr
                                        key={post.id}
                                        className="border-t border-border text-[14px] text-foreground"
                                    >
                                        <td className="px-4 py-3">
                                            {post.thumbnail ? (
                                                /* eslint-disable-next-line @next/next/no-img-element */
                                                <img
                                                    src={post.thumbnail}
                                                    alt={post.title}
                                                    className="h-10 w-14 rounded-lg border border-border object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-10 w-14 items-center justify-center rounded-lg border border-border bg-surface text-[10px] font-semibold text-muted-foreground">
                                                    No Img
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="font-semibold">{post.title}</div>
                                            <div className="text-[12px] text-muted-foreground line-clamp-1 max-w-xs">
                                                {post.shortDescription || 'N/A'}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">{post.author}</td>
                                        <td className="px-4 py-3">{post.categoryName}</td>
                                        <td className="px-4 py-3">
                                            <StatusBadge
                                                status={post.isActive ? 'active' : 'inactive'}
                                            />
                                        </td>
                                        <td className="px-4 py-3">
                                            <StatusBadge
                                                status={post.isFeatured ? 'featured' : 'inactive'}
                                            />
                                        </td>
                                        <td className="px-4 py-3 font-mono text-[13px]">
                                            {post.viewCount}
                                        </td>
                                        <td className="px-4 py-3 text-[13px] text-muted-foreground">
                                            {post.publishedDate || 'N/A'}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => toggleStatus(post.id)}
                                                    title="Toggle status"
                                                >
                                                    {post.isActive ? (
                                                        <Eye className="h-4 w-4" />
                                                    ) : (
                                                        <EyeOff className="h-4 w-4" />
                                                    )}
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => {
                                                        setEditing(post);
                                                        setModalOpen(true);
                                                    }}
                                                    title="Edit"
                                                >
                                                    <Edit3 className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => setDeleteTarget(post)}
                                                    title="Delete"
                                                    className="text-rose-600 hover:text-rose-700"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </TableWrapper>
            </div>

            <div className="mt-6 flex items-center justify-between">
                <div className="text-[13px] text-muted-foreground">
                    Showing {visiblePosts.length} of {filteredPosts.length} posts
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage(current => Math.max(1, current - 1))}
                        disabled={page === 1}
                    >
                        Previous
                    </Button>
                    <span className="text-[13px] font-medium text-foreground">
                        Page {page} / {totalPages}
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage(current => Math.min(totalPages, current + 1))}
                        disabled={page >= totalPages}
                    >
                        Next
                    </Button>
                </div>
            </div>

            {modalOpen && (
                <BlogModal
                    initialData={editing}
                    categories={categories}
                    onClose={() => {
                        setEditing(null);
                        setModalOpen(false);
                    }}
                    onSave={handleSave}
                    allMedia={allMedia}
                    onUploadMedia={newMedia => setUploadedMedia(prev => [...newMedia, ...prev])}
                />
            )}
            <ConfirmDeleteModal
                open={!!deleteTarget}
                title="Delete blog post"
                description={
                    deleteTarget
                        ? `This will permanently remove the post "${deleteTarget.title}".`
                        : 'Delete this post?'
                }
                onClose={() => setDeleteTarget(null)}
                onConfirm={handleDelete}
            />
            <Toast message={toast} visible={!!toast} onClose={() => setToast('')} />
        </>
    );
}
