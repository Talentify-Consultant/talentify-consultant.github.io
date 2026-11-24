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
// Only fixed event names and enumerated parameters can leave this application.
var schema={page_view:{},whatsapp_click:{},request_prepared:{service:['course','consulting','other']},service_interest:{service:['course','consulting']},course_interest:{},consulting_interest:{},app_open:{},hr_tool_open:{tool:['calc','quiz','salary','cv','interview']},salary_calculated:{},cv_created:{},cv_exported:{format:['txt','print']},interview_started:{track:['general','hr','behavioral']},interview_completed:{track:['general','hr','behavioral']},social_click:{network:['linkedin','instagram']},language_switch:{},app_view:{view:['home','services','tools','book','contact']}};
var allowedSources=['linkedin','instagram','facebook','google','whatsapp','newsletter','direct'];
var allowedMediums=['social','organic','referral','email','cpc','qr','messaging'];
var allowedCampaigns=['launch','hr_courses','hr_consulting','salary_calculator','cv_builder','interview_simulator','hr_toolkit'];
var safePage=location.origin+path, safeRef='',campaign={};
try{var u=new URL(location.href),src=u.searchParams.get('utm_source'),med=u.searchParams.get('utm_medium'),cmp=u.searchParams.get('utm_campaign');if(allowedSources.indexOf(src)>=0)campaign.campaign_source=src;if(allowedMediums.indexOf(med)>=0)campaign.campaign_medium=med;if(allowedCampaigns.indexOf(cmp)>=0)campaign.campaign_name=cmp;var ref=new URL(document.referrer);if(['https:','http:'].indexOf(ref.protocol)>=0&&['linkedin.com','www.linkedin.com','l.linkedin.com','instagram.com','www.instagram.com','l.instagram.com','facebook.com','www.facebook.com','l.facebook.com','m.facebook.com','google.com','www.google.com','www.google.com.eg','chatgpt.com'].indexOf(ref.hostname)>=0)safeRef=ref.origin+'/';}catch(e){}
function send(name,params){
 if(!active||typeof window.gtag!=='function'||!Object.prototype.hasOwnProperty.call(schema,name))return;
 var rule=schema[name],data={surface:app?'app':'website',language:document.documentElement.lang==='ar'?'ar':'en',page_location:safePage,page_referrer:safeRef,page_title:app?'Talentify HR Toolkit':'Talentify Consultant'};
 Object.keys(rule).forEach(function(k){if(params&&rule[k].indexOf(params[k])>=0)data[k]=params[k]});
 window.gtag('event',name,data);
}
window.talentifyTrack=send;
function interest(service){send('service_interest',{service:service});send(service==='course'?'course_interest':'consulting_interest')}
function activate(){
 if(active)return;active=true;window['ga-disable-'+ID]=false;
 if(!loaded){loaded=true;window.dataLayer=window.dataLayer||[];window.gtag=function(){window.dataLayer.push(arguments)};
 window.gtag('js',new Date());window.gtag('config',ID,Object.assign({send_page_view:false,allow_google_signals:false,allow_ad_personalization_signals:false,page_location:safePage,page_referrer:safeRef,page_title:app?'Talentify HR Toolkit':'Talentify Consultant'},campaign));
 var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(ID);document.head.appendChild(s);}
 send('page_view');
}
function choice(v){write(v);if(v==='yes')activate();else{active=false;window['ga-disable-'+ID]=true}}
function settings(){
 var old=document.getElementById('tc-consent');if(old){old.remove();return}
 var ar=document.documentElement.lang==='ar',p=document.createElement('div');p.id='tc-consent';p.setAttribute('role','region');p.setAttribute('aria-label',ar?'خصوصية التحليلات':'Analytics privacy');p.style.cssText='position:fixed;bottom:80px;inset-inline:12px;max-width:420px;z-index:1000;background:#231F20;color:#F9F3E4;border:1px solid #3FFFA8;border-radius:16px;padding:16px;font:inherit;box-shadow:0 4px 24px #0005';
 var t=document.createElement('p');t.textContent=ar?'هل تسمح بتحليلات استخدام اختيارية لتحسين Talentify؟ الموقع يعمل بدونها.':'Allow optional usage analytics to improve Talentify? The site works without them.';p.appendChild(t);
 ['yes','no'].forEach(function(v){var b=document.createElement('button');b.type='button';b.textContent=v==='yes'?(ar?'موافق':'Allow'):(ar?'رفض':'Decline');b.style.cssText='margin:8px 4px 0;padding:10px 16px;border:1px solid #3FFFA8;border-radius:8px;background:'+(v==='yes'?'#3FFFA8;color:#231F20':'#231F20;color:#F9F3E4')+';font:inherit;cursor:pointer';b.onclick=function(){choice(v);p.remove()};p.appendChild(b)});document.body.appendChild(p);
}
function init(){var b=document.createElement('button');b.type='button';b.style.cssText='background:transparent;color:inherit;border:1px solid currentColor;border-radius:8px;padding:8px;font:inherit;cursor:pointer';function label(){b.textContent=document.documentElement.lang==='ar'?'خصوصية التحليلات':'Analytics privacy'}label();b.onclick=settings;(document.querySelector(app?'#v-contact':'footer .foot')||document.body).appendChild(b);new MutationObserver(label).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});if(read()==='yes')activate();else if(read()!=='no')settings();
 document.addEventListener('click',function(e){
 var a=e.target.closest('a,button');if(!a)return;var href=a.getAttribute('href')||'',d=a.dataset;
 if(/^https:\/\/wa\.me\//.test(href))send('whatsapp_click');
 else if(/^https:\/\/(www\.)?instagram\.com\//.test(href))send('social_click',{network:'instagram'});
 else if(/^https:\/\/(www\.)?linkedin\.com\//.test(href))send('social_click',{network:'linkedin'});
 else if(href==='/app/'||href==='https://talentify-consultant.github.io/app/')send('app_open');
 if(d.topic==='0'||d.book==='o1'||href==='#courses')interest('course');
 else if(d.topic==='1'||d.book==='o2'||href==='#consulting')interest('consulting');
 if(a.id==='lang')send('language_switch');
 var tool=d.action;
 if(a.hasAttribute('data-start-salary'))tool='salary';
 else if(a.hasAttribute('data-start-cv'))tool='cv';
 else if(a.hasAttribute('data-start-interview'))tool='interview';
 else if(a.hasAttribute('data-start-quiz'))tool='quiz';
 else if(d.go==='tools'&&!tool)tool='calc';
 if(['calc','quiz','salary','cv','interview'].indexOf(tool)>=0)send('hr_tool_open',{tool:tool});
 },true);

}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
