const C='oc-v6',CDN='https://cdnjs.cloudflare.com/ajax/libs/chess.js/0.10.3/chess.js',SF=['stockfish-18-lite-single.js','stockfish-18-lite-single.wasm'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>Promise.all([
  c.addAll(['./','index.html','manifest.json','icon-192.png','icon-512.png']),
  fetch(CDN,{mode:'no-cors'}).then(r=>c.put(CDN,r)),
  ...SF.map(u=>c.add(u).catch(()=>0))
])).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{if(res.ok||res.type==='opaque'){const cp=res.clone();caches.open(C).then(c=>c.put(e.request,cp))}return res}).catch(()=>caches.match('index.html'))))});
