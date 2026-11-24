/* Talentify GA4: set the real measurement ID below after creating the property.
   No analytics requests until the visitor explicitly opts in. Never send form values,
   quiz answers, salary values or outbound URLs containing prefilled messages. */
(function(){
'use strict';
var ID='G-R50RQBR2RP',KEY='talentify-analytics-consent',active=false,loaded=false;
if(!/^G-[A-Z0-9]+$/.test(ID))return;
var app=location.pathname.indexOf('/app/')===0, path=app?'/app/':'/';
function read(){try{return localStorage.getItem(KEY)}catch(e){return null}}
function write(v){try{localStorage.setItem(KEY,v)}catch(e){}}
function send(name,params){if(active&&typeof window.gtag==='function')window.gtag('event',name,Object.assign({surface:app?'app':'website',language:document.documentElement.lang},params||{}))}
function activate(){
 if(active)return;active=true;window['ga-disable-'+ID]=false;
 if(!loaded){loaded=true;window.dataLayer=window.dataLayer||[];window.gtag=function(){window.dataLayer.push(arguments)};
 window.gtag('js',new Date());window.gtag('config',ID,{send_page_view:false,allow_google_signals:false,allow_ad_personalization_signals:false,page_location:location.origin+path,page_referrer:''});
 var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(ID);document.head.appendChild(s);}
 send('page_view',{page_location:location.origin+path,page_referrer:''});
}
function choice(v){write(v);if(v==='yes')activate();else{active=false;window['ga-disable-'+ID]=true}}
function settings(){
 var old=document.getElementById('tc-consent');if(old){old.remove();return}
 var ar=document.documentElement.lang==='ar',p=document.createElement('div');p.id='tc-consent';p.setAttribute('role','region');p.setAttribute('aria-label',ar?'خصوصية التحليلات':'Analytics privacy');p.style.cssText='position:fixed;bottom:80px;inset-inline:12px;max-width:420px;z-index:1000;background:#231F20;color:#F9F3E4;border:1px solid #3FFFA8;border-radius:16px;padding:16px;font:inherit;box-shadow:0 4px 24px #0005';
 var t=document.createElement('p');t.textContent=ar?'هل تسمح بتحليلات استخدام اختيارية لتحسين Talentify؟ الموقع يعمل بدونها.':'Allow optional usage analytics to improve Talentify? The site works without them.';p.appendChild(t);
 ['yes','no'].forEach(function(v){var b=document.createElement('button');b.type='button';b.textContent=v==='yes'?(ar?'موافق':'Allow'):(ar?'رفض':'Decline');b.style.cssText='margin:8px 4px 0;padding:10px 16px;border:1px solid #3FFFA8;border-radius:8px;background:'+(v==='yes'?'#3FFFA8;color:#231F20':'#231F20;color:#F9F3E4')+';font:inherit;cursor:pointer';b.onclick=function(){choice(v);p.remove()};p.appendChild(b)});document.body.appendChild(p);
}
function init(){var b=document.createElement('button');b.type='button';b.style.cssText='background:transparent;color:inherit;border:1px solid currentColor;border-radius:8px;padding:8px;font:inherit;cursor:pointer';function label(){b.textContent=document.documentElement.lang==='ar'?'خصوصية التحليلات':'Analytics privacy'}label();b.onclick=settings;(document.querySelector(app?'#v-contact':'footer .foot')||document.body).appendChild(b);new MutationObserver(label).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});if(read()==='yes')activate();else if(read()!=='no')settings();
 document.addEventListener('click',function(e){var a=e.target.closest('a,button');if(!a)return;var href=a.getAttribute('href')||'';if(/^https:\/\/wa\.me\//.test(href))send('whatsapp_click');else if(/^https:\/\/(www\.)?instagram\.com\//.test(href))send('social_click',{network:'instagram'});else if(/^https:\/\/(www\.)?linkedin\.com\//.test(href))send('social_click',{network:'linkedin'});else if(href==='/app/')send('app_open');else if(a.hasAttribute('data-topic'))send('service_interest',{service:a.dataset.topic==='0'?'course':'consulting'});else if(a.id==='lang')send('language_switch');else if(a.id==='bk-go')send('request_prepared');else if(a.dataset.action==='calc'||a.dataset.action==='quiz')send('hr_tool_open',{tool:a.dataset.action});});
 var f=document.getElementById('req');if(f)f.addEventListener('submit',function(){send('request_prepared')});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
