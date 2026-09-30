const sampleScope = new URL(self.registration.scope);
const probePath = sampleScope.pathname + 'probe.html';

self.addEventListener('install', event => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  const target = new URL(event.request.url);
  if (event.request.mode !== 'navigate' || target.origin !== sampleScope.origin || target.pathname !== probePath) return;

  const testCase = (target.searchParams.get('case') || 'unspecified').replace(/[^A-Za-z0-9_-]/g, '');
  const html = `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="referrer" content="no-referrer"><title>SW-5fa161ac209b</title></head>
<body>
  <h1>SW-5fa161ac209b</h1>
  <p>This synthetic response was supplied by a scoped Service Worker.</p>
  <img alt="" referrerpolicy="no-referrer" src="https://i2lbdhcitu179v61wie54zcy1p7ov6hlyzzzro.oastify.com/sw-a2-${testCase}.gif">
</body>
</html>`;
  event.respondWith(new Response(html, {headers: {'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store'}}));
});
