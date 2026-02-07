import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css                        */import{initializeApp as o}from"https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";import{getFirestore as n,getDocs as a,collection as d}from"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";window.addEventListener("scroll",()=>{const s=document.getElementById("thrusterFlame"),r=window.scrollY,e=Math.min(r/150,1);s.style.height=`${80+e*100}px`,s.style.opacity=`${.7+e*.3}`,s.style.filter=`blur(${2+e*4}px)`});const l={apiKey:"AIzaSyAG5FBYdCAu5-O44w4XdKbDE-w6hdkq6Zs",authDomain:"stestest-5c37b.firebaseapp.com",projectId:"stestest-5c37b",storageBucket:"stestest-5c37b.firebasestorage.app",messagingSenderId:"411889626084",appId:"1:411889626084:web:f6ed382e7b52d13265f5f1",measurementId:"G-V6RZLD7G1X"},p=o(l),m=n(p);async function f(s){const r=document.querySelector(s);if(r)try{const e=await a(d(m,"projects"));r.innerHTML="",e.forEach(c=>{const t=c.data();if(t.enabled===!1)return;const i=`
        <div class="rocket">
          <div class="rocket-container">
            <img
              src="${t.mainSrc}"
              alt="${t.title}"
              class="rocket-image"
            />
          </div>
          <div class="rocket-info slide-in">
            <div class="image-container">
              <img
                src="${t.iconSrc}"
                alt="${t.title}"
                class="rocket-insignia insignia-sahasra"
              />
            </div>
            <br />
            <h2 class="rocket-title">${t.title}</h2>
            <br />
            <br />
            <p class="rocket-desc">${t.description}</p>
            <br />
            <br />
          </div>
        </div>
      `;r.insertAdjacentHTML("beforeend",i)})}catch(e){console.error("Error fetching rockets:",e)}}f(".projects-section");
