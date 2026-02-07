import"./modulepreload-polyfill-B5Qt9EMX.js";import{initializeApp as o}from"https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";import{getFirestore as n,getDocs as d,collection as l}from"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";const m={apiKey:"AIzaSyAG5FBYdCAu5-O44w4XdKbDE-w6hdkq6Zs",authDomain:"stestest-5c37b.firebaseapp.com",projectId:"stestest-5c37b",storageBucket:"stestest-5c37b.firebasestorage.app",messagingSenderId:"411889626084",appId:"1:411889626084:web:f6ed382e7b52d13265f5f1",measurementId:"G-V6RZLD7G1X"},f=o(m),g=n(f);async function p(t){const s=document.querySelector(t);if(s)try{const a=await d(l(g,"members"));s.innerHTML="";const e={};a.forEach(r=>{const i=r.data();i.enabled!==!1&&(i.role===void 0&&(i.role=""),e[i.category]||(e[i.category]=[]),e[i.category].push(i))}),e["Team Lead"]&&c("Team Lead",e["Team Lead"],s),Object.keys(e).forEach(r=>{r!=="Team Lead"&&c(r,e[r],s)})}catch(a){console.error("Error fetching rockets:",a)}}function c(t,s,a){let e=`
    <div class="team-category">
      <h2 class="category-title">${t}</h2>
      <div class="members-grid">`;s.forEach(r=>{e+=`
        <div class="member-card">
          <div class="circle-wrapper">
            <div class="image-container">
              <img src="${r.image}" class="profile-img" />
              <div class="blur-overlay"></div>
              <div class="social-icons">
                <a href="${r.linkedin}" target="_blank">
                  <img src="../imgs/linkedin.png" alt="linkedin" />
                </a>
              </div>
            </div>
          </div>
          <h3>${r.name}</h3>
          ${r.role?`<p>${r.role}</p>`:""}
        </div>`}),e+=`
      </div>
    </div>`,a.insertAdjacentHTML("beforeend",e)}p(".members-section");
