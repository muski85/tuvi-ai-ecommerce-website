import { NextRequest, NextResponse } from 'next/server';
import { invalidateCache, deleteFromCache, CACHE_CONFIG } from '@/lib/product-cache';
import { revalidatePath, revalidateTag } from 'next/cache';

/**
 * Cache Invalidation API
 *
 * This endpoint is called by Sanity webhooks when products are updated
 * It clears the Redis cache so users see fresh data
 *
 * How to set up Sanity webhook:
 * 1. Go to Sanity Studio → Manage → API → Webhooks
 * 2. Create new webhook
 * 3. URL: https://your-domain.com/api/revalidate
 * 4. Dataset: devlopment (your dataset name)
 * 5. Trigger on: Create, Update, Delete
 * 6. Filter: _type == "product"
 * 7. Add secret token for security
 */

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Security: Verify webhook secret (optional but recommended)
    const secret = req.headers.get('x-sanity-webhook-secret');
    if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
      console.warn('⚠️ Invalid webhook secret');
      // Uncomment to enforce security:
      // return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get the updated document type and slug
    const { _type, slug } = body;

    console.log(`🔄 Revalidation triggered for ${_type}:`, slug?.current || 'unknown');

    // Invalidate caches based on document type
    if (_type === 'product') {
      // Clear all products cache
      await deleteFromCache(CACHE_CONFIG.ALL_PRODUCTS.key);

      // Clear specific product cache if slug is provided
      if (slug?.current) {
        await deleteFromCache(CACHE_CONFIG.PRODUCT_BY_SLUG.key(slug.current));
      }

      // Revalidate Next.js pages
      revalidatePath('/'); // Home page
      revalidatePath('/search'); // Search page
      revalidatePath(`/product/${slug?.current}`); // Product detail page

      console.log('✅ Product cache invalidated successfully');
    }

    if (_type === 'category') {
      // Clear products cache (since products include category data)
      await deleteFromCache(CACHE_CONFIG.ALL_PRODUCTS.key);

      // Clear category-specific caches if needed
      if (slug?.current) {
        await deleteFromCache(CACHE_CONFIG.PRODUCTS_BY_CATEGORY.key(slug.current));
      }

      console.log('✅ Category cache invalidated successfully');
    }

    return NextResponse.json({
      success: true,
      message: 'Cache invalidated successfully',
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('❌ Cache invalidation error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Cache invalidation failed',
      },
      { status: 500 }
    );
  }
}

/**
 * Manual cache clearing endpoint (for testing)
 * GET /api/revalidate?type=products
 */
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const type = searchParams.get('type');

  if (!type) {
    return NextResponse.json(
      { error: 'Missing type parameter' },
      { status: 400 }
    );
  }

  try {
    if (type === 'products') {
      await invalidateCache('products:*');
      console.log('🗑️ Manually cleared all product caches');
    }

    return NextResponse.json({
      success: true,
      message: `Cleared ${type} cache`,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to clear cache' },
      { status: 500 }
    );
  }
}
