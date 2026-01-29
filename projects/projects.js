import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Adjust thruster flame size and intensity based on scroll position
window.addEventListener("scroll", () => {
  const flame = document.getElementById("thrusterFlame");
  const scrollY = window.scrollY;
  const intensity = Math.min(scrollY / 150, 1);

  flame.style.height = `${80 + intensity * 100}px`;
  flame.style.opacity = `${0.7 + intensity * 0.3}`;
  flame.style.filter = `blur(${2 + intensity * 4}px)`;
});

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
    const querySnapshot = await getDocs(collection(db, "projects"));

    // Clear container to prevent duplicates
    container.innerHTML = '';

    querySnapshot.forEach((doc) => {
      const data = doc.data();

      // Only process enabled projects
      if (data.enabled === false) return;

      const rocketHTML = `
        <div class="rocket">
          <div class="rocket-container">
            <img
              src="${data.mainSrc}"
              alt="${data.title}"
              class="rocket-image"
            />
          </div>
          <div class="rocket-info slide-in">
            <div class="image-container">
              <img
                src="${data.iconSrc}"
                alt="${data.title}"
                class="rocket-insignia insignia-sahasra"
              />
            </div>
            <br />
            <h2 class="rocket-title">${data.title}</h2>
            <br />
            <br />
            <p class="rocket-desc">${data.description}</p>
            <br />
            <br />
          </div>
        </div>
      `;

      container.insertAdjacentHTML('beforeend', rocketHTML);
    });
  } catch (error) {
    console.error("Error fetching rockets:", error);
  }
}

fetchAndRenderRockets('.projects-section');