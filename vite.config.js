import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  // The custom GitHub Pages domain serves the site from its root.
  base: "/",
  plugins: [vue(), tailwindcss()],
});
