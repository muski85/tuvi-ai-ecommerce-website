import AddToCartButton from '@/components/AddToCartButton';
import AnimatedHeart from '@/components/AnimatedHeart';
import Container from '@/components/Container'
import ImageView from '@/components/ImageView';
import PriceView from '@/components/PriceView';
import ProductCharacteristics from '@/components/ProductCharacteristics';
import { getProductBySlug } from '@/sanity/lib/helpers/queries';
import { BoxIcon, FileQuestion,ListOrderedIcon, Share } from 'lucide-react';
import { notFound } from 'next/navigation';
import React from 'react'

const SingleProductPage = async({
  params,
  }: {
    params:Promise<{slug:string}>
  }) => {
    const {slug} = await params;
    const product = await getProductBySlug(slug);
    if (!product) {
      return notFound()
    }


  return (
      <Container className='py-5 md:py-10 flex flex-col md:flex-row gap-5 md:gap-10'>
        {product?.images && <ImageView images={product?.images} />}
        <div className="w-full md:w-1/2 flex flex-col gap-3 md:gap-5">
          <div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
            {product?.name}
          </h2>
          <PriceView
            price={product?.price}
            discount={product?.discount}
            className='text-base md:text-lg font-bold'

          />
          </div>
          {product?.stock && <p className='bg-green-100 w-20 md:w-24 text-center text-green-600 text-xs md:text-sm py-2 md:py-2.5 font-semibold rounded-lg'>
            In Stock
            </p>}
            <p className='text-xs md:text-sm text-gray-600 tracking-wide leading-relaxed'>
              {product?.description}
            </p>
            <div className='flex items-center gap-2 md:gap-2.5 lg:gap-5 w-full'>
              <AddToCartButton
              product={product}
              className='bg-darkColor/80 text-white hover:bg-darkColor hoverEffect text-sm md:text-base'

              />
                <div className='border-2 border-darkColor/30 text-darkColor/60 px-0 py-0 rounded-md hover:textdarkColor hover:border-darkColor hoverEffect shrink-0'>
                <AnimatedHeart/>
                </div>

            </div>
            <ProductCharacteristics product={product} />
            <div className='grid grid-cols-2 md:flex md:flex-wrap items-center justify-between gap-2 md:gap-2.5 border-b border-b-gray-200 py-3 md:py-5 -mt-2'>
              <div className='flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-black hover:text-red-600 hoverEffect'>
                <BoxIcon className='w-4 h-4 md:w-5 md:h-5'/>
                <p>Compare</p>

              </div>
              <div className='flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-black hover:text-red-600 hoverEffect'>
                <FileQuestion className='w-4 h-4 md:w-5 md:h-5'/>
                <p>Question</p>

              </div>
              <div className='flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-black hover:text-red-600 hoverEffect'>
                <ListOrderedIcon className='w-4 h-4 md:w-5 md:h-5'/>
                <p>Delivery</p>

              </div>
              <div className='flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-black hover:text-red-600 hoverEffect'>
                <Share className='w-4 h-4 md:w-5 md:h-5'/>
                <p>Share</p>
              </div>
            </div>
            <div className='flex flex-col md:flex-row flex-wrap items-stretch gap-3 md:gap-5'>
              <div className='flex-1 border border-darkBlue/20 text-center p-3 hover:border-darkBlue rounded-md hoverEffect'>
                <p className='text-sm md:text-base font-semibold text-darkColor'>Free Shipping</p>
                <p className='text-xs md:text-sm text-gray-500'>Free over $120</p>
              </div>
              <div className='flex-1 border border-darkBlue/20 text-center p-3 hover:border-darkBlue rounded-md hoverEffect'>
                <p className='text-sm md:text-base font-semibold text-darkColor'>Flexible Pay</p>
                <p className='text-xs md:text-sm text-gray-500'>Multiple Cards</p>
              </div>
            </div>
        </div>
      </Container>
  )
}

export default SingleProductPage