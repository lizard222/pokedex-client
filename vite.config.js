import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  // относительные пути, чтобы сборка работала на GitHub Pages
  base: "./",
});
