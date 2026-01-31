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
    getDocs,
    doc,
    updateDoc,
    deleteDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase Config
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
const auth = getAuth(app);
const db = getFirestore(app);

// State
let currentDomain = '';
let currentEditId = null;

// Domain Field Configurations
const domainFields = {
    projects: [
        { name: 'mainSrc', label: 'Main Image URL', type: 'text' },
        { name: 'iconSrc', label: 'Icon URL', type: 'text' },
        { name: 'title', label: 'Title', type: 'text' },
        { name: 'description', label: 'Description', type: 'textarea' }
    ],
    members: [
        { name: 'image', label: 'Profile Image URL', type: 'text' },
        { name: 'name', label: 'Name', type: 'text' },
        { name: 'category', label: 'Category', type: 'text' },
        { name: 'role', label: 'Role/Subsystem', type: 'text' },
        { name: 'linkedin', label: 'LinkedIn URL', type: 'text' }
    ],
    sponsors: [
        { name: 'image', label: 'Logo URL', type: 'text' },
        { name: 'name', label: 'Sponsor Name', type: 'text' },
        { name: 'category', label: 'Tier', type: 'text' },
        { name: 'link', label: 'Website URL', type: 'text' },
        { name: 'customId', label: 'Custom ID (optional)', type: 'text' },
        { name: 'customClass', label: 'Custom Class (optional)', type: 'text' }
    ],
    contact: [
        { name: 'subheading', label: 'Subheading Text', type: 'text' },
        { name: 'phone', label: 'Phone Number', type: 'text' },
        { name: 'country', label: 'Country Code', type: 'text' },
        { name: 'who', label: 'Who to Contact', type: 'text' }
    ],
    archive: [
        { name: 'image', label: 'Image URL', type: 'text' },
        { name: 'year', label: 'Year', type: 'text' },
        { name: 'title', label: 'Title', type: 'text' },
        { name: 'description', label: 'Description', type: 'textarea' }
    ]
};

// DOM Elements
const loginSection = document.getElementById('login-section');
const dashboardSection = document.getElementById('dashboard-section');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const domainSelect = document.getElementById('domain-select');
const addNewBtn = document.getElementById('add-new-btn');
const cardsContainer = document.getElementById('cards-container');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('close-modal');
const itemForm = document.getElementById('item-form');
const modalTitle = document.getElementById('modal-title');
const formFields = document.getElementById('form-fields');

// Authentication
loginBtn.addEventListener('click', async () => {
    const email = document.getElementById('admin-email').value;
    const pass = document.getElementById('admin-password').value;

    try {
        await setPersistence(auth, browserSessionPersistence);
        await signInWithEmailAndPassword(auth, email, pass);
        alert("Login Successful!");
    } catch (e) {
        alert("Login Error: " + e.message);
    }
});

logoutBtn.addEventListener('click', async () => {
    try {
        await signOut(auth);
        alert("Logged out!");
    } catch (e) {
        console.error(e);
    }
});

onAuthStateChanged(auth, (user) => {
    if (user) {
        loginSection.classList.add('hidden');
        dashboardSection.classList.remove('hidden');
    } else {
        loginSection.classList.remove('hidden');
        dashboardSection.classList.add('hidden');
    }
});

// Domain Selection
domainSelect.addEventListener('change', (e) => {
    currentDomain = e.target.value;
    if (currentDomain) {
        loadCards();
    } else {
        cardsContainer.innerHTML = `
            <div class="empty-state">
                <h3>Select a domain to view cards</h3>
                <p>Choose a domain from the dropdown above</p>
            </div>
        `;
    }
});

// Load Cards
async function loadCards() {
    if (!currentDomain) return;

    try {
        const querySnapshot = await getDocs(collection(db, currentDomain));

        if (querySnapshot.empty) {
            cardsContainer.innerHTML = `
                <div class="empty-state">
                    <h3>No items found</h3>
                    <p>Click "Add New" to create your first item</p>
                </div>
            `;
            return;
        }

        cardsContainer.innerHTML = '<div class="cards-grid"></div>';
        const grid = cardsContainer.querySelector('.cards-grid');

        querySnapshot.forEach((docSnap) => {
            const data = docSnap.data();
            const isEnabled = data.enabled !== false;

            const card = createCard(docSnap.id, data, isEnabled);
            grid.appendChild(card);
        });
    } catch (error) {
        console.error("Error loading cards:", error);
        alert("Error loading data");
    }
}

