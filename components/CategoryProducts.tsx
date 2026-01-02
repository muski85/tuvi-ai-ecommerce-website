"use client"

import React, { useEffect, useState } from 'react'
import { CATEGORIES_QUERYResult, Product } from '@/sanity.types';
import { Button } from '@/components/ui/button';
import { client } from '@/sanity/lib/client';
import NoProductsAvailaible from './NoProductsAvailaible';
import ProductCard from './ProductCard';
import { AnimatePresence, motion } from 'motion/react';
import { Loader2 } from 'lucide-react';
import Title from './Title';
import { useRouter } from 'next/navigation'; 
//stop
interface Props {
  categories: CATEGORIES_QUERYResult;
  slug: string;
}

const CategoryProducts = ({categories, slug}: Props) => {
  const router = useRouter();  
  const [currentSlug, setCurrentSlug] = useState(slug);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCurrentSlug(slug);
  }, [slug]);
  
  const fetchProducts = async(categorySlug: string) => {
    try {
      setLoading(true);
      const query = `*[_type == 'product' && references(*[_type == 'category' && slug.current == $categorySlug]._id)] | order(name asc)`;
      const data = await client.fetch(query, {categorySlug})
      setProducts(data);
    } catch(error) {
      console.log("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts(currentSlug);
  }, [currentSlug])

  const currentCategory = categories?.find((cat) => cat?.slug?.current === currentSlug);
  const displayedCategoryTitle = currentCategory?.title || currentSlug;  
  return (
    <div>
      <Title className='text-lg md:text-xl mb-3 md:mb-5'>
        <span className='block md:inline'>Products in category:</span>
        <span className='font-bold text-green-600 capitalize tracking-wide md:ml-2 block md:inline mt-1 md:mt-0'>
          {displayedCategoryTitle}
        </span>
      </Title>

    <div className='py-3 md:py-5 flex flex-col md:flex-row items-start gap-3 md:gap-5'>

      <div className='w-full md:w-auto'>
        {/* Mobile view: Horizontal scroll */}
        <div className='md:hidden flex gap-2 overflow-x-auto pb-3 scrollbar-hide'>
          {categories?.map((item) => (
            <Button
              className={`bg-transparent text-darkColor shadow-sm hover:bg-darkColor/80 hover:text-white font-semibold hoverEffect whitespace-nowrap px-4 py-2 text-sm border ${item?.slug?.current === currentSlug ? 'bg-darkColor text-white border-darkColor' : 'border-gray-300'}`}
              key={item?._id}
              onClick={() => {
                router.push(`/category/${item?.slug?.current}`)
              }}
            >
              {item?.title}
            </Button>
          ))}
        </div>

        {/* Desktop view: Vertical sidebar */}
        <div className='hidden md:flex flex-col md:min-w-40 border'>
          {categories?.map((item) => (
            <Button
              className={`bg-transparent border-0 rounded-none text-darkColor shadow-none hover:bg-darkColor/80 hover:text-white font-semibold hoverEffect border-b last:border-b-0 ${item?.slug?.current === currentSlug && 'bg-darkColor text-white border-darkColor'}`}
              key={item?._id}
              onClick={() => {
                router.push(`/category/${item?.slug?.current}`)
              }}
            >
              {item?.title}
            </Button>
          ))}
        </div>
      </div>

      <div className='w-full'>
        {loading ?
          (
            <div className='flex flex-col items-center justify-center py-8 md:py-10 min-h-60 md:min-h-80 space-y-3 md:space-y-4 text-center bg-gray-100 rounded-lg w-full mt-3 md:mt-10'>
              <motion.div className='flex items-center space-x-2 text-blue-600'>
                <Loader2 className='w-5 h-5 md:w-6 md:h-6 animate-spin mx-auto'/>
                <span className='text-sm md:text-lg font-semibold'>Loading products...</span>
              </motion.div>
            </div>
          ) : (
            <>
              {products?.length ?
                (
                  <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 lg:gap-8 w-full'>
                    <AnimatePresence mode="wait">
                      {products?.map((product: Product) => (
                        <motion.div 
                          key={product?._id}
                          layout
                          initial={{opacity: 0.2}}
                          animate={{opacity: 1}}
                          exit={{opacity: 0}}
                        >
                          <ProductCard product={product} />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                ) : (
                  <NoProductsAvailaible selectedTab={currentSlug} className='mt-0 w-full'/>
                )
              }
            </>
          )
        }
      </div>
    </div>
    </div>
  )
}

export default CategoryProducts