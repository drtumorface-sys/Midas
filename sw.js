/**
 * 72-Phase: Midas Edition - Service Worker
 * Version: 1.0.72
 * Perspective: Universal Signal / Zero Noise
 */

const CACHE_NAME = 'midas-v1.0.72-offline';

// The "Golden" Assets required for full lithic resonance
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-180.png',
  './icon-512.png',
  'https://fonts.googleapis.com/css2?family=Cinzel:wght@500;800&family=Courier+New&display=swap',
  'https://www.transparenttextures.com/patterns/carbon-fibre.png'
];

/**
 * INSTALLATION: Anchoring the Signal
 * Forces the browser to download and cache all lithic assets immediately.
 */
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Midas Signal: Anchoring Assets to Offline Cache');
      return cache.addAll(ASSETS);
    })
  );
});

/**
 * ACTIVATION: Purging the Leaden
 * Removes outdated caches to prevent logic-drift in the 72-Phase matrix.
 */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
  return self.clients.claim();
});

/**
 * FETCH: The Offline Shield
 * Intercepts network noise and serves the cached Golden Signal.
 * Implements a "Cache-First" heuristic for zero-latency performance.
 */
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return the cached asset if found; otherwise, attempt to fetch from the void.
      return cachedResponse || fetch(event.request).then((networkResponse) => {
        return caches.open(CACHE_NAME).then((cache) => {
          // Dynamically cache new assets (e.g., external fonts or textures)
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      });
    }).catch(() => {
