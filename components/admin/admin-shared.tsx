'use client';

import { AlertTriangle, Check, Eye, Search, Trash2, X } from 'lucide-react';
import { type ReactNode } from 'react';

import { Button } from '@/components/ui/button';

export function StatusBadge({ status }: { status: string }) {
    const classes: Record<string, string> = {
        active: 'border border-emerald-200 bg-emerald-50 text-emerald-700',
        inactive: 'border border-slate-200 bg-slate-100 text-slate-600',
        draft: 'border border-amber-200 bg-amber-50 text-amber-700',
        published: 'border border-emerald-200 bg-emerald-50 text-emerald-700',
        expired: 'border border-rose-200 bg-rose-50 text-rose-700',
        featured: 'border border-primary/20 bg-primary-light text-primary',
    };

    const label =
        status === 'active' || status === 'published'
            ? 'Active'
            : status === 'inactive'
              ? 'Inactive'
              : status === 'draft'
                ? 'Draft'
                : status === 'expired'
                  ? 'Expired'
                  : 'Featured';

    return (
        <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.08em] ${classes[status] ?? classes.inactive}`}
        >
            {label}
        </span>
    );
}

export function SearchInput({
    value,
    onChange,
    placeholder = 'Search...',
}: {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}) {
    return (
        <label className="relative block min-w-0 flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
                value={value}
                onChange={event => onChange(event.target.value)}
                placeholder={placeholder}
                className="h-11 w-full rounded-full border border-border bg-background pl-10 pr-3 text-[14px] text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
        </label>
    );
}

export function FilterSelect({
    value,
    onChange,
    options,
    placeholder,
}: {
    value: string;
    onChange: (value: string) => void;
    options: { label: string; value: string }[];
    placeholder?: string;
}) {
    return (
        <label className="relative block">
            <select
                value={value}
                onChange={event => onChange(event.target.value)}
                className="h-11 min-w-[150px] rounded-full border border-border bg-background px-3 text-[13px] text-foreground outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/10"
            >
                {placeholder && <option value="">{placeholder}</option>}
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </label>
    );
}

export function AdminPageHeader({
    title,
    subtitle,
    breadcrumb,
    action,
}: {
    title: string;
    subtitle?: string;
    breadcrumb?: string[];
    action?: ReactNode;
}) {
    return (
        <div className="mb-6 flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-end md:justify-between">
            <div>
                {breadcrumb && breadcrumb.length > 0 && (
                    <div className="mb-2 flex flex-wrap items-center gap-2 text-[12px] font-medium text-muted-foreground">
                        {breadcrumb.map((item, index) => (
                            <span
                                key={`${item}-${index}`}
                                className="inline-flex items-center gap-2"
                            >
                                {item}
                                {index < breadcrumb.length - 1 && <span>›</span>}
                            </span>
                        ))}
                    </div>
                )}
                <h1 className="font-display text-[30px] font-extrabold tracking-[-0.04em] text-foreground">
                    {title}
                </h1>
                {subtitle && <p className="mt-2 text-[14px] text-muted-foreground">{subtitle}</p>}
            </div>
            {action && <div className="flex items-center gap-3">{action}</div>}
        </div>
    );
}

export function EmptyState({
    title,
    description,
    action,
}: {
    title: string;
    description: string;
    action?: ReactNode;
}) {
    return (
        <div className="rounded-3xl border border-dashed border-border bg-surface p-10 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-light text-primary">
                <Eye className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-display text-[20px] font-bold text-foreground">{title}</h3>
            <p className="mt-2 text-[14px] text-muted-foreground">{description}</p>
            {action && <div className="mt-5 flex justify-center">{action}</div>}
        </div>
    );
}

export function ConfirmDeleteModal({
    open,
    title,
    description,
    onClose,
    onConfirm,
    confirmLabel = 'Delete',
}: {
    open: boolean;
    title: string;
    description: string;
    onClose: () => void;
    onConfirm: () => void;
    confirmLabel?: string;
}) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
            <div className="w-full max-w-md rounded-3xl border border-border bg-card p-6 shadow-lift">
                <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                        <AlertTriangle className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-display text-[22px] font-bold text-foreground">
                            {title}
                        </h3>
                        <p className="mt-2 text-[14px] leading-6 text-muted-foreground">
                            {description}
                        </p>
                    </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <Button type="button" variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="button" variant="destructive" onClick={onConfirm}>
                        {confirmLabel}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export function Toast({
    message,
    visible,
    onClose,
}: {
    message: string;
    visible: boolean;
    onClose: () => void;
}) {
    if (!visible) return null;

    return (
        <div className="fixed bottom-5 right-5 z-[60] flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 shadow-lift">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-white">
                <Check className="h-4 w-4" />
            </div>
            <span>{message}</span>
            <button
                type="button"
                onClick={onClose}
                className="ml-2 text-emerald-700/80 hover:text-emerald-900"
            >
                <X className="h-4 w-4" />
            </button>
        </div>
    );
}

export function ManageActionButton({
    children,
    variant = 'primary',
    onClick,
    type = 'button',
}: {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
}) {
    const variantClass =
        variant === 'primary'
            ? 'bg-primary text-primary-foreground hover:bg-primary-hover'
            : variant === 'secondary'
              ? 'border border-border bg-background text-foreground hover:bg-muted'
              : variant === 'danger'
                ? 'bg-rose-600 text-white hover:bg-rose-700'
                : 'text-foreground hover:bg-muted';

    return (
        <Button type={type} onClick={onClick} className={variantClass}>
            {children}
        </Button>
    );
}

export function TableWrapper({ children }: { children: ReactNode }) {
    return (
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
            {children}
        </div>
    );
}

export function LabelledInput({
    label,
    value,
    onChange,
    placeholder,
    type = 'text',
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    type?: string;
}) {
    return (
        <label className="block text-[13px] font-semibold text-foreground">
            <span className="mb-2 block">{label}</span>
            <input
                value={value}
                type={type}
                onChange={event => onChange(event.target.value)}
                placeholder={placeholder}
                className="h-11 w-full rounded-xl border border-border bg-background px-3 text-[14px] text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
        </label>
    );
}

export function LabelledArea({
    label,
    value,
    onChange,
    placeholder,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}) {
    return (
        <label className="block text-[13px] font-semibold text-foreground">
            <span className="mb-2 block">{label}</span>
            <textarea
                value={value}
                onChange={event => onChange(event.target.value)}
                placeholder={placeholder}
                className="min-h-[110px] w-full rounded-xl border border-border bg-background px-3 py-2.5 text-[14px] text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
        </label>
    );
}

export function IconBadge({ children }: { children: ReactNode }) {
    return (
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary-light text-primary">
            {children}
        </span>
    );
}

export function TrashIcon() {
    return <Trash2 className="h-4 w-4" />;
}
