// Increment the version when changing any application asset.
const CACHE_PREFIX = 'exchange-app-';
const CACHE_NAME = CACHE_PREFIX + 'v1';
const ASSETS = ['./', './index.html', './pwa.js', './manifest.webmanifest', './icon.png', './icon-192.png', './icon-512.png'];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  // Live exchange rates must never be replaced with a cached response.
  if (event.request.method !== 'GET' || url.origin !== self.location.origin) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    if (event.request.mode === 'navigate') {
      return (await cache.match('./index.html')) || fetch(event.request);
    }
    return (await cache.match(event.request)) || fetch(event.request);
  })());
});
