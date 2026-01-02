import Container from '@/components/Container'
import React from 'react'

const ProductDetailSkeleton = () => {
  return (
    <Container className='py-5 md:py-10 flex flex-col md:flex-row gap-5 md:gap-10'>
      <div className="animate-pulse w-full md:w-1/2 space-y-2 md:space-y-4">
        <div className="relative w-full max-h-[550px] min-h-[450px] bg-gray-200 rounded-md overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
        </div>

        <div className='grid grid-cols-6 gap-2 h-20 md:h-28'>
          {[...Array(6)].map((_, i) => (
            <div key={i} className="relative bg-gray-200 rounded-md overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
            </div>
          ))}
        </div>
      </div>

      <div className="w-full md:w-1/2 flex flex-col gap-3 md:gap-5">
        <div className="space-y-3">
          <div className="relative h-8 md:h-10 bg-gray-200 rounded w-3/4 overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          </div>

          <div className="relative h-6 md:h-7 bg-gray-200 rounded w-1/4 overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          </div>
        </div>

        <div className="relative h-5 bg-gray-200 rounded w-20 md:w-24 overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
        </div>

        <div className="space-y-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="relative h-4 bg-gray-200 rounded overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
            </div>
          ))}
        </div>

        <div className="flex gap-2 md:gap-2.5 lg:gap-5">
          <div className="relative flex-1 h-10 md:h-12 bg-gray-200 rounded-md overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          </div>
          <div className="relative h-10 md:h-12 w-10 md:w-12 bg-gray-200 rounded-md overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
          </div>
        </div>

        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="relative h-4 bg-gray-200 rounded overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:flex gap-2 md:gap-2.5 border-b border-b-gray-200 py-3 md:py-5">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="relative h-5 bg-gray-200 rounded w-20 overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-3 md:gap-5">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="relative flex-1 h-20 bg-gray-200 rounded-md overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
            </div>
          ))}
        </div>
      </div>
    </Container>
  )
}

export default ProductDetailSkeleton
