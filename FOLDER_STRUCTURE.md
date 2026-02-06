# STES Rocketry Website - Folder Structure Analysis

## Overview
This is a **Vite-based static website** with a **Node.js/Express backend** for handling contact form submissions.

## Project Structure

```
Stes-Rocketry-Website/
│
├── 📁 Frontend (Static Site)
│   ├── index.html              # Main homepage
│   ├── projects/               # Projects page
│   ├── members/                # Team members page
│   ├── sponsors/               # Sponsors page
│   ├── contact-us/             # Contact form page
│   ├── archive/                # Archive page (commented out)
│   ├── admin/                  # Admin page
│   ├── imgs/                   # All images and assets
│   ├── style.css               # Main stylesheet
│   ├── page-transition.css/js  # Page transition animations
│   └── stars.js                # Background star animation
│
├── 📁 Backend (Node.js/Express)
│   ├── index.js                # Express server (handles /send API)
│   └── backend/                 # Empty folder (reserved for future use)
│
├── 📁 Build Output
│   └── dist/                    # Vite build output (generated)
│       ├── index.html
│       ├── assets/              # Compiled JS/CSS/images
│       └── projects/
│
├── 📁 Configuration Files
│   ├── package.json            # Dependencies and scripts
│   ├── vite.config.js          # Vite build configuration
│   ├── render.yaml             # Render deployment config (NEW)
│   └── .env                    # Environment variables (not in repo)
│
└── 📁 Other Files
    ├── README.md
    ├── DEPLOYMENT.md           # Deployment guide (NEW)
    ├── sitemap.xml             # SEO sitemap
    ├── robots.txt              # SEO robots file
    └── google9e877a4835bb373d.html  # Google verification
```

## Technology Stack

### Frontend
- **Build Tool**: Vite 7.3.1
- **Animations**: GSAP (GreenSock Animation Platform)
- **Database**: Firebase Firestore (for contact form data)
- **Styling**: Vanilla CSS
- **JavaScript**: ES6 Modules

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Email**: Nodemailer (Gmail SMTP)
- **Environment**: dotenv for config

## Key Features

1. **Multi-page Static Site**
   - Homepage with hero section, subsystems, stats
   - Projects showcase
   - Team members directory
   - Sponsors page
   - Contact form

2. **Backend API**
   - POST `/send` endpoint for contact form submissions
   - Sends emails via Gmail SMTP

3. **Build Process**
   - Vite bundles and optimizes assets
   - Outputs to `dist/` folder
   - Express serves static files from `dist/`

## Build Scripts

- `npm run dev` - Development server (Vite dev server)
- `npm run build` - Build for production (creates `dist/` folder)
- `npm start` - Start production server (Express serves `dist/`)
- `npm run preview` - Preview production build locally

## Environment Variables Required

For the backend to work, you need:
- `EMAIL_USER` - Your Gmail address
- `EMAIL_PASS` - Gmail App Password (16 characters)
- `PORT` - Server port (auto-set by Render, defaults to 3000)

For Firebase (if used):
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_FIREBASE_MEASUREMENT_ID`

## Dependencies

### Production Dependencies
- `express` - Web server framework
- `nodemailer` - Email sending
- `cors` - Cross-origin resource sharing
- `body-parser` - Request body parsing
- `dotenv` - Environment variable management
- `firebase` - Firebase SDK (for Firestore)
- `gsap` - Animation library
- `vite` - Build tool

## Notes

- The contact form currently uses Netlify form attributes but also has a backend API endpoint
- The backend serves static files from the `dist/` folder after build
- All routes fall back to `index.html` for SPA-like behavior
- Images and assets are in the `imgs/` folder and get bundled during build

