if(!self.define){let e,s={};const c=(c,a)=>(c=new URL(c+".js",a).href,s[c]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=c,e.onload=s,document.head.appendChild(e)}else e=c,importScripts(c),s()})).then((()=>{let e=s[c];if(!e)throw new Error(`Module ${c} didn’t register its module`);return e})));self.define=(a,i)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let t={};const r=e=>c(e,n),o={module:{uri:n},exports:t,require:r};s[n]=Promise.all(a.map((e=>o[e]||r(e)))).then((e=>(i(...e),t)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"c044471842d58070bc3ed6b277acd99a"},{url:"/_next/static/c44QFhyJTFMHYxyKZ0YoM/_buildManifest.js",revision:"63ff20882e48bdd67b0bf4cfdf7f7ca6"},{url:"/_next/static/c44QFhyJTFMHYxyKZ0YoM/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/1406.02ade4d24f8f7929.js",revision:"02ade4d24f8f7929"},{url:"/_next/static/chunks/1594.145b07a3905751fd.js",revision:"145b07a3905751fd"},{url:"/_next/static/chunks/1997-e0f5ec2556d6cf8f.js",revision:"c44QFhyJTFMHYxyKZ0YoM"},{url:"/_next/static/chunks/1ef26942-6122164cec06775c.js",revision:"c44QFhyJTFMHYxyKZ0YoM"},{url:"/_next/static/chunks/2112-c2bae1950a6a245b.js",revision:"c44QFhyJTFMHYxyKZ0YoM"},{url:"/_next/static/chunks/2204.1309336ce164f50c.js",revision:"1309336ce164f50c"},{url:"/_next/static/chunks/2443530c-1a55a0363f33825d.js",revision:"c44QFhyJTFMHYxyKZ0YoM"},{url:"/_next/static/chunks/2672-cb104216ccc0f13c.js",revision:"c44QFhyJTFMHYxyKZ0YoM"},{url:"/_next/static/chunks/2952.eb1cdd783797519c.js",revision:"eb1cdd783797519c"},{url:"/_next/static/chunks/3213.b4718a3bc22f06e7.js",revision:"b4718a3bc22f06e7"},{url:"/_next/static/chunks/3400.54da1312e68d42aa.js",revision:"54da1312e68d42aa"},{url:"/_next/static/chunks/3517.5c0fb00d1b129015.js",revision:"5c0fb00d1b129015"},{url:"/_next/static/chunks/3634-1414892bb12fd988.js",revision:"c44QFhyJTFMHYxyKZ0YoM"},{url:"/_next/static/chunks/3997-5835738fac046d6d.js",revision:"c44QFhyJTFMHYxyKZ0YoM"},{url:"/_next/static/chunks/422.9f6662313fd4a213.js",revision:"9f6662313fd4a213"},{url:"/_next/static/chunks/4416.8d82cc862ee8626d.js",revision:"8d82cc862ee8626d"},{url:"/_next/static/chunks/4751-14778f76b0f8ecef.js",revision:"c44QFhyJTFMHYxyKZ0YoM"},{url:"/_next/static/chunks/4817.d557ccf0285817d5.js",revision:"d557ccf0285817d5"},{url:"/_next/static/chunks/4825.ab38787df43aa7c0.js",revision:"ab38787df43aa7c0"},{url:"/_next/static/chunks/5570.0c2263f93799fc71.js",revision:"0c2263f93799fc71"},{url:"/_next/static/chunks/5610.00ef507dd80cc9de.js",revision:"00ef507dd80cc9de"},{url:"/_next/static/chunks/5651.9a774ae8b1cc4e8b.js",revision:"9a774ae8b1cc4e8b"},{url:"/_next/static/chunks/5728.2fbef69b94ec6cca.js",revision:"2fbef69b94ec6cca"},{url:"/_next/static/chunks/5788-2828bf790671c55e.js",revision:"c44QFhyJTFMHYxyKZ0YoM"},{url:"/_next/static/chunks/5917.54b7da4829332eeb.js",revision:"54b7da4829332eeb"},{url:"/_next/static/chunks/5918-729537ddb8ae225c.js",revision:"c44QFhyJTFMHYxyKZ0YoM"},{url:"/_next/static/chunks/6181.9969b3dcfc448471.js",revision:"9969b3dcfc448471"},{url:"/_next/static/chunks/6191.0c7a6f2e67ccc277.js",revision:"0c7a6f2e67ccc277"},{url:"/_next/static/chunks/6225.56ecc1362d0ca306.js",revision:"56ecc1362d0ca306"},{url:"/_next/static/chunks/6487.68e82748db69c9d2.js",revision:"68e82748db69c9d2"},{url:"/_next/static/chunks/65.5b59b2524ead3a31.js",revision:"5b59b2524ead3a31"},{url:"/_next/static/chunks/6523.7d1bb9da8a306423.js",revision:"7d1bb9da8a306423"},{url:"/_next/static/chunks/6714.99fc365ffe901fd4.js",revision:"99fc365ffe901fd4"},{url:"/_next/static/chunks/6832.ab640d9957cb417d.js",revision:"ab640d9957cb417d"},{url:"/_next/static/chunks/6942.c08085427c39966c.js",revision:"c08085427c39966c"},{url:"/_next/static/chunks/7242.44f51478ae7b72e0.js",revision:"44f51478ae7b72e0"},{url:"/_next/static/chunks/725.db3e58cd744918d2.js",revision:"db3e58cd744918d2"},{url:"/_next/static/chunks/7359.f323fbfedc6044ad.js",revision:"f323fbfedc6044ad"},{url:"/_next/static/chunks/7484.96cd2a019e629c42.js",revision:"96cd2a019e629c42"},{url:"/_next/static/chunks/7497-31c2750225760848.js",revision:"c44QFhyJTFMHYxyKZ0YoM"},{url:"/_next/static/chunks/7669.b06c9adcad94dcf3.js",revision:"b06c9adcad94dcf3"},{url:"/_next/static/chunks/7699.b9fe0165b300c20d.js",revision:"b9fe0165b300c20d"},{url:"/_next/static/chunks/7722-2c5b54234da36f51.js",revision:"c44QFhyJTFMHYxyKZ0YoM"},{url:"/_next/static/chunks/8139-4832ddf677d2fb07.js",revision:"c44QFhyJTFMHYxyKZ0YoM"},{url:"/_next/static/chunks/8311.caa2942b7aaefa64.js",revision:"caa2942b7aaefa64"},{url:"/_next/static/chunks/865.ea5f9a6292ea3902.js",revision:"ea5f9a6292ea3902"},{url:"/_next/static/chunks/8714.2f9c6973124405b7.js",revision:"2f9c6973124405b7"},{url:"/_next/static/chunks/9112.e5312378da68ab13.js",revision:"e5312378da68ab13"},{url:"/_next/static/chunks/9224-a5236438d87c99b0.js",revision:"c44QFhyJTFMHYxyKZ0YoM"},{url:"/_next/static/chunks/9341.1ab3b11ae7474994.js",revision:"1ab3b11ae7474994"},{url:"/_next/static/chunks/9818.8c7887647a13b4dc.js",revision:"8c7887647a13b4dc"},{url:"/_next/static/chunks/app/error-83f269f06241dcca.js",revision:"c44QFhyJTFMHYxyKZ0YoM"},{url:"/_next/static/chunks/app/help/error-6782189498caa8bf.js",revision:"c44QFhyJTFMHYxyKZ0YoM"},{url:"/_next/static/chunks/app/help/loading-12857445c0df754d.js",revision:"c44QFhyJTFMHYxyKZ0YoM"},{url:"/_next/static/chunks/app/help/page-1833597535014b19.js",revision:"c44QFhyJTFMHYxyKZ0YoM"},{url:"/_next/static/chunks/app/layout-f5c1e1ffcabe73cc.js",revision:"c44QFhyJTFMHYxyKZ0YoM"},{url:"/_next/static/chunks/app/loading-307301f427901cf6.js",revision:"c44QFhyJTFMHYxyKZ0YoM"},{url:"/_next/static/chunks/app/login/error-02173db4fd11a4bf.js",revision:"c44QFhyJTFMHYxyKZ0YoM"},{url:"/_next/static/chunks/app/login/loading-a7fb3d52dfec3f91.js",revision:"c44QFhyJTFMHYxyKZ0YoM"},{url:"/_next/static/chunks/app/login/page-21d51b15c9f7a137.js",revision:"c44QFhyJTFMHYxyKZ0YoM"},{url:"/_next/static/chunks/app/page-a6ee1010eb1510b6.js",revision:"c44QFhyJTFMHYxyKZ0YoM"},{url:"/_next/static/chunks/app/panel/daos/%5Bid%5D/error-ea0552372620bc34.js",revision:"c44QFhyJTFMHYxyKZ0YoM"},{url:"/_next/static/chunks/app/panel/daos/%5Bid%5D/loading-5af3fb7eacc085a9.js",revision:"c44QFhyJTFMHYxyKZ0YoM"},{url:"/_next/static/chunks/app/panel/daos/%5Bid%5D/page-8d636bb1f473e400.js",revision:"c44QFhyJTFMHYxyKZ0YoM"},{url:"/_next/static/chunks/app/panel/daos/error-43545307b0d31db1.js",revision:"c44QFhyJTFMHYxyKZ0YoM"},{url:"/_next/static/chunks/app/panel/daos/loading-d08e99968ad2c5f0.js",revision:"c44QFhyJTFMHYxyKZ0YoM"},{url:"/_next/static/chunks/app/panel/daos/page-0779159bff0affbf.js",revision:"c44QFhyJTFMHYxyKZ0YoM"},{url:"/_next/static/chunks/app/panel/error-b154ac717491dac1.js",revision:"c44QFhyJTFMHYxyKZ0YoM"},{url:"/_next/static/chunks/app/panel/layout-28ca3729398b42e1.js",revision:"c44QFhyJTFMHYxyKZ0YoM"},{url:"/_next/static/chunks/app/panel/loading-079a0b842a1d1d62.js",revision:"c44QFhyJTFMHYxyKZ0YoM"},{url:"/_next/static/chunks/app/panel/new-dao/error-b095a2d83ab809ee.js",revision:"c44QFhyJTFMHYxyKZ0YoM"},{url:"/_next/static/chunks/app/panel/new-dao/loading-1e7479bf7dc43d73.js",revision:"c44QFhyJTFMHYxyKZ0YoM"},{url:"/_next/static/chunks/app/panel/new-dao/page-0ad1f4b1792cec3c.js",revision:"c44QFhyJTFMHYxyKZ0YoM"},{url:"/_next/static/chunks/app/panel/page-d81e631dd75a55d2.js",revision:"c44QFhyJTFMHYxyKZ0YoM"},{url:"/_next/static/chunks/app/panel/profile/error-723cbaa841278de8.js",revision:"c44QFhyJTFMHYxyKZ0YoM"},{url:"/_next/static/chunks/app/panel/profile/loading-819fe9a4a42e98df.js",revision:"c44QFhyJTFMHYxyKZ0YoM"},{url:"/_next/static/chunks/app/panel/profile/page-b9fb8a62356b6ada.js",revision:"c44QFhyJTFMHYxyKZ0YoM"},{url:"/_next/static/chunks/fbd285cf.96603a4ce1e6f23d.js",revision:"96603a4ce1e6f23d"},{url:"/_next/static/chunks/main-2fe9fc8d411a3ed1.js",revision:"c44QFhyJTFMHYxyKZ0YoM"},{url:"/_next/static/chunks/main-app-f8506c6660cfaf0b.js",revision:"c44QFhyJTFMHYxyKZ0YoM"},{url:"/_next/static/chunks/pages/_app-6b94368279a02b5e.js",revision:"c44QFhyJTFMHYxyKZ0YoM"},{url:"/_next/static/chunks/pages/_error-48231c25f4fdaf06.js",revision:"c44QFhyJTFMHYxyKZ0YoM"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-08bdc06ddade5cb0.js",revision:"c44QFhyJTFMHYxyKZ0YoM"},{url:"/_next/static/css/05d239ea0c4664a0.css",revision:"05d239ea0c4664a0"},{url:"/_next/static/css/2188155fc34bd84d.css",revision:"2188155fc34bd84d"},{url:"/_next/static/css/2b159a2c4f9f057e.css",revision:"2b159a2c4f9f057e"},{url:"/_next/static/css/4b1d0c9c04cd0074.css",revision:"4b1d0c9c04cd0074"},{url:"/_next/static/css/514b92c614841d57.css",revision:"514b92c614841d57"},{url:"/_next/static/css/53e5554fb6a824c4.css",revision:"53e5554fb6a824c4"},{url:"/_next/static/css/5af8f456de2a0050.css",revision:"5af8f456de2a0050"},{url:"/_next/static/css/6b0f0de1c9a9f311.css",revision:"6b0f0de1c9a9f311"},{url:"/_next/static/css/6e301ba27e482b1b.css",revision:"6e301ba27e482b1b"},{url:"/_next/static/css/7cc5b45435f395b0.css",revision:"7cc5b45435f395b0"},{url:"/_next/static/css/9c648016828ca753.css",revision:"9c648016828ca753"},{url:"/_next/static/css/ac1259ef477cff5c.css",revision:"ac1259ef477cff5c"},{url:"/_next/static/css/c94b40d759ee1319.css",revision:"c94b40d759ee1319"},{url:"/_next/static/media/00eba89d7d9fa733-s.woff2",revision:"5a5ea7b1c9809ed64ec37537da605d39"},{url:"/_next/static/media/243816ba55de2c3c-s.woff2",revision:"2178181c6036bb92044ceebda69a8e70"},{url:"/_next/static/media/26fc07203f7fba4b-s.woff2",revision:"eefa9bb18e5824695f440b6f00065c04"},{url:"/_next/static/media/336ade822a94467f-s.woff2",revision:"aeec2de3d012721dd743a577cc1a4886"},{url:"/_next/static/media/4a3edfefca4b2d89-s.woff2",revision:"bfeb66cac0794481280337cc83d0b707"},{url:"/_next/static/media/5da408b7d9a23235-s.woff2",revision:"ab3571ec37bbda168e0f73e8b06bb8aa"},{url:"/_next/static/media/65f0c6eb71009c0f-s.woff2",revision:"74906571d04b5722eedca049005a8993"},{url:"/_next/static/media/670970e2342f3b87-s.woff2",revision:"f1f0abe34b2c16ac73b951b8af9674a5"},{url:"/_next/static/media/76e920c5df0f1fdc-s.woff2",revision:"9bf0b962baf7de0c61b160d71f2478f5"},{url:"/_next/static/media/78591b289fc3df32-s.woff2",revision:"2a987ca040d4658b33b8fb49901583ce"},{url:"/_next/static/media/7ab12a0efe3b6546-s.woff2",revision:"70996e67a17ae67b1ba17c6729beeae3"},{url:"/_next/static/media/9bd2e2e4a7e7b82c-s.p.woff2",revision:"8a7d92ae8b7dd2c7c4dd71c63be0f1c3"},{url:"/_next/static/media/b0bdc8e2e79609aa-s.woff2",revision:"aca16db6012a4c6263387b04e1889c9d"},{url:"/_next/static/media/b9b136a66ad923f2-s.woff2",revision:"6ce0af99c26d45e86ed85d6e3f568234"},{url:"/_next/static/media/cdbcea0e589a6ff7-s.p.woff2",revision:"9b0c6e151c40b34b5a20f95a7df9ba0a"},{url:"/_next/static/media/cf27944f31cce2b1-s.woff2",revision:"d1be78fc2aeac384a3e5044617e791dc"},{url:"/_next/static/media/error.7248d04d.svg",revision:"678c719558b9832ca4706e329a1eda0d"},{url:"/_next/static/media/faq.ad4bccb5.svg",revision:"1b6e35d1346fef2f67c2333cf5c44eb2"},{url:"/_next/static/media/logo-black.355b4c08.png",revision:"1ed712157d03ca40f053e6a67051e093"},{url:"/_next/static/media/no-data.137e798a.svg",revision:"e325d719fdb2a8b38647bc8792ab090b"},{url:"/_next/static/media/organization.50f75f19.svg",revision:"1f207fd50902e7a19b49618f83c1dfc1"},{url:"/_next/static/media/profile.0b2d672d.svg",revision:"004ec6cea36eae4678012cb4ef0a303d"},{url:"/_next/static/media/welcome.308966e2.svg",revision:"981dc40c3fb8940fa3c1d413f8526c7c"},{url:"/android-chrome-192x192.png",revision:"415f1fc5950ec6b076da27f90082f19a"},{url:"/android-chrome-512x512.png",revision:"137ac90e609408a43440cd40ecf85b14"},{url:"/apple-touch-icon.png",revision:"4e85c295cd3595e8c1f02e6211df00ef"},{url:"/browserconfig.xml",revision:"a08aacec76641ed491c4f1801476773d"},{url:"/favicon-16x16.png",revision:"7a46b7273b56e801f693de223316c34f"},{url:"/favicon-32x32.png",revision:"7bced023488a9a85d55cd06e9c2bacce"},{url:"/favicon.ico",revision:"5f5fd4adfe47c26cc5dd786f5ec02379"},{url:"/images/brand/logo-black.png",revision:"1ed712157d03ca40f053e6a67051e093"},{url:"/images/icons/discord-icon.svg",revision:"147f41c95f6ad7574168c3d3a462c455"},{url:"/images/icons/facebook-icon.svg",revision:"1b059407eebc3313ee267da79e9ad35d"},{url:"/images/icons/metamask.svg",revision:"fbf33967fa244d21d61fb85f233fc331"},{url:"/images/icons/twitter-icon.svg",revision:"28eded7dc4e384571a0ab383b1a67da7"},{url:"/images/icons/walletconnect.svg",revision:"d96272718d89ca0a3dd528cb0ca5123f"},{url:"/images/illustrations/error.svg",revision:"678c719558b9832ca4706e329a1eda0d"},{url:"/images/illustrations/faq.svg",revision:"1b6e35d1346fef2f67c2333cf5c44eb2"},{url:"/images/illustrations/no-data.svg",revision:"e325d719fdb2a8b38647bc8792ab090b"},{url:"/images/illustrations/organization.svg",revision:"1f207fd50902e7a19b49618f83c1dfc1"},{url:"/images/illustrations/profile.svg",revision:"004ec6cea36eae4678012cb4ef0a303d"},{url:"/images/illustrations/setup.svg",revision:"06d2a542e01a64426796dd5d3049f439"},{url:"/images/illustrations/welcome.svg",revision:"981dc40c3fb8940fa3c1d413f8526c7c"},{url:"/manifest.json",revision:"c2f2bd578a9d541f5eefa8ff47b30405"},{url:"/mockServiceWorker.js",revision:"77ccd4a202ec3d9c167c4dba72e38473"},{url:"/mstile-150x150.png",revision:"22d0f702f28b34c2cebb97e52e9b328d"},{url:"/safari-pinned-tab.svg",revision:"be925354e60553b0e24016a94c489c0b"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:c,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));