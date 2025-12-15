"use client"
import { cn } from '@/lib/utils';
import { Product } from '@/sanity.types';
import React from 'react'
import toast from 'react-hot-toast';
import { Button } from './ui/button';
import QuantityButtons from './QuantityButtons';
import PriceFormatter from './PriceFormatter';
import useCartStore from '@/store';
interface Props{
  product: Product;
  className?: string;
}

const AddToCartButton = ({product, className}: Props) => {
  const {addItem, getItemCount} = useCartStore();
  const itemCount = getItemCount(product?._id);
  const isOutOfStock = product?.stock === 0;
  // console.log("Item count in AddToCartButton:", itemCount);
  return (
    <div className='w-full h-12 flex items-center'>
      {itemCount ? (
      <div className='w-full text-sm'>
        <div className='flex items-center justify-between'>
          <span className='text-xs text-muted-foreground'>Quantity</span>
          <QuantityButtons product={product}/>
        </div>
        <div className='flex items-center justify-between border-t pt-1'> 
          <span className='text-xs font-semibold'>Subtotal</span>
          <PriceFormatter amount={product?.price ? product?.price * itemCount : 0 }/>
        </div>
      </div>
      ): (
  <Button 
    onClick={() => {
      addItem(product);
      toast.success( `${product?.name?.substring(0, 12)}... added sucessfully!`
      );
    }}
    disabled={isOutOfStock}

    className={cn("w-full bg-transparent text-darkColor shadow-none border border-darkColor/30 font-semibold tracking-wide hover:text-white hoverEffect", className)}>
      AddToCartButton
    </Button>
  )
    }

    </div>
  )
}

export default AddToCartButton