// Create Card Element
function createCard(id, data, isEnabled) {
    const card = document.createElement('div');
    card.className = `data-card ${isEnabled ? '' : 'disabled'}`;

    let cardContent = '';

    // Toggle Switch
    cardContent += `
        <div class="toggle-container">
            <div class="toggle-switch ${isEnabled ? 'active' : ''}" data-id="${id}"></div>
        </div>
    `;

    // Card content based on domain
    if (currentDomain === 'projects') {
        cardContent += `
            <div class="card-images">
            <img src="${data.mainSrc || ''}" class="card-image" alt="${data.title || ''}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'200\'%3E%3Crect fill=\'%23334155\' width=\'200\' height=\'200\'/%3E%3C/svg%3E'">
            <img src="${data.iconSrc || ''}" class="card-image" alt="${data.title || ''}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'200\'%3E%3Crect fill=\'%23334155\' width=\'200\' height=\'200\'/%3E%3C/svg%3E'">
            </div>
            <div class="card-title">${data.title || 'Untitled'}</div>
            <div class="card-description">${data.description || ''}</div>
        `;
    } else if (currentDomain === 'members') {
        cardContent += `
            <img src="${data.image || ''}" class="card-image" alt="${data.name || ''}" onerror="this.src=''">
            <div class="card-title">${data.name || 'Unnamed'}</div>
            <div class="card-subtitle">${data.category || ''}</div>
            <div class="card-subtitle">${data.role || ''}</div>
        `;
    } else if (currentDomain === 'sponsors') {
        cardContent += `
            <img src="${data.image || ''}" class="card-image" alt="${data.name || ''}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'200\'%3E%3Crect fill=\'%23334155\' width=\'200\' height=\'200\'/%3E%3C/svg%3E'">
            <div class="card-title">${data.name || 'Unnamed'}</div>
            <div class="card-subtitle">${data.category || ''}</div>
        `;
    } else if (currentDomain === 'contact') {
        cardContent += `
            <div class="card-title">Contact Information</div>
            <div class="card-description">Subheading: ${data.subheading || ''}</div>
            <div class="card-description">Who to Contact: ${data.who || ''}</div>
            <div class="card-description">Phone: ${data.country || '+91'} ${data.phone || ''}</div>
        `;
    } else if (currentDomain === 'archive') {
        cardContent += `
            <div class="card-title">${data.title || 'Unnamed'}</div>
            <div class="card-description">${data.description || ''}</div>
            <div class="card-subtitle">Year: ${data.year || ''}</div>
            <img src="${data.image || ''}" class="card-image" alt="${data.title || ''}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'200\'%3E%3Crect fill=\'%23334155\' width=\'200\' height=\'200\'/%3E%3C/svg%3E'">
        `;
    }

    cardContent += `
        <div class="card-actions">
            <button class="btn-warning edit-btn" data-id="${id}">Edit</button>
            <button class="btn-danger delete-btn" data-id="${id}">Delete</button>
        </div>
    `;

    card.innerHTML = cardContent;

    // Event Listeners
    const toggleSwitch = card.querySelector('.toggle-switch');
    toggleSwitch.addEventListener('click', () => toggleCard(id, !isEnabled));

    const editBtn = card.querySelector('.edit-btn');
    editBtn.addEventListener('click', () => openEditModal(id, data));

    const deleteBtn = card.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => deleteCard(id));

    return card;
}

// Toggle Card Enable/Disable
async function toggleCard(id, enabled) {
    try {
        await updateDoc(doc(db, currentDomain, id), { enabled });
        loadCards();
    } catch (error) {
        console.error("Error toggling card:", error);
        alert("Error updating card");
    }
}

// Add New Button
addNewBtn.addEventListener('click', () => {
    if (!currentDomain) {
        alert("Please select a domain first");
        return;
    }
    openAddModal();
});

// Open Add Modal
function openAddModal() {
    currentEditId = null;
    modalTitle.textContent = 'Add New Item';
    generateFormFields();
    modal.classList.add('active');
}

// Open Edit Modal
function openEditModal(id, data) {
    currentEditId = id;
    modalTitle.textContent = 'Edit Item';
    generateFormFields(data);
    modal.classList.add('active');
}

// Generate Form Fields
function generateFormFields(data = {}) {
    const fields = domainFields[currentDomain];
    formFields.innerHTML = '';

    fields.forEach(field => {
        const group = document.createElement('div');
        group.className = 'form-group';

        const label = document.createElement('label');
        label.textContent = field.label;
        group.appendChild(label);

        let input;
        if (field.type === 'textarea') {
            input = document.createElement('textarea');
            input.rows = 4;
        } else {
            input = document.createElement('input');
            input.type = field.type;
        }

        input.name = field.name;
        input.value = data[field.name] || '';
        input.placeholder = field.label;

        group.appendChild(input);
        formFields.appendChild(group);
    });
}

// Close Modal
closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});

// Form Submit
itemForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = { enabled: true };

    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }

    // Set defaults
    if (currentDomain === 'members' && !data.role) {
        data.role = '';
    }
    if (currentDomain === 'contact' && !data.country) {
        data.country = '+91';
    }
    if (currentDomain === 'who' && !data.who) {
        data.who = 'Team Lead';
    }
    if (currentDomain === 'sponsors' && !data.link) {
        data.link = '#';
    }
    if (currentDomain === 'archive' && !data.year) {
        data.year = '';
    }


    try {
        if (currentEditId) {
            await updateDoc(doc(db, currentDomain, currentEditId), data);
            alert("Item updated successfully!");
        } else {
            await addDoc(collection(db, currentDomain), data);
            alert("Item added successfully!");
        }

        modal.classList.remove('active');
        loadCards();
    } catch (error) {
        console.error("Error saving item:", error);
        alert("Error saving item");
    }
});

// Delete Card
async function deleteCard(id) {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
        await deleteDoc(doc(db, currentDomain, id));
        alert("Item deleted successfully!");
        loadCards();
    } catch (error) {
        console.error("Error deleting item:", error);
        alert("Error deleting item");
    }
}