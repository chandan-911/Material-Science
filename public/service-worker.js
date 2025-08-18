// Advanced Service Worker for Metal Selector Pro PWA
const CACHE_NAME = 'metal-selector-pro-v3';
const STATIC_CACHE = 'static-v3';
const DYNAMIC_CACHE = 'dynamic-v3';
const API_CACHE = 'api-v3';

// Core assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/favicon.svg',
  '/manifest.json',
  '/pwa-icons/icon-72x72.svg',
  '/pwa-icons/icon-96x96.svg',
  '/pwa-icons/icon-128x128.svg',
  '/pwa-icons/icon-144x144.svg',
  '/pwa-icons/icon-152x152.svg',
  '/pwa-icons/icon-192x192.svg',
  '/pwa-icons/icon-384x384.svg',
  '/pwa-icons/icon-512x512.svg',
  '/industry-factory-color-icon.svg',
  '/steeldb.csv'
];

// 3D models to cache
const MODEL_ASSETS = [
  '/models/bpillar.glb',
  '/models/roof.glb',
  '/models/roofrails.glb',
  '/models/structure.glb'
];

// Install event - cache static assets
self.addEventListener('install', event => {
  console.log('Service Worker installing...');
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then(cache => {
        console.log('Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      }),
      caches.open(STATIC_CACHE).then(cache => {
        console.log('Caching 3D models');
        return cache.addAll(MODEL_ASSETS);
      })
    ]).then(() => {
      console.log('Service Worker installed successfully');
      return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches and claim clients
self.addEventListener('activate', event => {
  console.log('Service Worker activating...');
  event.waitUntil(
    Promise.all([
      // Clean up old caches
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
            if (![CACHE_NAME, STATIC_CACHE, DYNAMIC_CACHE, API_CACHE].includes(cacheName)) {
              console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
      }),
      // Claim all clients immediately
      self.clients.claim()
    ]).then(() => {
      console.log('Service Worker activated successfully');
    })
  );
});

// Fetch event - intelligent caching strategy
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Handle different types of requests
  if (url.pathname.startsWith('/api/') || url.pathname.includes('generativelanguage.googleapis.com')) {
    // API requests - network first, cache fallback
    event.respondWith(handleApiRequest(request));
  } else if (url.pathname.startsWith('/models/') || url.pathname.includes('.glb')) {
    // 3D models - cache first, network fallback
    event.respondWith(handleModelRequest(request));
  } else if (url.pathname.startsWith('/pwa-icons/') || url.pathname.includes('.svg')) {
    // Icons - cache first, never network
    event.respondWith(handleIconRequest(request));
  } else if (url.pathname === '/' || url.pathname === '/index.html') {
    // HTML - network first, cache fallback
    event.respondWith(handleHtmlRequest(request));
  } else {
    // Other static assets - cache first, network fallback
    event.respondWith(handleStaticRequest(request));
  }
});

// API request handler - network first, cache fallback
async function handleApiRequest(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(API_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('API request failed, trying cache:', request.url);
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
}

// Model request handler - cache first, network fallback
async function handleModelRequest(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('Model request failed:', request.url);
    throw error;
  }
}

// Icon request handler - cache only
async function handleIconRequest(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  // If not in cache, try to fetch and cache
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('Icon request failed:', request.url);
    throw error;
  }
}

// HTML request handler - network first, cache fallback
async function handleHtmlRequest(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('HTML request failed, trying cache:', request.url);
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
}

// Static asset request handler - cache first, network fallback
async function handleStaticRequest(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('Static request failed:', request.url);
    throw error;
  }
}

// Background sync for offline actions
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    console.log('Background sync triggered');
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // Handle any background sync tasks
  console.log('Performing background sync...');
}

// Push notification handling
self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body || 'New material science update available',
      icon: '/pwa-icons/icon-192x192.svg',
      badge: '/pwa-icons/icon-72x72.svg',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      },
      actions: [
        {
          action: 'explore',
          title: 'Explore',
          icon: '/pwa-icons/icon-72x72.svg'
        },
        {
          action: 'close',
          title: 'Close',
          icon: '/pwa-icons/icon-72x72.svg'
        }
      ]
    };

    event.waitUntil(
      self.registration.showNotification(data.title || 'Metal Selector Pro', options)
    );
  }
});

// Notification click handling
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Message handling for communication with main thread
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});