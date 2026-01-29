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
        const querySnapshot = await getDocs(collection(db, "members"));

        // Clear container to prevent duplicates
        container.innerHTML = '';

        // Group members by category
        const categorizedMembers = {};

        querySnapshot.forEach((doc) => {
            const data = doc.data();

            // Only process enabled members
            if (data.enabled === false) return;

            // Set subsystem to empty string if undefined
            if (data.role === undefined) {
                data.role = "";
            }

            if (!categorizedMembers[data.category]) {
                categorizedMembers[data.category] = [];
            }
            categorizedMembers[data.category].push(data);
        });

        // Render Team Lead first
        if (categorizedMembers["Team Lead"]) {
            renderCategory("Team Lead", categorizedMembers["Team Lead"], container);
        }

        // Render all other categories
        Object.keys(categorizedMembers).forEach((category) => {
            if (category !== "Team Lead") {
                renderCategory(category, categorizedMembers[category], container);
            }
        });

    } catch (error) {
        console.error("Error fetching rockets:", error);
    }
}

function renderCategory(categoryName, members, container) {
    let categoryHTML = `
    <div class="team-category">
      <h2 class="category-title">${categoryName}</h2>
      <div class="members-grid">`;

    members.forEach((data) => {
        categoryHTML += `
        <div class="member-card">
          <div class="circle-wrapper">
            <div class="image-container">
              <img src="${data.image}" class="profile-img" />
              <div class="blur-overlay"></div>
              <div class="social-icons">
                <a href="${data.linkedin}" target="_blank">
                  <img src="../imgs/linkedin.png" alt="linkedin" />
                </a>
              </div>
            </div>
          </div>
          <h3>${data.name}</h3>
          ${data.role ? `<p>${data.role}</p>` : ''}
        </div>`;
    });

    categoryHTML += `
      </div>
    </div>`;

    container.insertAdjacentHTML('beforeend', categoryHTML);
}

fetchAndRenderRockets('.members-section');