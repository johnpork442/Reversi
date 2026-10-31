// Si cambias el juego, sube el número de versión para que los celulares se actualicen.
const C = "reversi-v1";
const ARCHIVOS = ["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(C).then(c => c.addAll(ARCHIVOS)));
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(k => Promise.all(k.filter(x => x !== C).map(x => caches.delete(x))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
