import { cn } from '@/lib/utils'

export function Skeleton({ className }: { className?: string }) {
    return (
        <div className={cn('animate-pulse rounded-md bg-muted', className)} />
    )
}

export function CardSkeleton() {
    return (
        <div className="rounded-lg border bg-card p-4">
            <Skeleton className="h-5 w-1/3 mb-2" />
            <Skeleton className="h-4 w-1/2" />
        </div>
    )
}

export function ScreenshotSkeleton() {
    return (
        <div className="rounded-lg border bg-card overflow-hidden">
            <div className="p-3 border-b">
                <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-64 w-full" />
        </div>
    )
}
