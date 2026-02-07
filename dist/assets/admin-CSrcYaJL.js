import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css                    */import{initializeApp as C}from"https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";import{getAuth as L,setPersistence as x,browserSessionPersistence as I,signInWithEmailAndPassword as $,signOut as B,onAuthStateChanged as S}from"https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";import{getFirestore as k,getDocs as D,collection as y,updateDoc as b,doc as u,addDoc as A,deleteDoc as T}from"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";const U={apiKey:"AIzaSyAG5FBYdCAu5-O44w4XdKbDE-w6hdkq6Zs",authDomain:"stestest-5c37b.firebaseapp.com",projectId:"stestest-5c37b",storageBucket:"stestest-5c37b.firebasestorage.app",messagingSenderId:"411889626084",appId:"1:411889626084:web:f6ed382e7b52d13265f5f1",measurementId:"G-V6RZLD7G1X"},f=C(U),d=L(f),c=k(f);let n="",m=null;const M={projects:[{name:"mainSrc",label:"Main Image URL",type:"text"},{name:"iconSrc",label:"Icon URL",type:"text"},{name:"title",label:"Title",type:"text"},{name:"description",label:"Description",type:"textarea"}],members:[{name:"image",label:"Profile Image URL",type:"text"},{name:"name",label:"Name",type:"text"},{name:"category",label:"Category",type:"text"},{name:"role",label:"Role/Subsystem",type:"text"},{name:"linkedin",label:"LinkedIn URL",type:"text"}],sponsors:[{name:"image",label:"Logo URL",type:"text"},{name:"name",label:"Sponsor Name",type:"text"},{name:"category",label:"Tier",type:"text"},{name:"link",label:"Website URL",type:"text"},{name:"customId",label:"Custom ID (optional)",type:"text"},{name:"customClass",label:"Custom Class (optional)",type:"text"}],contact:[{name:"subheading",label:"Subheading Text",type:"text"},{name:"phone",label:"Phone Number",type:"text"},{name:"country",label:"Country Code",type:"text"},{name:"who",label:"Who to Contact",type:"text"}],archive:[{name:"image",label:"Image URL",type:"text"},{name:"year",label:"Year",type:"text"},{name:"title",label:"Title",type:"text"},{name:"description",label:"Description",type:"textarea"}]},p=document.getElementById("login-section"),v=document.getElementById("dashboard-section"),N=document.getElementById("login-btn"),R=document.getElementById("logout-btn"),F=document.getElementById("domain-select"),P=document.getElementById("add-new-btn"),l=document.getElementById("cards-container"),o=document.getElementById("modal"),q=document.getElementById("close-modal"),H=document.getElementById("item-form"),w=document.getElementById("modal-title"),h=document.getElementById("form-fields");N.addEventListener("click",async()=>{const t=document.getElementById("admin-email").value,e=document.getElementById("admin-password").value;try{await x(d,I),await $(d,t,e),alert("Login Successful!")}catch(a){alert("Login Error: "+a.message)}});R.addEventListener("click",async()=>{try{await B(d),alert("Logged out!")}catch(t){console.error(t)}});S(d,t=>{t?(p.classList.add("hidden"),v.classList.remove("hidden")):(p.classList.remove("hidden"),v.classList.add("hidden"))});F.addEventListener("change",t=>{n=t.target.value,n?g():l.innerHTML=`
            <div class="empty-state">
                <h3>Select a domain to view cards</h3>
                <p>Choose a domain from the dropdown above</p>
            </div>
        `});async function g(){if(n)try{const t=await D(y(c,n));if(t.empty){l.innerHTML=`
                <div class="empty-state">
                    <h3>No items found</h3>
                    <p>Click "Add New" to create your first item</p>
                </div>
            `;return}l.innerHTML='<div class="cards-grid"></div>';const e=l.querySelector(".cards-grid");t.forEach(a=>{const i=a.data(),s=i.enabled!==!1,r=W(a.id,i,s);e.appendChild(r)})}catch(t){console.error("Error loading cards:",t),alert("Error loading data")}}function W(t,e,a){const i=document.createElement("div");i.className=`data-card ${a?"":"disabled"}`;let s="";return s+=`
        <div class="toggle-container">
            <div class="toggle-switch ${a?"active":""}" data-id="${t}"></div>
        </div>
    `,n==="projects"?s+=`
            <div class="card-images">
            <img src="${e.mainSrc||""}" class="card-image" alt="${e.title||""}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%23334155' width='200' height='200'/%3E%3C/svg%3E'">
            <img src="${e.iconSrc||""}" class="card-image" alt="${e.title||""}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%23334155' width='200' height='200'/%3E%3C/svg%3E'">
            </div>
            <div class="card-title">${e.title||"Untitled"}</div>
            <div class="card-description">${e.description||""}</div>
        `:n==="members"?s+=`
            <img src="${e.image||""}" class="card-image" alt="${e.name||""}" onerror="this.src=''">
            <div class="card-title">${e.name||"Unnamed"}</div>
            <div class="card-subtitle">${e.category||""}</div>
            <div class="card-subtitle">${e.role||""}</div>
        `:n==="sponsors"?s+=`
            <img src="${e.image||""}" class="card-image" alt="${e.name||""}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%23334155' width='200' height='200'/%3E%3C/svg%3E'">
            <div class="card-title">${e.name||"Unnamed"}</div>
            <div class="card-subtitle">${e.category||""}</div>
        `:n==="contact"?s+=`
            <div class="card-title">Contact Information</div>
            <div class="card-description">Subheading: ${e.subheading||""}</div>
            <div class="card-description">Who to Contact: ${e.who||""}</div>
            <div class="card-description">Phone: ${e.country||"+91"} ${e.phone||""}</div>
        `:n==="archive"&&(s+=`
            <div class="card-title">${e.title||"Unnamed"}</div>
            <div class="card-description">${e.description||""}</div>
            <div class="card-subtitle">Year: ${e.year||""}</div>
            <img src="${e.image||""}" class="card-image" alt="${e.title||""}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Crect fill='%23334155' width='200' height='200'/%3E%3C/svg%3E'">
        `),s+=`
        <div class="card-actions">
            <button class="btn-warning edit-btn" data-id="${t}">Edit</button>
            <button class="btn-danger delete-btn" data-id="${t}">Delete</button>
        </div>
    `,i.innerHTML=s,i.querySelector(".toggle-switch").addEventListener("click",()=>j(t,!a)),i.querySelector(".edit-btn").addEventListener("click",()=>Y(t,e)),i.querySelector(".delete-btn").addEventListener("click",()=>z(t)),i}async function j(t,e){try{await b(u(c,n,t),{enabled:e}),g()}catch(a){console.error("Error toggling card:",a),alert("Error updating card")}}P.addEventListener("click",()=>{if(!n){alert("Please select a domain first");return}G()});function G(){m=null,w.textContent="Add New Item",E(),o.classList.add("active")}function Y(t,e){m=t,w.textContent="Edit Item",E(e),o.classList.add("active")}function E(t={}){const e=M[n];h.innerHTML="",e.forEach(a=>{const i=document.createElement("div");i.className="form-group";const s=document.createElement("label");s.textContent=a.label,i.appendChild(s);let r;a.type==="textarea"?(r=document.createElement("textarea"),r.rows=4):(r=document.createElement("input"),r.type=a.type),r.name=a.name,r.value=t[a.name]||"",r.placeholder=a.label,i.appendChild(r),h.appendChild(i)})}q.addEventListener("click",()=>{o.classList.remove("active")});o.addEventListener("click",t=>{t.target===o&&o.classList.remove("active")});H.addEventListener("submit",async t=>{t.preventDefault();const e=new FormData(t.target),a={enabled:!0};for(let[i,s]of e.entries())a[i]=s;n==="members"&&!a.role&&(a.role=""),n==="contact"&&!a.country&&(a.country="+91"),n==="who"&&!a.who&&(a.who="Team Lead"),n==="sponsors"&&!a.link&&(a.link="#"),n==="archive"&&!a.year&&(a.year="");try{m?(await b(u(c,n,m),a),alert("Item updated successfully!")):(await A(y(c,n),a),alert("Item added successfully!")),o.classList.remove("active"),g()}catch(i){console.error("Error saving item:",i),alert("Error saving item")}});async function z(t){if(confirm("Are you sure you want to delete this item?"))try{await T(u(c,n,t)),alert("Item deleted successfully!"),g()}catch(e){console.error("Error deleting item:",e),alert("Error deleting item")}}
