'use client';

import { CloudUpload, X } from 'lucide-react';
import { useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import type { MediaRecord } from '@/utils/admin-data';
import { useUploadMedia } from '@/utils/hooks/media';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export function MediaUploadModal({
    open,
    onClose,
    onUpload,
}: {
    open: boolean;
    onClose: () => void;
    onUpload: (media: MediaRecord[]) => void;
}) {
    const [files, setFiles] = useState<File[]>([]);
    const [altText, setAltText] = useState('');
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [progress, setProgress] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const dragRef = useRef<HTMLDivElement>(null);
    const { mutateAsync } = useUploadMedia();

    const validateFile = (file: File): string | null => {
        if (!ALLOWED_TYPES.includes(file.type)) {
            return `${file.name} is not a valid image format. Supported formats: JPEG, PNG, WebP, GIF.`;
        }
        if (file.size > MAX_FILE_SIZE) {
            return `${file.name} is too large. Maximum size is 5MB.`;
        }
        return null;
    };

    const handleFiles = (newFiles: FileList) => {
        setError('');
        const fileArray = Array.from(newFiles);
        const invalidFile = fileArray.find(f => validateFile(f));

        if (invalidFile) {
            setError(validateFile(invalidFile)!);
            return;
        }

        setFiles(prev => [...prev, ...fileArray]);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (dragRef.current) {
            dragRef.current.classList.add('border-primary', 'bg-primary-light/20');
        }
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (dragRef.current) {
            dragRef.current.classList.remove('border-primary', 'bg-primary-light/20');
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (dragRef.current) {
            dragRef.current.classList.remove('border-primary', 'bg-primary-light/20');
        }
        handleFiles(e.dataTransfer.files);
    };

    const handleUpload = async () => {
        if (files.length === 0) {
            setError('No files selected');
            return;
        }

        setUploading(true);
        setError('');
        setProgress(0);

        try {
            const uploadedMedia: MediaRecord[] = [];

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                setProgress(Math.round(((i + 1) / files.length) * 100));

                const response = await mutateAsync({ file, altText: altText || undefined });
                const uploadedItem = ((response as { data?: unknown })?.data ??
                    response ??
                    {}) as Record<string, any>;

                const newMedia: MediaRecord = {
                    id: String(uploadedItem?.id ?? (uploadedItem?.file_path || 'media-upload')),
                    fileName: String(uploadedItem?.name ?? file.name),
                    url: String(
                        uploadedItem?.file_path
                            ? uploadedItem.file_path
                            : (uploadedItem?.url ?? URL.createObjectURL(file)),
                    ),
                    mimeType: String(uploadedItem?.mime_type ?? file.type),
                    fileSize: Number(uploadedItem?.file_size ?? file.size),
                    width: Number(uploadedItem?.width ?? 0),
                    height: Number(uploadedItem?.height ?? 0),
                    altText: String(uploadedItem?.alt_text ?? altText ?? ''),
                    uploadedBy: String(uploadedItem?.uploaded_by ?? 'admin'),
                    createdAt: String(uploadedItem?.created_at ?? new Date().toISOString()),
                    updatedAt: String(uploadedItem?.updated_at ?? new Date().toISOString()),
                    usedBy: Array.isArray(uploadedItem?.used_by) ? uploadedItem.used_by : [],
                };

                uploadedMedia.push(newMedia);
            }

            setUploading(false);
            onUpload(uploadedMedia);
            setFiles([]);
            setAltText('');
            setProgress(0);
            onClose();
        } catch (uploadError) {
            setUploading(false);
            setProgress(0);
            const message =
                uploadError && typeof uploadError === 'object' && 'response' in uploadError
                    ? (uploadError as { response?: { data?: { message?: string } } }).response?.data
                          ?.message || 'Upload failed.'
                    : 'Upload failed.';
            setError(String(message));
        }
    };

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
            <div className="w-full max-w-2xl rounded-3xl border border-border bg-card p-6 shadow-lift">
                <div className="mb-5 flex items-center justify-between">
                    <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
                            Upload
                        </p>
                        <h3 className="mt-1 font-display text-[26px] font-extrabold text-foreground">
                            Upload Media
                        </h3>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full border border-border p-2 text-muted-foreground hover:bg-muted"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Drag & Drop Area */}
                <div
                    ref={dragRef}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className="rounded-2xl border-2 border-dashed border-border bg-surface p-8 text-center transition-all"
                >
                    <CloudUpload className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-3 font-semibold text-foreground">
                        Drag and drop your images here
                    </h3>
                    <p className="mt-2 text-[14px] text-muted-foreground">
                        or{' '}
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="font-semibold text-primary hover:underline"
                        >
                            click to browse
                        </button>
                    </p>
                    <p className="mt-2 text-[12px] text-muted-foreground">
                        Supported formats: JPEG, PNG, WebP, GIF (Max 5MB per file)
                    </p>
                    <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept={ALLOWED_TYPES.join(',')}
                        onChange={e => handleFiles(e.target.files!)}
                        className="hidden"
                    />
                </div>

                <div className="mt-5">
                    <label className="block text-[13px] font-semibold text-foreground">
                        <span className="mb-2 block">Alt text (optional)</span>
                        <input
                            value={altText}
                            onChange={event => setAltText(event.target.value)}
                            placeholder="e.g. Product image"
                            className="h-11 w-full rounded-xl border border-border bg-background px-3 text-[14px] text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        />
                    </label>
                </div>

                {/* Error Message */}
                {error && <p className="mt-4 text-[13px] font-medium text-rose-600">{error}</p>}

                {/* Selected Files */}
                {files.length > 0 && (
                    <div className="mt-5">
                        <p className="text-[13px] font-semibold text-foreground">
                            Selected files ({files.length})
                        </p>
                        <div className="mt-3 space-y-2 max-h-48 overflow-y-auto">
                            {files.map((file, index) => (
                                <div
                                    key={`${file.name}-${index}`}
                                    className="flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-3"
                                >
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-[13px] font-medium text-foreground">
                                            {file.name}
                                        </p>
                                        <p className="text-[12px] text-muted-foreground">
                                            {(file.size / 1024).toFixed(1)} KB
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeFile(index)}
                                        disabled={uploading}
                                        className="ml-2 rounded p-1 text-muted-foreground hover:bg-muted disabled:opacity-50"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Upload Progress */}
                {uploading && (
                    <div className="mt-5">
                        <div className="flex items-center justify-between text-[13px]">
                            <span className="font-medium text-foreground">Uploading...</span>
                            <span className="text-muted-foreground">{progress}%</span>
                        </div>
                        <div className="mt-2 h-2 rounded-full border border-border bg-surface overflow-hidden">
                            <div
                                className="h-full bg-primary transition-all"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div className="mt-6 flex justify-end gap-3">
                    <Button type="button" variant="outline" onClick={onClose} disabled={uploading}>
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        onClick={handleUpload}
                        disabled={files.length === 0 || uploading}
                    >
                        {uploading
                            ? `Uploading... ${progress}%`
                            : `Upload ${files.length} file${files.length !== 1 ? 's' : ''}`}
                    </Button>
                </div>
            </div>
        </div>
    );
}
