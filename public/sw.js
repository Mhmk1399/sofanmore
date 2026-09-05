const CACHE_VERSION = "sofanmore-2026-09-05";
const STATIC_CACHE = `${CACHE_VERSION}-static`;

const PRECACHE_URLS = [
  "/manifest.webmanifest",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
  "/icons/maskable-512x512.png",
  "/assets/images/Sofa_Logo.webp",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(STATIC_CACHE);
      await Promise.allSettled(PRECACHE_URLS.map((url) => cache.add(url)));
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const expectedCaches = new Set([STATIC_CACHE]);
      const cacheNames = await caches.keys();

      await Promise.all(
        cacheNames
          .filter(
            (cacheName) =>
              cacheName.startsWith("sofanmore-") &&
              !expectedCaches.has(cacheName),
          )
          .map((cacheName) => caches.delete(cacheName)),
      );

      await self.clients.claim();
    })(),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") return;

  const url = new URL(request.url);

  if (url.origin !== self.location.origin || url.pathname === "/sw.js") return;

  if (request.mode === "navigate") {
    event.respondWith(fetch(request));
    return;
  }

  if (url.pathname.startsWith("/_next/")) {
    event.respondWith(fetch(request));
    return;
  }

  if (
    url.pathname.startsWith("/assets/") ||
    url.pathname.startsWith("/icons/") ||
    url.pathname === "/favicon.ico" ||
    url.pathname === "/manifest.webmanifest"
  ) {
    event.respondWith(cacheFirst(request));
  }
});

async function cacheFirst(request) {
  const cached = await caches.match(request);

  if (cached) return cached;

  const response = await fetch(request);

  if (response.ok) {
    const cache = await caches.open(STATIC_CACHE);
    await cache.put(request, response.clone());
  }

  return response;
}
