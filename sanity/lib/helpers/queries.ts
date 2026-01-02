import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live";
import { client } from "../client";
import { cacheWrapper, CACHE_CONFIG } from "@/lib/product-cache";

export const getProductBySlug= async(slug:string)=>{
  const PRODUCT_BY_SLUG_QUERY=defineQuery(
    `*[_type == "product" && slug.current == $slug] | order(name asc) [0]`
    );
    try{
      const product= await sanityFetch({
        query:PRODUCT_BY_SLUG_QUERY,
        params:{
          slug,
        },
      });
      return product?.data || null;
    }catch(error) {
      console.error("Error fetching product by slug:", error);
    }
};

export const getAllCategories = async()=>{
  const CATEGORIES_QUERY= defineQuery(
    `*[_type=="category"] | order(name asc)`
  );
  try{
    const categories= await sanityFetch({
      query:CATEGORIES_QUERY,
    });
    return categories.data || [];
  }catch(error){
    console.error("Error fetching all categories:", error);
    return [];
  }
};

export const getMyOrders = async (userId: string) =>{
  if(!userId){
    throw new Error ("User ID is required");
  }
  const MY_ORDERS_QUERY=defineQuery(`*[_type=='order' && clerkUserId == $userId] | order(orderDate desc){
    ...,
    products[]{
      ...,
      product->
    }
  }`);

  try{
    const orders = await sanityFetch({
      query: MY_ORDERS_QUERY,
      params: { userId },
    });
    return orders?.data || [];
  }catch(error){
    console.error("Error fetching orders:", error);
    return [];
  }

}

export const getProducts = async () => {
  const PRODUCTS_QUERY = defineQuery(
    `*[_type == "product"] {
      _id,
      name,
      price,
      discount,
      intro,
      description,
      slug,
      images,
      category->{
        title
      }
    }`
  );

  const products = await cacheWrapper(
    CACHE_CONFIG.ALL_PRODUCTS.key,
    CACHE_CONFIG.ALL_PRODUCTS.ttl,
    async () => {
      const result = await sanityFetch({
        query: PRODUCTS_QUERY,
      });
      return result.data || [];
    }
  );

  return products;
};

export const getProductsByIds = async (productIds: string[]) => {
  const PRODUCTS_BY_IDS_QUERY = defineQuery(
    `*[_type == "product" && _id in $productIds] {
      _id,
      name,
      price,
      discount,
      stock,
      images
    }`
  );

  const products = await client.fetch(PRODUCTS_BY_IDS_QUERY, { productIds });
  return products || [];
};
