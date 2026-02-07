import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        // --- HTML PAGES (Your Website Pages) ---
        main: resolve(__dirname, 'index.html'),
        projects: resolve(__dirname, 'projects/projects.html'),
        sponsors: resolve(__dirname, 'sponsors/sponsors.html'),
        contact: resolve(__dirname, 'contact-us/contacus.html'),
        members: resolve(__dirname, 'members/members.html'),
        admin: resolve(__dirname, 'admin/admin.html'),
        archive: resolve(__dirname, 'archive/archive.html'),

        // --- EXTRA ASSETS (Force these to build) ---
        // Only keep these if they are NOT already linked in your HTML files!
        // If index.html already links to main.js, you can remove 'mainJS' below.
        
        mainJS: resolve(__dirname, 'main.js'),
        indexJS: resolve(__dirname, 'index.js'),
        subsystems: resolve(__dirname, 'subsystems.js'),
        stars: resolve(__dirname, 'stars.js'),
        
        // CSS is usually auto-discovered, but you can force it here:
        globalStyle: resolve(__dirname, 'style.css'),
      },
    },
  },
});