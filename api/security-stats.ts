// Vercel Node Function — proxies Hermes's public-stats JSON to the site.
//
// Why this exists:
//   Vercel hosts the site over HTTPS. Modern browsers block mixed-content
//   (HTTPS page fetching HTTP origin), so the site can't fetch directly
//   from http://VPS:8443. This function bridges that gap: it runs
//   server-side, fetches from the VPS, and returns the JSON to the client
//   over HTTPS with edge caching.
//
// Runtime note: explicitly NOT Edge Runtime. Vercel's edge fetch enforces
// HTTPS-only and returns 403 on HTTP outbound. The Node runtime allows
// HTTP fetches, which is what we need until the VPS has TLS termination
// (planned: stats.goldbackbond.com via Traefik + Let's Encrypt).
//
// Caching: the upstream snapshot regenerates every 5 min on the VPS. We
// cache at Vercel's CDN for 60s with stale-while-revalidate so the site
// stays snappy under burst traffic without hammering the VPS.

import type { VercelRequest, VercelResponse } from '@vercel/node';

const HERMES_STATS_URL =
  process.env.HERMES_STATS_URL ||
  'http://163.245.195.174:8443/security-stats.json';

export default async function handler(
  _req: VercelRequest,
  res: VercelResponse,
): Promise<void> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const upstream = await fetch(HERMES_STATS_URL, {
      // Public endpoint — no cookies / auth
      cache: 'no-store',
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!upstream.ok) {
      res.status(503)
         .setHeader('Cache-Control', 'no-store')
         .json({
           error: 'upstream_unavailable',
           upstream_status: upstream.status,
         });
      return;
    }

    const body = await upstream.text();
    res.status(200)
       .setHeader('Content-Type', 'application/json')
       // Cache at Vercel's CDN for 60s; allow stale while revalidating
       // for 5 min so a slow upstream doesn't break the site.
       .setHeader(
         'Cache-Control',
         'public, max-age=60, s-maxage=60, stale-while-revalidate=300',
       )
       .setHeader('X-Proxy-Source', 'hermes-chief-of-security')
       .send(body);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'unknown';
    res.status(502)
       .setHeader('Cache-Control', 'no-store')
       .json({ error: 'proxy_error', message });
  }
}
