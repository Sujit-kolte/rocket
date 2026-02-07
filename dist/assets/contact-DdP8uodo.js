import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css                    *//* empty css                        */import{initializeApp as s}from"https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";import{getFirestore as c,getDocs as i,collection as l}from"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";const d={apiKey:"AIzaSyAG5FBYdCAu5-O44w4XdKbDE-w6hdkq6Zs",authDomain:"stestest-5c37b.firebaseapp.com",projectId:"stestest-5c37b",storageBucket:"stestest-5c37b.firebasestorage.app",messagingSenderId:"411889626084",appId:"1:411889626084:web:f6ed382e7b52d13265f5f1",measurementId:"G-V6RZLD7G1X"},p=s(d),m=c(p);async function u(o){const t=document.querySelector(o);if(t)try{const a=await i(l(m,"contact"));t.innerHTML="",a.forEach(r=>{const e=r.data();if(e.enabled===!1)return;e.country===void 0&&(e.country="+91");const n=`
        <div class="form-wrapper">
          <p class="contact-subtitle">${e.subheading}</p>

          <form id="contactForm" class="contact-form" name="contact" method="post" data-netlify="true"
            netlify-honeypot="bot-field" action="/contact-us/thankyou.html">
            <input type="hidden" name="form-name" value="contact" />

            <label>Full Name</label>
            <input type="text" name="name" placeholder="Enter your name" required />

            <label>Email Address</label>
            <input type="email" name="email" placeholder="Enter your email" required />

            <label>Message</label>
            <textarea name="message" placeholder="Your Message" required></textarea>

            <button type="submit" class="send-btn"> Send Message <span class="arrow">→ </span></button>
          </form>

          <div class="contact-details">
            <p>${e.who}'s Phone: ${e.country} ${e.phone}</p>
          </div>
        </div>
      `;t.insertAdjacentHTML("beforeend",n)})}catch(a){console.error("Error fetching rockets:",a)}}u(".split-right");
