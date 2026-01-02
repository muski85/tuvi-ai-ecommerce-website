import {Product} from '@/sanity.types';
import React from 'react'
import {urlFor} from '@/sanity/lib/image';
import Link from 'next/link';
import Image from 'next/image';
import PriceView from './PriceView';
import AddToCartButton from './AddToCartButton';

const ProductCard = ({product}:{product:Product}) => {
  return (
  <div className='group text-xs md:text-sm rounded-lg overflow-hidden h-full flex flex-col'>
    <div className='bg-gradient-to-r from-zinc-200 via-zinc-300 to-zinc-200 overflow-hidden relative'>
      {product?.images && (
        <Link href={`/product/${product?.slug?.current}`}>
          <Image src={urlFor(product?.images[0]).width(800).height(1000).url()}
            width={500}
            height={500}
            alt="productImage"
            priority
            className={`w-full h-40 sm:h-48 md:h-56 lg:h-72 object-contain overflow-hidden hoverEffect
                ${product?.stock !== 0 && "group-hover:scale-105"}`}
            />
      </Link>
       )}
       {product?.stock === 0 && <div className='absolute top-0 left-0 w-full h-full bg-darkColor/50 flex items-center justify-center'>
       <p className='text-sm md:text-xl text-white font-semibold text-center px-2'>Out of Stock</p>
       </div>
}
    </div>
       <div className='py-2 md:py-3 px-2 md:px-3 flex flex-col gap-1 md:gap-1.5 bg-zinc-50 border border-t-0 rounded-lg rounded-tl-none rounded-tr-none flex-1'>
          <h2 className='font-semibold line-clamp-1 text-sm md:text-base'>{product?.name}</h2>
          <p className='text-xs md:text-sm text-gray-600 line-clamp-2 md:line-clamp-none'>{product?.intro}</p>
          <PriceView price={product?.price} discount={product?.discount} />
          <AddToCartButton product={product}/>
       </div>
  </div>
  );
  
};

export default ProductCard