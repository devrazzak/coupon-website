'use client';

import { useState } from 'react';

import { MediaPicker } from '@/components/admin/media-picker';
import { Button } from '@/components/ui/button';
import type { CategoryRecord, MediaRecord } from '@/utils/admin-data';

function slugify(value: string) {
    return (
        value
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '') || ''
    );
}

const emptyCategory: CategoryRecord = {
    id: '',
    name: '',
    slug: '',
    description: '',
    image: '',
    status: true,
    featured: false,
    displayOrder: 1,
    metaTitle: '',
    metaDescription: '',
};

type CreateCategoryModalProps = {
    onClose: () => void;
    onSave: (payload: CategoryRecord) => void;
    allMedia: MediaRecord[];
    onUploadMedia: (media: MediaRecord[]) => void;
};

export function CreateCategoryModal({
    onClose,
    onSave,
    allMedia,
    onUploadMedia,
}: CreateCategoryModalProps) {
    const [form, setForm] = useState<CategoryRecord>(emptyCategory);
    const [error, setError] = useState('');
    const [slugTouched, setSlugTouched] = useState(false);

    const updateField = <K extends keyof CategoryRecord>(key: K, value: CategoryRecord[K]) => {
        setForm(current => ({ ...current, [key]: value }));
    };

    const handleNameChange = (value: string) => {
        setForm(current => ({
            ...current,
            name: value,
            // Auto-generate the slug from the name while typing, unless the user
            // has manually edited the slug field.
            ...(!slugTouched ? { slug: slugify(value) } : {}),
        }));
    };

    const handleSubmit = () => {
        const name = form.name.trim();
        if (!name) {
            setError('Category name is required.');
            return;
        }
        if (!form.slug.trim()) {
            setError('Slug is required.');
            return;
        }

        onSave({
            ...form,
            id: form.id || form.slug || 'new-category',
            name,
            slug: form.slug.trim(),
            metaTitle: form.metaTitle || name,
            metaDescription: form.metaDescription || form.description,
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-border bg-card p-5 shadow-lift md:p-6">
                <div className="mb-5 flex items-center justify-between gap-3">
                    <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
                            Category
                        </p>
                        <h3 className="mt-1 font-display text-[26px] font-extrabold text-foreground">
                            Create Category
                        </h3>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close modal"
                        className="rounded-full border border-border p-2 text-muted-foreground hover:bg-muted"
                    >
                        ×
                    </button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <label className="block text-[13px] font-semibold text-foreground">
                        <span className="mb-2 block">Category Name</span>
                        <input
                            value={form.name}
                            onChange={event => handleNameChange(event.target.value)}
                            className="h-11 w-full rounded-xl border border-border bg-background px-3 text-[14px] text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        />
                    </label>
                    <label className="block text-[13px] font-semibold text-foreground">
                        <span className="mb-2 block">Slug</span>
                        <input
                            value={form.slug}
                            onChange={event => {
                                setSlugTouched(true);
                                updateField('slug', event.target.value);
                            }}
                            className="h-11 w-full rounded-xl border border-border bg-background px-3 text-[14px] text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        />
                    </label>
                    <label className="block text-[13px] font-semibold text-foreground md:col-span-2">
                        <span className="mb-2 block">Description</span>
                        <textarea
                            value={form.description}
                            onChange={event => updateField('description', event.target.value)}
                            className="min-h-24 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-[14px] text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        />
                    </label>
                    <div className="md:col-span-2">
                        <MediaPicker
                            label="Category Image"
                            value={form.image}
                            onChange={url => updateField('image', url)}
                            allMedia={allMedia}
                            onUpload={onUploadMedia}
                            helpText="Select an image from the Media Library or upload a new one"
                        />
                    </div>
                    <label className="flex items-center gap-2 text-[13px] font-semibold text-foreground">
                        <input
                            type="checkbox"
                            checked={form.status}
                            onChange={event => updateField('status', event.target.checked)}
                            className="h-4 w-4 rounded border-border text-primary"
                        />
                        Status
                    </label>
                    <label className="block text-[13px] font-semibold text-foreground">
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
                    <label className="flex items-center gap-2 text-[13px] font-semibold text-foreground">
                        <input
                            type="checkbox"
                            checked={form.featured}
                            onChange={event => updateField('featured', event.target.checked)}
                            className="h-4 w-4 rounded border-border text-primary"
                        />
                        Featured
                    </label>
                    <label className="block text-[13px] font-semibold text-foreground md:col-span-2">
                        <span className="mb-2 block">Meta Title</span>
                        <input
                            value={form.metaTitle}
                            onChange={event => updateField('metaTitle', event.target.value)}
                            className="h-11 w-full rounded-xl border border-border bg-background px-3 text-[14px] text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        />
                    </label>
                    <label className="block text-[13px] font-semibold text-foreground md:col-span-2">
                        <span className="mb-2 block">Meta Description</span>
                        <textarea
                            value={form.metaDescription}
                            onChange={event => updateField('metaDescription', event.target.value)}
                            className="min-h-22 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-[14px] text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        />
                    </label>
                </div>
                {error && <p className="mt-4 text-[13px] font-medium text-rose-600">{error}</p>}
                <div className="mt-6 flex justify-end gap-3">
                    <Button type="button" variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="button" onClick={handleSubmit}>
                        Create Category
                    </Button>
                </div>
            </div>
        </div>
    );
}
