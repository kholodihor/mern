const CACHE_NAME = "gallery-images-v1";
const IMAGE_CACHE_NAME = "firebase-images-v1";

// Install event - cache critical resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(IMAGE_CACHE_NAME).then((cache) => {
      // Cache will be populated dynamically as images are loaded
      return cache.addAll([]);
    }),
  );
});

// Fetch event - serve cached images when offline
self.addEventListener("fetch", (event) => {
  // Only cache Firebase Storage images
  if (event.request.url.includes("firebasestorage.googleapis.com")) {
    event.respondWith(
      caches.open(IMAGE_CACHE_NAME).then((cache) => {
        // Check if image is in cache
        return cache.match(event.request).then((response) => {
          if (response) {
            // Serve from cache
            return response;
          }

          // Fetch from network and cache
          return fetch(event.request)
            .then((networkResponse) => {
              // Cache successful responses
              if (networkResponse.status === 200) {
                cache.put(event.request, networkResponse.clone());
              }
              return networkResponse;
            })
            .catch(() => {
              // If network fails, try to serve a placeholder
              return new Response("Image not available", { status: 404 });
            });
        });
      }),
    );
  }
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== IMAGE_CACHE_NAME && cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
          return Promise.resolve();
        }),
      );
    }),
  );
});
