const CACHE_NAME = 'calorie-app-v2';  // ← キャッシュバージョンを更新
const urlsToCache = [
  '/',
  '/index.html',
  '/register.html',
  '/foodcalc.html',
  '/edit_items.html',
  '/style.css',
  '/app.js',
  '/foodcalc.js',
  '/edit_items.js',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// 🔧 インストール時にキャッシュ + 即時有効化
self.addEventListener('install', event => {
  self.skipWaiting();  // ← これが追加ポイント！
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// 🚀 フェッチ時にキャッシュ優先
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

// 🧹 古いキャッシュを削除
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
