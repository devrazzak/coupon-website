interface CouponCardSkeletonProps {
    rows?: number;
}

// Skeleton placeholder for coupon rows, matching the coupon row layout.
export function CouponCardSkeleton({ rows = 5 }: CouponCardSkeletonProps) {
    return (
        <div aria-hidden="true">
            {Array.from({ length: rows }).map((_, i) => (
                <div
                    key={i}
                    className="flex animate-pulse flex-col gap-4 border-b border-border/70 px-5 py-4 last:border-b-0 md:flex-row md:items-center md:gap-6"
                >
                    <div className="flex items-center gap-3.5 md:w-[130px] md:shrink-0 md:flex-col md:items-start md:gap-2">
                        <div className="h-14 w-28 rounded-lg bg-muted" />
                        <div className="h-5 w-20 rounded-md bg-muted" />
                    </div>
                    <div className="min-w-0 flex-1 space-y-2.5">
                        <div className="h-2.5 w-32 rounded bg-muted" />
                        <div className="h-4 w-3/4 rounded bg-muted" />
                        <div className="h-3 w-1/2 rounded bg-muted" />
                        <div className="h-2.5 w-40 rounded bg-muted" />
                    </div>
                    <div className="md:w-[220px] md:shrink-0">
                        <div className="h-12 w-full rounded-xl bg-muted" />
                    </div>
                </div>
            ))}
        </div>
    );
}
