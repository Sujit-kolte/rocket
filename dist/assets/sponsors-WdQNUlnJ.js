import"./modulepreload-polyfill-B5Qt9EMX.js";import{initializeApp as d}from"https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";import{getFirestore as a,getDocs as p,collection as u}from"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";const f={apiKey:"AIzaSyAG5FBYdCAu5-O44w4XdKbDE-w6hdkq6Zs",authDomain:"stestest-5c37b.firebaseapp.com",projectId:"stestest-5c37b",storageBucket:"stestest-5c37b.firebasestorage.app",messagingSenderId:"411889626084",appId:"1:411889626084:web:f6ed382e7b52d13265f5f1",measurementId:"G-V6RZLD7G1X"},h=d(f),$=a(h);async function g(n){const c=document.querySelector(n);if(c)try{const t=await p(u($,"sponsors"));c.innerHTML="";const r={};t.forEach(e=>{const o=e.data();o.link===void 0&&(o.link="#"),o.customClass===void 0&&(o.customClass=""),o.customId===void 0&&(o.customId=""),r[o.category]||(r[o.category]=[]),r[o.category].push(o)});const i=["Platinum Sponsors","Gold Sponsors","Silver Sponsors","Bronze Sponsors","Entry Level Sponsors","Mentors"];i.forEach(e=>{r[e]&&l(e,r[e],c)}),Object.keys(r).forEach(e=>{i.includes(e)||l(e,r[e],c)})}catch(t){console.error("Error fetching sponsors:",t)}}function l(n,c,t){const r=n==="Platinum Sponsors";let o=`
    <div class="team-category" ${n==="Mentors"?'id="mentors"':""}>
      <h2 class="category-title">${n}</h2>`;(n==="Gold Sponsors"||n==="Bronze Sponsors")&&(o+="<br />"),r?c.forEach(s=>{o+=`
        <div class="sponsor-card">
          <a href="${s.link}" target="_blank">
            <img src="${s.image}" alt="${s.name}" ${s.customId?`id="${s.customId}"`:""} />
          </a>
          <h3 ${s.customId?`id="${s.customId}head"`:""}>${s.name}</h3>
        </div>`}):(o+='<div class="sponsors-grid">',c.forEach(s=>{const m=s.customClass||"sponsor-card";o+=`
          <div class="${m}">
            <a href="${s.link}" target="_blank">
              <img src="${s.image}" alt="${s.name}" ${s.customId?`id="${s.customId}"`:""} ${s.customClass?`class="${s.customClass}"`:""} />
            </a>
            <h3 ${s.customClass?`class="${s.customClass}"`:""} ${s.customId?`id="${s.customId}text"`:""}>${s.name}</h3>`,s.name==="Mr. Akash Sureka"||s.name==="Freshco Goli Soda"?o+="<br /><br />":s.name==="Freshco Goli Soda"&&(o+="<br />"),o+=`
          </div>`}),o+="</div>"),o+=`
    </div>`,t.insertAdjacentHTML("beforeend",o)}g(".sponsors-section");
