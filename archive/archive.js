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

// Setup intersection observer for mission nodes
function setupIntersectionObserver() {
  const nodes = document.querySelectorAll('.mission-node');

  const observerOptions = {
    root: null,
    rootMargin: '-40% 0px -40% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        entry.target.classList.add('active');
      } else {
        entry.target.classList.remove('active');
      }
    });
  }, observerOptions);

  nodes.forEach(node => {
    observer.observe(node);
  });
}

// Fetch and Render Function
async function fetchAndRenderRockets(targetSelector) {
  const container = document.querySelector(targetSelector);

  if (!container) return;

  try {
    const querySnapshot = await getDocs(collection(db, "archive"));

    // Collect all enabled missions
    const missions = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      // Only process enabled projects
      if (data.enabled !== false) {
        missions.push(data);
      }
    });

    // Sort by year (newest first - change to (a.year || 0) - (b.year || 0) for oldest first)
    missions.sort((a, b) => (a.year || 0) - (b.year || 0));

    // Render missions with alternating left/right
    missions.forEach((data, index) => {
      const side = index % 2 === 0 ? 'left' : 'right';

      const rocketHTML = `
        <div class="mission-node ${side} animate-in">
          <div class="mission-marker"></div>
          <div class="mission-content">
            <div class="mission-year">${data.year || 'Unknown Year'}</div>
            <div class="mission-card">
              <img src="${data.image || ''}" alt="${data.title || 'Unnamed Mission'}" class="mission-img" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'200\'%3E%3Crect fill=\'%23334155\' width=\'200\' height=\'200\'/%3E%3C/svg%3E'">
              <h2>${data.title || 'Unnamed Mission'}</h2>
              <p>
                ${data.description || 'No description available.'}
              </p>
            </div>
          </div>
        </div>
      `;

      container.insertAdjacentHTML('beforeend', rocketHTML);
    });

    // Setup observer AFTER nodes are added to DOM
    setupIntersectionObserver();

  } catch (error) {
    console.error("Error fetching rockets:", error);
  }
}

// Wait for DOM to be ready, then fetch data
document.addEventListener('DOMContentLoaded', function () {
  fetchAndRenderRockets('.flight-path-container');
});