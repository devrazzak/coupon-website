interface StoreCardSkeletonProps {
    count?: number;
    horizontal?: boolean;
}

// Skeleton placeholder for store cards, matching the store card layout.
export function StoreCardSkeleton({ count = 8, horizontal = false }: StoreCardSkeletonProps) {
    const containerClass = horizontal
        ? 'flex gap-3 overflow-x-auto pb-3 pt-1'
        : 'grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6';

    return (
        <div className={containerClass} aria-hidden="true">
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className="flex h-40 w-40 shrink-0 animate-pulse flex-col items-center justify-between rounded-xl border border-border bg-card p-3 sm:h-42 sm:w-44 md:w-46"
                >
                    <div className="mb-1 h-24 w-full rounded-md bg-muted" />
                    <div className="flex w-full items-center justify-between border-t border-border/60 pt-2">
                        <div className="h-3 w-12 rounded bg-muted" />
                        <div className="h-3 w-14 rounded bg-muted" />
                    </div>
                </div>
            ))}
        </div>
    );
}
