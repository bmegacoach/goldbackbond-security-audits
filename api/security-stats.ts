// Vercel Edge Function — proxies Hermes's public-stats JSON to the site.
//
// Why this exists:
//   Vercel hosts the site over HTTPS. Modern browsers block mixed-content
//   (HTTPS page fetching HTTP origin), so the site can't fetch directly
//   from http://VPS:8443. This edge function bridges that gap: it runs
//   server-side, fetches from the VPS, and returns the JSON to the client
//   over HTTPS with edge caching.
//
// Caching: the upstream snapshot regenerates every 5 min on the VPS. We
// cache at the edge for 60s with stale-while-revalidate so the site stays
// snappy even during burst traffic without hammering the VPS.

export const config = {
  runtime: 'edge',
};

const HERMES_STATS_URL =
  process.env.HERMES_STATS_URL ||
  'http://163.245.195.174:8443/security-stats.json';

export default async function handler(_req: Request): Promise<Response> {
  try {
    const upstream = await fetch(HERMES_STATS_URL, {
      // Don't pass cookies / auth; this is a public endpoint
      cache: 'no-store',
      // Short timeout — if Hermes is slow, fail fast and let the site
      // show its last-good cached value
      signal: AbortSignal.timeout(5000),
    });

    if (!upstream.ok) {
      return new Response(
        JSON.stringify({
          error: 'upstream_unavailable',
          upstream_status: upstream.status,
        }),
        {
          status: 503,
          headers: {
            'content-type': 'application/json',
            'cache-control': 'no-store',
          },
        },
      );
    }

    const body = await upstream.text();
    return new Response(body, {
      status: 200,
      headers: {
        'content-type': 'application/json',
        // Cache at Vercel's edge for 60s; allow stale while revalidating
        // for 5 min so a slow upstream doesn't break the site.
        'cache-control':
          'public, max-age=60, s-maxage=60, stale-while-revalidate=300',
        'x-proxy-source': 'hermes-chief-of-security',
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'unknown';
    return new Response(
      JSON.stringify({ error: 'proxy_error', message }),
      {
        status: 502,
        headers: {
          'content-type': 'application/json',
          'cache-control': 'no-store',
        },
      },
    );
  }
}
