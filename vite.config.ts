import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  build: {
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("react-dom") || id.includes("react-router"))
            return "vendor-react";
          if (id.includes("/react/")) return "vendor-react";
          if (id.includes("styled-components")) return "vendor-styled";
          if (id.includes("framer-motion")) return "vendor-motion";
        },
      },
    },
  },
  server: {
    proxy: {
      // Pitambari-backend (GET /api/v1/content/homepage, etc.). Use the same PORT as your CMS server.
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
