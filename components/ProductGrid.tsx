"use client"

import React, {useState, useEffect} from 'react'
import HomeTabbar from './HomeTabbar'
import { productType } from '@/constants'
import { client } from '@/sanity/lib/client'
import { Product } from '@/sanity.types'
import ProductCard from './ProductCard'
import NoProductsAvailaible from './NoProductsAvailaible'
import {motion} from 'motion/react'
import ProductCardSkeleton from './ProductCardSkeleton'

const ProductGrid = () => {
  const [selectedTab, setSelectedTab] = useState(productType[0]?.title || '');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const query = `*[_type == 'product' && variant == $variant] | order(name asc)`;
        const params = { variant: selectedTab.toLowerCase() };
        
        const response = await client.fetch(query, params);
        setProducts(response);
      } catch (error) {
        console.error("Product fetching Error", error);
      } finally {
        setLoading(false);
      }
    }; 
    
    fetchData();
  }, [selectedTab]);

  return (
    <div className='mt-10 flex flex-col items-center'>
      <HomeTabbar 
        selectedTab={selectedTab} 
        onTabSelect={setSelectedTab}
      />
      
      {loading ? (
        // ✅ Skeleton Grid
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10 w-full'>
          {[...Array(8)].map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <>
          {products?.length ? (
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10 w-full'>
              {products?.map((product: Product) => (
                <motion.div 
                  key={product?._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          ) : (
            <NoProductsAvailaible selectedTab={selectedTab}/>
          )}
        </>
      )}
    </div>
  )
}

export default ProductGrid