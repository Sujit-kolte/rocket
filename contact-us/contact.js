import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Fetch and Render Function
async function fetchAndRenderRockets(targetSelector) {
    const container = document.querySelector(targetSelector);

    if (!container) return;

    try {
        const querySnapshot = await getDocs(collection(db, "contact"));

        // Clear container to prevent duplicates
        container.innerHTML = '';

        querySnapshot.forEach((doc) => {
            const data = doc.data();

            // Only process enabled contact info
            if (data.enabled === false) return;

            // Set country to +91 if undefined
            if (data.country === undefined) {
                data.country = "+91";
            }

            const rocketHTML = `
        <div class="form-wrapper">
          <p class="contact-subtitle">${data.subheading}</p>

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
            <p>${data.who}'s Phone: ${data.country} ${data.phone}</p>
          </div>
        </div>
      `;

            container.insertAdjacentHTML('beforeend', rocketHTML);
        });
    } catch (error) {
        console.error("Error fetching rockets:", error);
    }
}

fetchAndRenderRockets('.split-right');