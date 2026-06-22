/**
 * Minimal in-memory fixed-window rate limiter. Suitable for a single
 * instance / low traffic; swap for Upstash Redis (or Vercel KV) when
 * scaling to multiple regions. Keyed by identifier (e.g. IP).
 */
type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

export function rateLimit(
  key: string,
  { limit = 5, windowMs = 60_000 }: { limit?: number; windowMs?: number } = {}
): { ok: boolean; remaining: number } {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || existing.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1 };
  }

  existing.count += 1;
  if (existing.count > limit) return { ok: false, remaining: 0 };
  return { ok: true, remaining: limit - existing.count };
}

/** Best-effort client IP from request headers (Vercel/proxies). */
export function clientIpFromHeaders(headers: Headers): string {
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    "unknown"
  );
}
