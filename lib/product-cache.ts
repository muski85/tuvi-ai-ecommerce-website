import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export const CACHE_CONFIG = {
  ALL_PRODUCTS: {
    key: 'products:all',
    ttl: 300,
  },

  PRODUCT_BY_SLUG: {
    key: (slug: string) => `product:slug:${slug}`,
    ttl: 600,
  },

  PRODUCTS_BY_CATEGORY: {
    key: (categorySlug: string) => `products:category:${categorySlug}`,
    ttl: 300,
  },

  PRODUCT_SEARCH: {
    key: (query: string) => `products:search:${query}`,
    ttl: 120,
  },
};

export async function getFromCache<T>(key: string): Promise<T | null> {
  try {
    const cached = await redis.get<T>(key);
    if (cached) {
      console.log(`✅ Cache HIT: ${key}`);
      return cached;
    }
    console.log(`❌ Cache MISS: ${key}`);
    return null;
  } catch (error) {
    console.error('Cache read error:', error);
    return null;
  }
}

export async function setToCache<T>(
  key: string,
  data: T,
  ttl: number
): Promise<void> {
  try {
    await redis.setex(key, ttl, JSON.stringify(data));
    console.log(`💾 Cached: ${key} (TTL: ${ttl}s)`);
  } catch (error) {
    console.error('Cache write error:', error);
  }
}

export async function deleteFromCache(key: string): Promise<void> {
  try {
    await redis.del(key);
    console.log(`🗑️ Deleted cache: ${key}`);
  } catch (error) {
    console.error('Cache delete error:', error);
  }
}

export async function invalidateCache(pattern: string): Promise<void> {
  try {
    const keysToDelete = [
      CACHE_CONFIG.ALL_PRODUCTS.key,
    ];
    await Promise.all(keysToDelete.map(key => redis.del(key)));
    console.log(`🗑️ Invalidated cache pattern: ${pattern}`);
  } catch (error) {
    console.error('Cache invalidation error:', error);
  }
}

export async function cacheWrapper<T>(
  key: string,
  ttl: number,
  fetchFunction: () => Promise<T>
): Promise<T> {
  const cached = await getFromCache<T>(key);

  if (cached !== null) {
    return cached;
  }

  console.log(`🔄 Fetching fresh data for: ${key}`);
  const freshData = await fetchFunction();
  await setToCache(key, freshData, ttl);

  return freshData;
}

export async function getCacheStats(key: string): Promise<{
  exists: boolean;
  ttl: number;
}> {
  try {
    const exists = await redis.exists(key);
    const ttl = await redis.ttl(key);
    return {
      exists: exists === 1,
      ttl: ttl > 0 ? ttl : 0,
    };
  } catch (error) {
    console.error('Cache stats error:', error);
    return { exists: false, ttl: 0 };
  }
}
