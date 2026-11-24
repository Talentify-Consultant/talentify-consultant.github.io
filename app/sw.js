/* Cache only the Talentify app shell and its own assets. */
const CACHE='talentify-app-v6-20261124';
const FILES=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./logo.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('talentify-app-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
 const u=new URL(e.request.url),scope=new URL(self.registration.scope);
 if(e.request.method!=='GET'||u.origin!==scope.origin||!u.pathname.startsWith(scope.pathname))return;
 const navigation=e.request.mode==='navigate';
 const asset=FILES.slice(2).some(f=>new URL(f,scope).pathname===u.pathname);
 if(!navigation&&!asset)return;
 e.respondWith((async()=>{
 const cache=await caches.open(CACHE);
 if(asset){const saved=await cache.match(e.request);if(saved)return saved;}
 try{const response=await fetch(e.request);if(response.ok){try{await cache.put(navigation?new URL('index.html',scope).href:e.request,response.clone())}catch(err){}}return response}
 catch(err){return (await cache.match(navigation?new URL('index.html',scope).href:e.request))||new Response('Offline',{status:503,headers:{'Content-Type':'text/plain'}})}
 })());
});
