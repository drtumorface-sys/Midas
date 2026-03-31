// ═══════════════════════════════════════════════════════════════════════
//  M.I.D.A.S. — Service Worker
//  Cache-first strategy for offline resilience.
//  The audio engine and canvas renderer are entirely client-side, so
//  once the shell is cached the app functions without a network connection.
// ═══════════════════════════════════════════════════════════════════════

const CACHE_NAME   = 'midas-v1';
const SHELL_ASSETS = [
  './',
  './index.html',
  'https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600&family=Share+Tech+Mono&family=Cormorant+Garamond:ital,wght@0,300;1,300&display=swap',
];

// Install: pre-cache the app shell
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(SHELL_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate: remove stale caches from previous versions
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_NAME)
          .map(k  => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch: cache-first, network fallback
self.addEventListener('fetch', event => {
  // Only handle GET requests; skip cross-origin requests we cannot cache
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;

      return fetch(event.request).then(response => {
        // Only cache valid same-origin or font responses
        if (
          response.ok &&
          (event.request.url.startsWith(self.location.origin) ||
           event.request.url.includes('fonts.googleapis.com') ||
           event.request.url.includes('fonts.gstatic.com'))
        ) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
        }
        return response;
      });
    })
  );
});
