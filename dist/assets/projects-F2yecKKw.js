import"./modulepreload-polyfill-B5Qt9EMX.js";import{initializeApp as o}from"https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";import{getFirestore as a,getDocs as n,collection as d}from"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";const l={apiKey:"AIzaSyAG5FBYdCAu5-O44w4XdKbDE-w6hdkq6Zs",authDomain:"stestest-5c37b.firebaseapp.com",projectId:"stestest-5c37b",storageBucket:"stestest-5c37b.firebasestorage.app",messagingSenderId:"411889626084",appId:"1:411889626084:web:f6ed382e7b52d13265f5f1",measurementId:"G-V6RZLD7G1X"},p=o(l),f=a(p);async function b(s){const t=document.querySelector(s);if(t)try{const r=await n(d(f,"projects"));t.innerHTML="",r.forEach(c=>{const e=c.data();if(e.enabled===!1)return;const i=`
        <div class="rocket">
          <div class="rocket-container">
            <img
              src="${e.mainSrc}"
              alt="${e.title}"
              class="rocket-image"
            />
            <div class="thruster-flame"></div> </div>
          
          <div class="rocket-info slide-in">
            <div class="image-container">
              <img
                src="${e.iconSrc}"
                alt="${e.title} insignia"
                class="rocket-insignia"
              />
            </div>
            <br />
            <h2 class="rocket-title">${e.title}</h2>
            <br />
            <div class="rocket-separator"></div>
            <br />
            <p class="rocket-desc">${e.description}</p>
            <br />
            <br />
          </div>
        </div>
      `;t.insertAdjacentHTML("beforeend",i)})}catch(r){console.error("Error fetching rockets:",r)}}b(".projects-section");
