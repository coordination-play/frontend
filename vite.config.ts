import path from "path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import { VitePWA, ManifestOptions } from "vite-plugin-pwa";

const PWAManifestConfig: Partial<ManifestOptions> = {
  name: "Coordination",
  short_name: "Coordination",
  description: "Coordination Play",
  theme_color: "#262626",
  background_color: "#262626",
  screenshots: [
    {
      sizes: "1920x960",
      src: "screenshot.png",
      form_factor: "wide",
    },
    {
      sizes: "1920x960",
      src: "screenshot.png",
      form_factor: "narrow",
    },
  ],
  icons: [
    {
      src: "pwa-192x192.png",
      sizes: "192x192",
      type: "image/png",
    },
    {
      src: "pwa-512x512.png",
      sizes: "512x512",
      type: "image/png",
    },
    {
      src: "pwa-512x512.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "any",
    },
    {
      src: "maskable-icon.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "maskable",
    },
  ],
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true, // <== to enable PWA on dev
      },
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.png"],
      manifest: PWAManifestConfig,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
