import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  // This project page is served at https://teuncm.nl/skipper/.
  base: "/skipper/",
  plugins: [vue(), tailwindcss()],
});
