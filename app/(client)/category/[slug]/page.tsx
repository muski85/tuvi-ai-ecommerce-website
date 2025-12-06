import  Container  from '@/components/Container';
import { getAllCategories } from '@/sanity/lib/helpers/queries';
import Title from '@/components/Title';
import React from 'react'
import CategoryProducts from '@/components/CategoryProducts';
//stop
const CategoryPage = async({
  params,
}:{
  params: Promise<{slug:string}>;
} ) => {
  const {slug} = await params;
  const categories = await getAllCategories();
  return (
    <Container className='py-10'>
      
      <CategoryProducts categories={categories} slug={slug}/>
    </Container>
  )
}

export default CategoryPage