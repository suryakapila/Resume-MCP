import { reactRouter } from "@react-router/dev/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    // (Tailwind removed — the Classical design system carries all styling.)
    reactRouter(),
  ],
  resolve: {
    tsconfigPaths: true,
  },
  server: {
    fs: {
      // Allow importing the single-source resume.json from the repo root,
      // which sits one level above this Vite root (site/).
      allow: [".."],
    },
  },
});
