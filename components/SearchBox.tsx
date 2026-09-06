'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Search, SearchX, Store as StoreIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { CouponModal } from '@/components/CouponSection';
import PATHS from '@/routes/path';
import type { PublicCategory } from '@/utils/api/category';
import type { PublicCoupon, PublicStoreRef } from '@/utils/api/coupon';
import type { SearchCoupon } from '@/utils/api/search';
import { useGetPublicCategories } from '@/utils/hooks/category';
import { useGetPublicCoupons } from '@/utils/hooks/coupon';
import { useGetSearchResults } from '@/utils/hooks/search';
import { useGetPublicStores } from '@/utils/hooks/store';

const MAX_ITEMS = 5; // Item cap displayed per section in the popup.
const VIEW_ALL_MIN = 5; // Show "View All" when a section has at least this many items.
const DEBOUNCE_MS = 300;

// A store shown in the popup comes from multiple shapes. Feeds (list API "recommended"
// items and /api/v1/search stores) both expose id/name/slug plus either `logo` or `image`.
type StoreView = { id: number; name: string; slug: string; logo?: string; image?: string };

// Normalise the flat search coupon (store_name/store_slug/...) into the nested
// PublicCoupon shape the rest of the app (CouponModal/rows) expects.
function searchCouponToPublic(c: SearchCoupon): PublicCoupon {
    return {
        id: c.id,
        title: c.title || c.name || '',
        slug: c.slug,
        code: c.code ?? null,
        affiliate_url: c.affiliate_url,
        discount_type: c.discount_type,
        discount_value: c.discount_value,
        currency: c.currency,
        expires_at: c.expires_at,
        short_description: '',
        store: {
            id: c.store_id ?? c.id,
            name: c.store_name || '',
            slug: c.store_slug || '',
            logo: c.store_image || undefined,
        },
    } as PublicCoupon;
}

export interface SearchBoxProps {
    /** Compact layout used inside the mobile menu. */
    compact?: boolean;
    /** Extra classes applied to the wrapper (used to constrain the popup width). */
    className?: string;
}

