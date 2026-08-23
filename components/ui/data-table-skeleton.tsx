interface DataTableSkeletonProps {
    columns: number;
    rows?: number;
}

export function DataTableSkeleton({
    columns,
    rows = 5,
}: DataTableSkeletonProps) {
    return (
        <div className="w-full">
            {/* Header */}
            <div className="grid grid-cols-[repeat(auto-fit,minmax(0,1fr))] gap-4 p-4 border-b">
                {Array.from({ length: columns }).map((_, i) => (
                    <div
                        key={`header-${i}`}
                        className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
                    />
                ))}
            </div>

            {/* Rows */}
            {Array.from({ length: rows }).map((_, rowIndex) => (
                <div
                    key={`row-${rowIndex}`}
                    className="grid grid-cols-[repeat(auto-fit,minmax(0,1fr))] gap-4 p-4 border-b"
                >
                    {Array.from({ length: columns }).map((_, colIndex) => (
                        <div
                            key={`cell-${rowIndex}-${colIndex}`}
                            className="h-4 bg-gray-100 dark:bg-gray-800 rounded animate-pulse"
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}
