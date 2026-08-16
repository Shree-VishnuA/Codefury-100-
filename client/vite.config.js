import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// Global patch to prevent Vite dev server's getHtmlFilename from crashing on Windows paths containing '%' (e.g. codefury-100%\client)
const nativeDecodeURI = globalThis.decodeURI;
const nativeDecodeURIComponent = globalThis.decodeURIComponent;

globalThis.decodeURI = function (str) {
  try {
    return nativeDecodeURI(str);
  } catch (e) {
    if (typeof str === "string") {
      return nativeDecodeURI(str.replace(/%(?![0-9a-fA-F]{2})/g, "%25"));
    }
    throw e;
  }
};

globalThis.decodeURIComponent = function (str) {
  try {
    return nativeDecodeURIComponent(str);
  } catch (e) {
    if (typeof str === "string") {
      return nativeDecodeURIComponent(str.replace(/%(?![0-9a-fA-F]{2})/g, "%25"));
    }
    throw e;
  }
};

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
});
