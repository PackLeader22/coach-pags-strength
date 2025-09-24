// Very small network-first SW for same-origin GETs
const CACHE = "cps-v2";

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Only handle GET requests to our own origin
  if (req.method !== "GET" || url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(req)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then(cache => cache.put(req, copy));
        return res;
      })
      .catch(() => caches.match(req))
    );
});