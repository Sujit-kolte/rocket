import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// FIX 2: Ensure your .env file exists in the root!
// If you are testing, you can temporarily paste the strings here.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
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
    container.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const data = doc.data();

      // Only process enabled projects
      if (data.enabled === false) return;

      // FIX 3: Added the 'thruster-flame' div inside the HTML so CSS can style it
      const rocketHTML = `
        <div class="rocket">
          <div class="rocket-container">
            <img
              src="${data.mainSrc}"
              alt="${data.title}"
              class="rocket-image"
            />
            <div class="thruster-flame"></div> </div>
          
          <div class="rocket-info slide-in">
            <div class="image-container">
              <img
                src="${data.iconSrc}"
                alt="${data.title} insignia"
                class="rocket-insignia"
              />
            </div>
            <br />
            <h2 class="rocket-title">${data.title}</h2>
            <br />
            <div class="rocket-separator"></div>
            <br />
            <p class="rocket-desc">${data.description}</p>
            <br />
            <br />
          </div>
        </div>
      `;

      container.insertAdjacentHTML("beforeend", rocketHTML);
    });
  } catch (error) {
    console.error("Error fetching rockets:", error);
  }
}

fetchAndRenderRockets(".projects-section");
