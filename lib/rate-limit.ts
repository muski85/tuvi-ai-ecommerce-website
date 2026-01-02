import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export interface RateLimitConfig {
  limit: number;
  window: number;
}

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  limit: number;
  reset: number;
}
export async function rateLimit(
  identifier: string,
  config: RateLimitConfig
): Promise<RateLimitResult> {
  const { limit, window } = config;
  const key = `ratelimit:${identifier}`;

  try {
    const current = await redis.incr(key);

    if (current === 1) {
      await redis.expire(key, window);
    }

    const ttl = await redis.ttl(key);
    const isAllowed = current <= limit;

    return {
      success: isAllowed,
      remaining: Math.max(0, limit - current),
      limit,
      reset: ttl > 0 ? ttl : window,
    };
  } catch (error) {
    console.error('Rate limit error:', error);
    return {
      success: true,
      remaining: limit,
      limit,
      reset: window,
    };
  }
}

export const rateLimiters = {
  chat: (identifier: string) =>
    rateLimit(identifier, { limit: 10, window: 60 }),

  auth: (identifier: string) =>
    rateLimit(identifier, { limit: 5, window: 900 }),

  api: (identifier: string) =>
    rateLimit(identifier, { limit: 100, window: 60 }),
};
