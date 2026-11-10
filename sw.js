// Service worker minimal : nécessaire pour que l'appli soit installable.
// Il ne garde en mémoire que la coquille (cette page + icônes) ; l'appli elle-même
// est toujours chargée en direct depuis Google, donc rien n'est jamais périmé.
const CACHE = 'maintenance-coquille-v4';
const FICHIERS = ['./', 'index.html', 'offline.html', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FICHIERS))); self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== CACHE).map(x => caches.delete(x)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  if (e.request.mode === 'navigate') {
    e.respondWith(fetch(e.request).catch(() => caches.match('offline.html')));
  }
});
