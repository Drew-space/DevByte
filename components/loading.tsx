import { Skeleton } from "@/components/ui/skeleton";

export default function PostCardSkeleton() {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md">
      {/* Image for the  skeleton */}
      <Skeleton className="h-36 sm:h-48 w-full" />

      <div className="p-3 sm:p-4 space-y-2">
        {/* Title for the skeleton */}
        <Skeleton className="h-4 sm:h-5 w-3/4" />

        {/* Contentfor the  skeleton */}
        <Skeleton className="h-3 sm:h-4 w-full" />
        <Skeleton className="h-3 sm:h-4 w-5/6" />

        {/* Author + Date */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* Avatar skeleton */}
            <Skeleton className="size-6 sm:size-8 rounded-full" />

            {/* Name for the skeleton */}
            <Skeleton className="h-3 sm:h-4 w-16 sm:w-24 rounded" />
          </div>

          {/* Date for the skeleton */}
          <Skeleton className="h-2 sm:h-3 w-12 sm:w-16 rounded" />
        </div>
      </div>
    </div>
  );
}
