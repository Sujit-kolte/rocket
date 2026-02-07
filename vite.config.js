import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        members: resolve(__dirname, 'members/members.html'),
        projects: resolve(__dirname, 'projects/projects.html'),
        sponsors: resolve(__dirname, 'sponsors/sponsors.html'),
        archive: resolve(__dirname, 'archive/archive.html'),
        contact: resolve(__dirname, 'contact-us/contacus.html'),
        admin: resolve(__dirname, 'admin/admin.html'),
      }
    }
  }
})