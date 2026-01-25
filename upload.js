import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    setPersistence,
    browserSessionPersistence
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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
// Initialize Firebase
const auth = getAuth(app);
const db = getFirestore(app);

// DOM Elements
const loginSection = document.getElementById('login-section');
const uploadSection = document.getElementById('upload-section');
const loginBtn = document.getElementById('login-btn');
const uploadBtn = document.getElementById('upload-btn');
const logoutBtn = document.getElementById('logout-btn'); // Ensure this ID exists in your HTML
const rocketList = document.getElementById('rocket-list');

// --- 2. AUTHENTICATION LOGIC ---

// Handle Login with Session Persistence
loginBtn.addEventListener('click', async () => {
    const email = document.getElementById('admin-email').value;
    const pass = document.getElementById('admin-password').value;

    try {
        // This ensures the session is destroyed when the tab is closed
        await setPersistence(auth, browserSessionPersistence);
        await signInWithEmailAndPassword(auth, email, pass);
        alert("Login Successful!");
    } catch (e) {
        alert("Login Error: " + e.message);
    }
});

// Handle Logout
if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
        try {
            await signOut(auth);
            alert("Logged out!");
        } catch (e) {
            console.error(e);
        }
    });
}

// Monitor Auth State
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in
        loginSection.classList.add('hidden');
        uploadSection.classList.remove('hidden');
    } else {
        // User is signed out
        loginSection.classList.remove('hidden');
        uploadSection.classList.add('hidden');
    }
});

// --- 3. FIRESTORE DATA LOGIC ---

// Upload Project
uploadBtn.addEventListener('click', async () => {
    const data = {
        mainSrc: document.getElementById('rocket-img').value,
        iconSrc: document.getElementById('rocket-icon').value,
        title: document.getElementById('rocket-title').value,
        description: document.getElementById('rocket-desc').value,
        createdAt: new Date() // Useful for sorting
    };

    try {
        await addDoc(collection(db, "projects"), data);
        alert("Rocket Uploaded Successfully!");
        // Clear form fields
        document.getElementById('rocket-img').value = '';
        document.getElementById('rocket-icon').value = '';
        document.getElementById('rocket-title').value = '';
        document.getElementById('rocket-desc').value = '';
    } catch (e) {
        console.error("Upload failed: ", e);
        alert("Error uploading data.");
    }
});

