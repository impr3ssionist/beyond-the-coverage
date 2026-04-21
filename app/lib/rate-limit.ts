/**
 * Simple in-memory rate limiter
 * For production with multiple instances, use Redis
 */

interface RateLimiterConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Max requests per window
}

interface RequestRecord {
  count: number;
  resetTime: number;
}

export class RateLimiter {
  private requests: Map<string, RequestRecord>;
  private windowMs: number;
  private maxRequests: number;

  constructor(config: RateLimiterConfig) {
    this.requests = new Map();
    this.windowMs = config.windowMs;
    this.maxRequests = config.maxRequests;

    // Clean up old entries every 10 minutes
    setInterval(() => {
      this.cleanup();
    }, 10 * 60 * 1000);
  }

  async isLimited(identifier: string): Promise<boolean> {
    const now = Date.now();
    const record = this.requests.get(identifier);

    // New identifier or window expired
    if (!record || now > record.resetTime) {
      this.requests.set(identifier, {
        count: 1,
        resetTime: now + this.windowMs,
      });
      return false;
    }

    // Increment count
    record.count++;

    // Check if limit exceeded
    if (record.count > this.maxRequests) {
      return true;
    }

    return false;
  }

  private cleanup(): void {
    const now = Date.now();
    const toDelete: string[] = [];

    this.requests.forEach((record, key) => {
      if (now > record.resetTime) {
        toDelete.push(key);
      }
    });

    toDelete.forEach((key) => {
      this.requests.delete(key);
    });
  }

  // Get remaining requests for an identifier
  getRemaining(identifier: string): number {
    const record = this.requests.get(identifier);
    if (!record) return this.maxRequests;

    const now = Date.now();
    if (now > record.resetTime) return this.maxRequests;

    return Math.max(0, this.maxRequests - record.count);
  }

  // Reset for an identifier
  reset(identifier: string): void {
    this.requests.delete(identifier);
  }
}

/**
 * Redis-based rate limiter for production
 * Use when running multiple instances
 */
export class RedisRateLimiter {
  // Implementation would use redis client
  // This is a placeholder for production use

  async isLimited(identifier: string): Promise<boolean> {
    // TODO: Implement with Redis
    return false;
  }

  async getRemaining(identifier: string): Promise<number> {
    // TODO: Implement with Redis
    return 0;
  }

  async reset(identifier: string): Promise<void> {
    // TODO: Implement with Redis
  }
}
