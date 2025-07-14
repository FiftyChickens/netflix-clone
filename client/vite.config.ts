import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // Add this import
import { fileURLToPath } from "url"; // For __dirname replacement

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
