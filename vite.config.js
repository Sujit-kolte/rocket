import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        // The key (e.g., 'main') is just a name, the value is the path to the file
        main: resolve(__dirname, 'index.html'),
        projects: resolve(__dirname, 'projects/projects.html'),
        sponsors: resolve(__dirname, 'sponsors/sponsors.html'),
        // Note: I used your exact filename 'contacus.html' below
        contact: resolve(__dirname, 'contact-us/contacus.html'), 
        members: resolve(__dirname, 'members/members.html'),
        admin: resolve(__dirname, 'admin/admin.html'),
        archive: resolve(__dirname, 'archive/archive.html'),
      },
    },
  },
});