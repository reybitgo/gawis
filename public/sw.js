const CACHE_NAME = 'gawis-ewallet-v1';
const CACHE_URLS = [
  '/',
  '/dashboard',
  '/wallet/transactions',
  '/wallet/deposit',
  '/wallet/transfer',
  '/wallet/withdraw',
  '/coreui-template/css/style.css',
  '/coreui-template/vendors/@coreui/icons/css/free.min.css',
  '/coreui-template/vendors/simplebar/css/simplebar.css',
  '/coreui-template/js/coreui.bundle.min.js',
  '/coreui-template/vendors/simplebar/js/simplebar.min.js',
  '/coreui-template/assets/favicon/favicon-96x96.png',
  '/coreui-template/assets/favicon/android-icon-192x192.png'
];

// Install event
self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching files');
        return cache.addAll(CACHE_URLS);
      })
      .catch(err => console.log('Service Worker: Cache failed', err))
  );
});

// Activate event
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Service Worker: Clearing old cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  console.log('Service Worker: Fetching', event.request.url);

  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip external requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        return response || fetch(event.request)
          .then(fetchResponse => {
            // Clone the response before caching
            const responseClone = fetchResponse.clone();

            // Cache the new response
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseClone);
              });

            return fetchResponse;
          })
          .catch(err => {
            console.log('Service Worker: Fetch failed', err);
            // Return a custom offline page if available
            if (event.request.destination === 'document') {
              return caches.match('/offline.html');
            }
          });
      })
  );
});

// Background sync for failed requests
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    console.log('Service Worker: Background sync');
    event.waitUntil(doBackgroundSync());
  }
});

function doBackgroundSync() {
  // Handle background sync logic here
  return Promise.resolve();
}

// Push notification handling
self.addEventListener('push', event => {
  console.log('Service Worker: Push notification received');

  const options = {
    body: event.data ? event.data.text() : 'New notification from Gawis E-Wallet',
    icon: '/coreui-template/assets/favicon/android-icon-192x192.png',
    badge: '/coreui-template/assets/favicon/favicon-96x96.png',
    tag: 'gawis-notification',
    requireInteraction: false,
    actions: [
      {
        action: 'view',
        title: 'View',
        icon: '/coreui-template/assets/favicon/favicon-32x32.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/coreui-template/assets/favicon/favicon-32x32.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Gawis E-Wallet', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', event => {
  console.log('Service Worker: Notification clicked');

  event.notification.close();

  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow('/dashboard')
    );
  }
});