'use client';

import { Edit3, Eye, EyeOff, Plus, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';

import {
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
import { type BlogRecord, type MediaRecord, blogData, mediaData } from '@/utils/admin-data';

const pageSize = 5;

function slugify(value: string) {
    return (
        value
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '') || 'blog-post'
    );
}

function BlogModal({
    initialData,
    onClose,
    onSave,
    allMedia,
    onUploadMedia,
}: {
    initialData: BlogRecord | null;
    onClose: () => void;
    onSave: (payload: BlogRecord) => void;
    allMedia: MediaRecord[];
    onUploadMedia: (media: MediaRecord[]) => void;
}) {
    const [form, setForm] = useState<BlogRecord>(
        initialData ?? {
            id: '',
            title: '',
            slug: '',
            excerpt: '',
            featuredImage: '',
            thumbnail: '',
            category: '',
            tags: [],
            author: '',
            status: 'draft',
            featured: false,
            trending: false,
            publishedDate: new Date().toISOString().slice(0, 10),
            updatedDate: new Date().toISOString().slice(0, 10),
            readingTime: '5 min read',
            displayOrder: 1,
            metaTitle: '',
            metaDescription: '',
            canonicalUrl: '',
            ogTitle: '',
            ogDescription: '',
            ogImage: '',
            content: '',
        },
    );
    const [error, setError] = useState('');

    const updateField = <K extends keyof BlogRecord>(key: K, value: BlogRecord[K]) => {
        setForm(current => ({ ...current, [key]: value }));
    };

    const handleSubmit = () => {
        if (!form.title.trim()) {
            setError('Blog post title is required.');
            return;
        }
        if (!form.author.trim()) {
            setError('Author name is required.');
            return;
        }
        if (!form.content.trim()) {
            setError('Blog content is required.');
            return;
        }

        onSave({
            ...form,
            id: form.id || form.slug || 'new-blog',
            title: form.title.trim(),
            slug: form.slug.trim() || slugify(form.title),
            author: form.author.trim(),
            metaTitle: form.metaTitle || form.title,
            metaDescription: form.metaDescription || form.excerpt,
            tags: Array.isArray(form.tags) ? form.tags : [],
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
            <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-border bg-card p-5 shadow-lift md:p-6">
                <div className="mb-5 flex items-center justify-between gap-3">
                    <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
                            Blog Post
                        </p>
                        <h3 className="mt-1 font-display text-[26px] font-extrabold text-foreground">
                            {initialData ? 'Edit Post' : 'Create Post'}
                        </h3>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full border border-border p-2 text-muted-foreground hover:bg-muted"
                    >
                        ×
                    </button>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <label className="block text-[13px] font-semibold text-foreground md:col-span-2">
                        <span className="mb-2 block">Post Title</span>
                        <input
                            value={form.title}
                            onChange={event => {
                                const title = event.target.value;
                                setForm(current => ({
                                    ...current,
                                    title,
                                    slug: current.slug || slugify(title),
                                }));
                            }}
                            className="h-11 w-full rounded-xl border border-border bg-background px-3 text-[14px] text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        />
                    </label>

                    <label className="block text-[13px] font-semibold text-foreground md:col-span-1">
                        <span className="mb-2 block">Status</span>
                        <select
                            value={form.status}
                            onChange={event =>
                                updateField('status', event.target.value as BlogRecord['status'])
                            }
                            className="h-11 w-full rounded-xl border border-border bg-background px-3 text-[14px] text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                        </select>
                    </label>

                    <label className="block text-[13px] font-semibold text-foreground md:col-span-2">
                        <span className="mb-2 block">Excerpt</span>
                        <textarea
                            value={form.excerpt}
                            onChange={event => updateField('excerpt', event.target.value)}
                            className="min-h-[78px] w-full rounded-xl border border-border bg-background px-3 py-2.5 text-[14px] text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        />
                    </label>

                    <label className="block text-[13px] font-semibold text-foreground md:col-span-1">
                        <span className="mb-2 block">Author</span>
                        <input
                            value={form.author}
                            onChange={event => updateField('author', event.target.value)}
                            className="h-11 w-full rounded-xl border border-border bg-background px-3 text-[14px] text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        />
                    </label>

                    <label className="block text-[13px] font-semibold text-foreground md:col-span-1">
                        <span className="mb-2 block">Category</span>
                        <input
                            value={form.category}
                            onChange={event => updateField('category', event.target.value)}
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

                    <label className="block text-[13px] font-semibold text-foreground md:col-span-1">
                        <span className="mb-2 block">Display Order</span>
                        <input
                            type="number"
                            value={form.displayOrder}
                            onChange={event =>
                                updateField('displayOrder', Number(event.target.value) || 1)
                            }
                            className="h-11 w-full rounded-xl border border-border bg-background px-3 text-[14px] text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        />
                    </label>

                    <label className="block text-[13px] font-semibold text-foreground md:col-span-1">
                        <span className="mb-2 block">Published Date</span>
                        <input
                            type="date"
                            value={form.publishedDate}
                            onChange={event => updateField('publishedDate', event.target.value)}
                            className="h-11 w-full rounded-xl border border-border bg-background px-3 text-[14px] text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        />
                    </label>

                    <label className="block text-[13px] font-semibold text-foreground md:col-span-1">
                        <span className="mb-2 block">Last Updated</span>
                        <input
                            type="date"
                            value={form.updatedDate}
                            onChange={event => updateField('updatedDate', event.target.value)}
                            className="h-11 w-full rounded-xl border border-border bg-background px-3 text-[14px] text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        />
                    </label>

                    <div className="md:col-span-2">
                        <MediaPicker
                            label="Featured Image"
                            value={form.featuredImage}
                            onChange={url => updateField('featuredImage', url)}
                            allMedia={allMedia}
                            onUpload={onUploadMedia}
                            helpText="Select or upload a featured image"
                        />
                    </div>

                    <label className="block text-[13px] font-semibold text-foreground md:col-span-1">
                        <span className="mb-2 block">Slug</span>
                        <input
                            value={form.slug}
                            onChange={event => updateField('slug', event.target.value)}
                            className="h-11 w-full rounded-xl border border-border bg-background px-3 text-[14px] text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        />
                    </label>

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
                                        .filter(Boolean) as any,
                                )
                            }
                            className="h-11 w-full rounded-xl border border-border bg-background px-3 text-[14px] text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        />
                    </label>

                    <label className="flex items-center gap-2 text-[13px] font-semibold text-foreground">
                        <input
                            type="checkbox"
                            checked={form.featured}
                            onChange={event => updateField('featured', event.target.checked)}
                            className="h-4 w-4 rounded border-border text-primary"
                        />
                        Featured
                    </label>
                    <label className="flex items-center gap-2 text-[13px] font-semibold text-foreground">
                        <input
                            type="checkbox"
                            checked={form.trending}
                            onChange={event => updateField('trending', event.target.checked)}
                            className="h-4 w-4 rounded border-border text-primary"
                        />
                        Trending
                    </label>

                    <label className="block text-[13px] font-semibold text-foreground md:col-span-3">
                        <span className="mb-2 block">Post Content</span>
                        <textarea
                            value={form.content}
                            onChange={event => updateField('content', event.target.value)}
                            className="min-h-[140px] w-full rounded-xl border border-border bg-background px-3 py-2.5 text-[14px] text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        />
                    </label>

                    <label className="block text-[13px] font-semibold text-foreground md:col-span-2">
                        <span className="mb-2 block">Meta Title</span>
                        <input
                            value={form.metaTitle}
                            onChange={event => updateField('metaTitle', event.target.value)}
                            className="h-11 w-full rounded-xl border border-border bg-background px-3 text-[14px] text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        />
                    </label>

                    <label className="block text-[13px] font-semibold text-foreground md:col-span-1">
                        <span className="mb-2 block">Canonical URL</span>
                        <input
                            value={form.canonicalUrl}
                            onChange={event => updateField('canonicalUrl', event.target.value)}
                            className="h-11 w-full rounded-xl border border-border bg-background px-3 text-[14px] text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        />
                    </label>

                    <label className="block text-[13px] font-semibold text-foreground md:col-span-3">
                        <span className="mb-2 block">Meta Description</span>
                        <textarea
                            value={form.metaDescription}
                            onChange={event => updateField('metaDescription', event.target.value)}
                            className="min-h-[78px] w-full rounded-xl border border-border bg-background px-3 py-2.5 text-[14px] text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        />
                    </label>
                </div>

                {error && <p className="mt-4 text-[13px] font-medium text-rose-600">{error}</p>}

                <div className="mt-6 flex justify-end gap-3">
                    <Button type="button" variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="button" onClick={handleSubmit}>
                        {initialData ? 'Save Changes' : 'Create Post'}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default function BlogAdminPage() {
    const [posts, setPosts] = useState(blogData);
    const [allMedia, setAllMedia] = useState(mediaData);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [featuredFilter, setFeaturedFilter] = useState('all');
    const [page, setPage] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<BlogRecord | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<BlogRecord | null>(null);
    const [toast, setToast] = useState('');

    const filteredPosts = useMemo(() => {
        return posts.filter(post => {
            const matchesSearch =
                post.title.toLowerCase().includes(search.toLowerCase()) ||
                post.author.toLowerCase().includes(search.toLowerCase()) ||
                post.category.toLowerCase().includes(search.toLowerCase());
            const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
            const matchesFeatured =
                featuredFilter === 'all' ||
                (featuredFilter === 'featured' ? post.featured : !post.featured);
            return matchesSearch && matchesStatus && matchesFeatured;
        });
    }, [posts, featuredFilter, search, statusFilter]);

    const totalPages = Math.max(1, Math.ceil(filteredPosts.length / pageSize));
    const visiblePosts = filteredPosts.slice((page - 1) * pageSize, page * pageSize);

    const handleSave = (payload: BlogRecord) => {
        setPosts(current => {
            const index = current.findIndex(item => item.id === payload.id);
            if (index >= 0) {
                const updated = [...current];
                updated[index] = { ...payload, updatedDate: new Date().toISOString().slice(0, 10) };
                return updated;
            }
            return [payload, ...current];
        });
        setModalOpen(false);
        setEditing(null);
        setToast(payload.id ? 'Post updated successfully.' : 'Post created successfully.');
    };

    const handleDelete = () => {
        if (!deleteTarget) return;
        setPosts(current => current.filter(item => item.id !== deleteTarget.id));
        setDeleteTarget(null);
        setToast('Post deleted successfully.');
    };

    const toggleStatus = (id: string) => {
        setPosts(current =>
            current.map(post =>
                post.id === id
                    ? { ...post, status: post.status === 'published' ? 'draft' : 'published' }
                    : post,
            ),
        );
        setToast('Post status updated.');
    };

    return (
        <>
            <AdminPageHeader
                title="Blog"
                subtitle="Create and manage blog content."
                breadcrumb={['Dashboard', 'Blog']}
                action={
                    <Button
                        onClick={() => {
                            setEditing(null);
                            setModalOpen(true);
                        }}
                    >
                        <Plus className="mr-2 h-4 w-4" /> New Post
                    </Button>
                }
            />

            <div className="rounded-3xl border border-border bg-card p-4 shadow-soft">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <SearchInput
                        value={search}
                        onChange={setSearch}
                        placeholder="Search posts by title, author or category"
                    />
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <FilterSelect
                            value={statusFilter}
                            onChange={setStatusFilter}
                            placeholder="Status"
                            options={[
                                { value: 'all', label: 'All statuses' },
                                { value: 'published', label: 'Published' },
                                { value: 'draft', label: 'Draft' },
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
                                    <th className="px-4 py-3">Title</th>
                                    <th className="px-4 py-3">Author</th>
                                    <th className="px-4 py-3">Category</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3">Featured</th>
                                    <th className="px-4 py-3">Published</th>
                                    <th className="px-4 py-3">Reading Time</th>
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
                                            <div className="font-semibold">{post.title}</div>
                                            <div className="text-[12px] text-muted-foreground">
                                                {post.excerpt}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">{post.author}</td>
                                        <td className="px-4 py-3">{post.category}</td>
                                        <td className="px-4 py-3">
                                            <StatusBadge status={post.status} />
                                        </td>
                                        <td className="px-4 py-3">
                                            <StatusBadge
                                                status={post.featured ? 'featured' : 'inactive'}
                                            />
                                        </td>
                                        <td className="px-4 py-3 text-[13px] text-muted-foreground">
                                            {post.publishedDate}
                                        </td>
                                        <td className="px-4 py-3">{post.readingTime}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => toggleStatus(post.id)}
                                                    title="Toggle status"
                                                >
                                                    {post.status === 'published' ? (
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
                    onClose={() => {
                        setEditing(null);
                        setModalOpen(false);
                    }}
                    onSave={handleSave}
                    allMedia={allMedia}
                    onUploadMedia={newMedia => setAllMedia(prev => [...newMedia, ...prev])}
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
