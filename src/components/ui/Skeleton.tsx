interface SkeletonProps {
  className?: string;
}

/** A single pulsing placeholder block. Compose these to build skeleton layouts. */
export function Skeleton({ className = '' }: SkeletonProps) {
  return <div className={`animate-pulse rounded-md bg-gray-200 ${className}`} />;
}

export function ProductCardSkeleton() {
  return (
    <div className="rounded-card bg-white shadow-card overflow-hidden">
      <Skeleton className="h-36 w-full rounded-none" />
      <div className="p-3 space-y-2">
        <Skeleton className="h-3 w-1/3" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-3 w-2/5" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-64 w-full rounded-card" />
      <Skeleton className="h-3 w-1/4" />
      <Skeleton className="h-6 w-2/3" />
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-20 w-full rounded-card" />
      <Skeleton className="h-20 w-full rounded-card" />
    </div>
  );
}

export function EmiPlanRowsSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton key={i} className="h-16 w-full rounded-card" />
      ))}
    </div>
  );
}
