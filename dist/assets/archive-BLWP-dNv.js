import"./modulepreload-polyfill-B5Qt9EMX.js";import{initializeApp as c}from"https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";import{getFirestore as a,getDocs as d,collection as l}from"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";const m={apiKey:"AIzaSyAG5FBYdCAu5-O44w4XdKbDE-w6hdkq6Zs",authDomain:"stestest-5c37b.firebaseapp.com",projectId:"stestest-5c37b",storageBucket:"stestest-5c37b.firebasestorage.app",messagingSenderId:"411889626084",appId:"1:411889626084:web:f6ed382e7b52d13265f5f1",measurementId:"G-V6RZLD7G1X"},h=c(m),p=a(h);function f(){const n=document.querySelectorAll(".mission-node"),o={root:null,rootMargin:"-40% 0px -40% 0px",threshold:0},i=new IntersectionObserver(s=>{s.forEach(e=>{e.isIntersecting?(e.target.classList.add("visible"),e.target.classList.add("active")):e.target.classList.remove("active")})},o);n.forEach(s=>{i.observe(s)})}async function g(n){const o=document.querySelector(n);if(o)try{const i=await d(l(p,"archive")),s=[];i.forEach(e=>{const t=e.data();t.enabled!==!1&&s.push(t)}),s.sort((e,t)=>(e.year||0)-(t.year||0)),s.forEach((e,t)=>{const r=`
        <div class="mission-node ${t%2===0?"left":"right"} animate-in">
          <div class="mission-marker"></div>
          <div class="mission-content">
            <div class="mission-year">${e.year||"Unknown Year"}</div>
            <div class="mission-card">
              <img src="${e.image||""}" alt="${e.title||"Unnamed Mission"}" class="mission-img" onerror="this.src='data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%23334155' width='200' height='200'/%3E%3C/svg%3E'">
              <h2>${e.title||"Unnamed Mission"}</h2>
              <p>
                ${e.description||"No description available."}
              </p>
            </div>
          </div>
        </div>
      `;o.insertAdjacentHTML("beforeend",r)}),f()}catch(i){console.error("Error fetching rockets:",i)}}document.addEventListener("DOMContentLoaded",function(){g(".flight-path-container")});