export function SearchBox({ compact = false, className = '' }: SearchBoxProps) {
    const pathname = usePathname();

    const [query, setQuery] = useState('');
    const [debounced, setDebounced] = useState('');
    const [open, setOpen] = useState(false);
    const [selectedCoupon, setSelectedCoupon] = useState<PublicCoupon | null>(null);
    const [prevPathname, setPrevPathname] = useState(pathname);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Close the popup whenever the route changes. React's recommended way to
    // adjust state in response to a changing prop is to do it while rendering,
    // comparing against the previous value (instead of an effect + setState).
    if (prevPathname !== pathname) {
        setPrevPathname(pathname);
        setOpen(false);
    }

    const trimmed = query.trim();

    // Debounce the typed query so /api/v1/search is only hit after a short pause.
    useEffect(() => {
        const timer = setTimeout(() => setDebounced(trimmed), DEBOUNCE_MS);
        return () => clearTimeout(timer);
    }, [trimmed]);

    const isSearching = debounced.length > 0;

    // Close the popup on an outside click or the Escape key.
    useEffect(() => {
        if (!open) return;
        function handlePointerDown(e: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === 'Escape') setOpen(false);
        }
        document.addEventListener('mousedown', handlePointerDown);
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('mousedown', handlePointerDown);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [open]);

    // --- "Recommended" state: use the existing list APIs. ---
    const storesQ = useGetPublicStores({ page: 1, limit: MAX_ITEMS });
    const couponsQ = useGetPublicCoupons({ page: 1, limit: MAX_ITEMS });
    const categoriesQ = useGetPublicCategories(1, MAX_ITEMS);
    const suggestionLoading = storesQ.isLoading || couponsQ.isLoading || categoriesQ.isLoading;
    const suggestionStores = (storesQ.data?.data?.data ?? []) as StoreView[];
    const suggestionCoupons = (couponsQ.data?.data?.data ?? []) as PublicCoupon[];
    const suggestionCategories = (categoriesQ.data?.data?.data ?? []) as PublicCategory[];

    // --- Typed state: query the search API. ---
    const searchQ = useGetSearchResults(debounced);
    const searchStores = (searchQ.data?.data?.data?.stores ?? []) as StoreView[];
    const searchCoupons = (searchQ.data?.data?.data?.coupons ?? []).map(searchCouponToPublic);
    const searchCategories = (searchQ.data?.data?.data?.categories ?? []) as PublicCategory[];

    const rawStore = isSearching ? searchStores : suggestionStores;
    const rawCoupon = isSearching ? searchCoupons : suggestionCoupons;
    const rawCategory = isSearching ? searchCategories : suggestionCategories;

    const stores = rawStore.slice(0, MAX_ITEMS);
    const coupons = rawCoupon.slice(0, MAX_ITEMS);
    const categories = rawCategory.slice(0, MAX_ITEMS);

    const hasAny = stores.length > 0 || coupons.length > 0 || categories.length > 0;
    const loading = isSearching ? searchQ.isFetching : suggestionLoading;
    const showEmpty = !loading && !hasAny;

    const closePopup = () => setOpen(false);

    const listboxId = compact ? 'search-results-listbox-mobile' : 'search-results-listbox';

    return (
        <div ref={wrapperRef} className={`relative w-full ${className}`}>
            <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle-foreground" />
                <input
                    type="search"
                    role="combobox"
                    aria-expanded={open}
                    aria-haspopup="listbox"
                    aria-controls={open ? listboxId : undefined}
                    aria-autocomplete="list"
                    aria-label="Search coupons and stores"
                    value={query}
                    onChange={e => {
                        setQuery(e.target.value);
                        setOpen(true);
                    }}
                    onFocus={() => setOpen(true)}
                    placeholder={
                        compact
                            ? 'Search coupons, stores...'
                            : 'Search for stores & offers or coupon'
                    }
                    className={`w-full border border-border bg-background pl-9 pr-3 text-foreground outline-none transition-all placeholder:text-subtle-foreground rounded-sm focus:border-primary ${
                        compact ? 'h-10 text-sm' : 'h-11 text-base'
                    }`}
                />
            </div>

            {/* Dropdown-style search results (NOT a centred modal). */}
            {open && (
                <div
                    id={listboxId}
                    role="listbox"
                    aria-label="Search results"
                    className="absolute left-0 right-0 top-full z-60 mt-2 max-h-[min(560px,72vh)] overflow-y-auto rounded-xl border border-border bg-card shadow-lift"
                >
                    {loading && !hasAny && (
                        <div className="space-y-3 p-4">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <span className="h-8 w-8 animate-pulse rounded-md bg-muted" />
                                    <div className="flex-1 space-y-1.5">
                                        <div className="h-3 w-3/4 animate-pulse rounded bg-muted" />
                                        <div className="h-2.5 w-1/2 animate-pulse rounded bg-muted" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {showEmpty && (
                        <div className="flex flex-col items-center gap-1.5 px-6 py-10 text-center">
                            <span className="text-subtle-foreground">
                                {isSearching ? (
                                    <SearchX className="h-6 w-6" />
                                ) : (
                                    <StoreIcon className="h-6 w-6" />
                                )}
                            </span>
                            {isSearching && (
                                <p className="text-[14px] font-semibold text-foreground">
                                    No results for “{debounced}”
                                </p>
                            )}
                            <p className="max-w-60 text-[12.5px] text-muted-foreground">
                                {isSearching
                                    ? 'Try different keywords like a store or brand name.'
                                    : 'Start typing to discover coupons, stores and categories.'}
                            </p>
                        </div>
                    )}

                    {hasAny && (
                        <div className="py-1.5">
                            {stores.length > 0 && (
                                <Section
                                    title="Stores"
                                    count={rawStore.length}
                                    viewHref={PATHS.stores}
                                >
                                    <ul className="divide-y divide-border/60 border-y border-border/60 px-2">
                                        {stores.map(store => (
                                            <StoreRow
                                                key={store.id}
                                                store={store}
                                                onClose={closePopup}
                                            />
                                        ))}
                                    </ul>
                                </Section>
                            )}

                            {coupons.length > 0 && (
                                <Section
                                    title="Coupons"
                                    count={rawCoupon.length}
                                    viewHref={PATHS.coupons}
                                >
                                    <ul className="divide-y divide-border/60 border-y border-border/60 px-2">
                                        {coupons.map(coupon => (
                                            <CouponRow
                                                key={coupon.id}
                                                coupon={coupon}
                                                onSelect={() => {
                                                    setSelectedCoupon(coupon);
                                                    closePopup();
                                                }}
                                            />
                                        ))}
                                    </ul>
                                </Section>
                            )}

                            {categories.length > 0 && (
                                <Section
                                    title="Categories"
                                    count={rawCategory.length}
                                    viewHref={PATHS.categories}
                                >
                                    <ul className="grid grid-cols-2 gap-2 px-4 py-3 sm:grid-cols-3">
                                        {categories.map(cat => (
                                            <CategoryChip
                                                key={cat.id}
                                                category={cat}
                                                onClose={closePopup}
                                            />
                                        ))}
                                    </ul>
                                </Section>
                            )}
                        </div>
                    )}
                </div>
            )}

            <CouponModal coupon={selectedCoupon} onClose={() => setSelectedCoupon(null)} />
        </div>
    );
}

export default SearchBox;

/* ------------------------------- Section header ------------------------------- */

function Section({
    title,
    count,
    viewHref,
    children,
}: {
    title: string;
    count: number;
    viewHref: string;
    children: React.ReactNode;
}) {
    return (
        <div role="group" aria-label={title}>
            <div className="flex items-center justify-between px-4 pb-1.5 pt-3">
                <h4 className="font-display text-[12px] font-bold uppercase tracking-wide text-muted-foreground">
                    {title}
                </h4>
                {count >= VIEW_ALL_MIN && (
                    <Link
                        href={viewHref}
                        className="text-[12px] font-bold text-primary transition-colors hover:text-primary-hover"
                    >
                        View All
                    </Link>
                )}
            </div>
            {children}
        </div>
    );
}

/* ----------------------------------- Rows ------------------------------------ */

function StoreRow({ store, onClose }: { store: StoreView; onClose: () => void }) {
    const logo = store.logo || store.image;
    const href = `${PATHS.stores}/${encodeURIComponent(store.slug)}?store_id=${store.id}`;
    return (
        <li>
            <Link
                href={href}
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-2.5 transition-colors hover:bg-surface"
            >
                {logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={logo}
                        alt={`${store.name} logo`}
                        className="h-9 w-9 shrink-0 rounded-lg border border-border bg-card object-contain p-1"
                    />
                ) : (
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border bg-card text-sm font-semibold text-muted-foreground">
                        {store.name?.charAt(0).toUpperCase() || 'S'}
                    </span>
                )}
                <span className="min-w-0 flex-1">
                    <span className="block truncate text-[14px] font-semibold text-foreground">
                        {store.name}
                    </span>
                </span>
            </Link>
        </li>
    );
}

function CouponRow({ coupon, onSelect }: { coupon: PublicCoupon; onSelect: () => void }) {
    // Store-style row: brand image on the left, store name + coupon title on the right.
    const store = (coupon.store ?? undefined) as (PublicStoreRef & { logo?: string }) | undefined;
    const logo = store?.logo;
    const storeName = store?.name || 'Store';
    return (
        <li>
            <button
                type="button"
                onClick={onSelect}
                className="group flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-surface"
            >
                {logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={logo}
                        alt={`${storeName} logo`}
                        className="h-9 w-9 shrink-0 rounded-lg border border-border bg-card object-contain p-1"
                    />
                ) : (
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border bg-card text-sm font-semibold text-muted-foreground">
                        {storeName.charAt(0).toUpperCase() || 'C'}
                    </span>
                )}
                <span className="min-w-0 flex-1">
                    <span className="block truncate text-[12.5px] font-medium text-muted-foreground group-hover:text-primary">
                        {storeName}
                    </span>
                    <span className="block truncate text-[14px] font-semibold text-foreground group-hover:text-primary transition-colors">
                        {coupon.title}
                    </span>
                </span>
            </button>
        </li>
    );
}

function CategoryChip({ category, onClose }: { category: PublicCategory; onClose: () => void }) {
    const href = `${PATHS.categories}/${encodeURIComponent(category.slug)}?category_id=${category.id}`;
    return (
        <li>
            <Link
                href={href}
                onClick={onClose}
                className="flex w-full items-center justify-center rounded-md border border-border bg-background px-2.5 py-2 text-[13px] font-semibold text-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
                <span className="wrap-break-word text-center leading-snug">{category.name}</span>
            </Link>
        </li>
    );
}
