import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  // -------------------------------------------------------------------------
  // DEPLOYMENT CONFIGURATION (Choose One)
  // -------------------------------------------------------------------------

  // OPTION 1: If deploying to NETLIFY (Recommended)
  // Keep base as '/' or remove it entirely.
  base: "/",

  // OPTION 2: If deploying to GITHUB PAGES
  // You MUST change this to match your repository name.
  // Based on your previous command, your repo is 'rocket', so use:
  // base: '/rocket/',

  // -------------------------------------------------------------------------

  build: {
    outDir: "dist", // Standard output folder
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        members: resolve(__dirname, "members/members.html"),
        projects: resolve(__dirname, "projects/projects.html"),
        sponsors: resolve(__dirname, "sponsors/sponsors.html"),
        archive: resolve(__dirname, "archive/archive.html"),
        contact: resolve(__dirname, "contact-us/contacus.html"),
        admin: resolve(__dirname, "admin/admin.html"),
      },
    },
  },
});
