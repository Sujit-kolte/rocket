/* empty css                        */import{initializeApp as n}from"https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";import{getFirestore as a,getDocs as l,collection as d}from"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const c of t.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();window.addEventListener("scroll",()=>{const o=document.getElementById("thrusterFlame"),r=window.scrollY,s=Math.min(r/150,1);o.style.height=`${80+s*100}px`,o.style.opacity=`${.7+s*.3}`,o.style.filter=`blur(${2+s*4}px)`});const f={apiKey:"AIzaSyAG5FBYdCAu5-O44w4XdKbDE-w6hdkq6Zs",authDomain:"stestest-5c37b.firebaseapp.com",projectId:"stestest-5c37b",storageBucket:"stestest-5c37b.firebasestorage.app",messagingSenderId:"411889626084",appId:"1:411889626084:web:f6ed382e7b52d13265f5f1",measurementId:"G-V6RZLD7G1X"},p=n(f),u=a(p);async function m(o){const r=document.querySelector(o);if(r)try{const s=await l(d(u,"projects"));r.innerHTML="",s.forEach(i=>{const e=i.data();if(e.enabled===!1)return;const t=`
        <div class="rocket">
          <div class="rocket-container">
            <img
              src="${e.mainSrc}"
              alt="${e.title}"
              class="rocket-image"
            />
          </div>
          <div class="rocket-info slide-in">
            <div class="image-container">
              <img
                src="${e.iconSrc}"
                alt="${e.title}"
                class="rocket-insignia insignia-sahasra"
              />
            </div>
            <br />
            <h2 class="rocket-title">${e.title}</h2>
            <br />
            <br />
            <p class="rocket-desc">${e.description}</p>
            <br />
            <br />
          </div>
        </div>
      `;r.insertAdjacentHTML("beforeend",t)})}catch(s){console.error("Error fetching rockets:",s)}}m(".projects-section");
