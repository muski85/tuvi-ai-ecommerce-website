import React from 'react'

const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm">
      <div className="animate-pulse">
        {/* Image Skeleton with Shimmer */}
        <div className="relative w-full aspect-square bg-gray-200 overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
        </div>
        
        {/* Content Skeleton */}
        <div className="p-4 space-y-3">
          {/* Category */}
          <div className="relative h-3 bg-gray-200 rounded w-1/4 overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          </div>
          
          {/* Title */}
          <div className="relative h-4 bg-gray-200 rounded w-3/4 overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          </div>
          
          {/* Description Lines */}
          <div className="space-y-2">
            <div className="relative h-3 bg-gray-200 rounded w-full overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
            </div>
            <div className="relative h-3 bg-gray-200 rounded w-5/6 overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
            </div>
          </div>
          
          {/* Price */}
          <div className="flex items-center gap-2 pt-2">
            <div className="relative h-5 bg-gray-200 rounded w-1/4 overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
            </div>
            <div className="relative h-4 bg-gray-200 rounded w-1/5 overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
            </div>
          </div>
          
          {/* Button */}
          <div className="relative h-10 bg-gray-200 rounded-md w-full overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCardSkeleton;