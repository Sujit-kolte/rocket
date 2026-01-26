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

// Fetch and Render Sponsors
async function fetchAndRenderSponsors(targetSelector) {
    const container = document.querySelector(targetSelector);

    if (!container) return;

    try {
        const querySnapshot = await getDocs(collection(db, "sponsors"));

        // Clear container to prevent duplicates
        container.innerHTML = '';

        // Group sponsors by tier/category
        const categorizedSponsors = {};

        querySnapshot.forEach((doc) => {
            const data = doc.data();

            // Set any undefined fields to empty string
            if (data.link === undefined) data.link = "#";
            if (data.customClass === undefined) data.customClass = "";
            if (data.customId === undefined) data.customId = "";

            if (!categorizedSponsors[data.category]) {
                categorizedSponsors[data.category] = [];
            }
            categorizedSponsors[data.category].push(data);
        });

        // Define the order of sponsor tiers
        const tierOrder = [
            "Platinum Sponsors",
            "Gold Sponsors",
            "Silver Sponsors",
            "Bronze Sponsors",
            "Entry Level Sponsors",
            "Mentors"
        ];

        // Render categories in order
        tierOrder.forEach((tier) => {
            if (categorizedSponsors[tier]) {
                renderSponsorCategory(tier, categorizedSponsors[tier], container);
            }
        });

        // Render any remaining categories not in tierOrder
        Object.keys(categorizedSponsors).forEach((category) => {
            if (!tierOrder.includes(category)) {
                renderSponsorCategory(category, categorizedSponsors[category], container);
            }
        });

    } catch (error) {
        console.error("Error fetching sponsors:", error);
    }
}

function renderSponsorCategory(categoryName, sponsors, container) {
    const isPlatinum = categoryName === "Platinum Sponsors";
    const isMentors = categoryName === "Mentors";
    const categoryId = isMentors ? 'id="mentors"' : '';

    let categoryHTML = `
    <div class="team-category" ${categoryId}>
      <h2 class="category-title">${categoryName}</h2>`;

    // Add break for Gold and Bronze sponsors
    if (categoryName === "Gold Sponsors" || categoryName === "Bronze Sponsors") {
        categoryHTML += `<br />`;
    }

    // Platinum sponsors use different structure (no grid)
    if (isPlatinum) {
        sponsors.forEach((data) => {
            categoryHTML += `
        <div class="sponsor-card">
          <a href="${data.link}" target="_blank">
            <img src="${data.image}" alt="${data.name}" ${data.customId ? `id="${data.customId}"` : ''} />
          </a>
          <h3 ${data.customId ? `id="${data.customId}head"` : ''}>${data.name}</h3>
        </div>`;
        });
    } else {
        // Other categories use grid
        categoryHTML += `<div class="sponsors-grid">`;

        sponsors.forEach((data) => {
            const cardClass = data.customClass || 'sponsor-card';
            categoryHTML += `
          <div class="${cardClass}">
            <a href="${data.link}" target="_blank">
              <img src="${data.image}" alt="${data.name}" ${data.customId ? `id="${data.customId}"` : ''} ${data.customClass ? `class="${data.customClass}"` : ''} />
            </a>
            <h3 ${data.customClass ? `class="${data.customClass}"` : ''} ${data.customId ? `id="${data.customId}text"` : ''}>${data.name}</h3>`;

            // Add extra breaks for specific sponsors
            if (data.name === "Mr. Akash Sureka" || data.name === "Freshco Goli Soda") {
                categoryHTML += `<br /><br />`;
            } else if (data.name === "Freshco Goli Soda") {
                categoryHTML += `<br />`;
            }

            categoryHTML += `
          </div>`;
        });

        categoryHTML += `</div>`;
    }

    categoryHTML += `
    </div>`;

    container.insertAdjacentHTML('beforeend', categoryHTML);
}

fetchAndRenderSponsors('.sponsors-section');