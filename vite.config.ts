import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    "process.env": process.env,
  },
  plugins: [react()],
  base: "/admin",
  build: {
    // Enable dynamic imports
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
});
