/// <reference types="vitest" />
//
import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

import tsconfigPaths from "vite-tsconfig-paths";

installGlobals();

export default defineConfig({
  plugins: [!process.env.VITEST ? remix() : react(), tsconfigPaths()],
  server: {
    port: 3000
  },
  test: {
    globals: true,
    css: true, 
    environment: "jsdom",
    env: loadEnv("test", process.cwd(), ""),
    setupFiles: ['./app/lib/setupTest.ts'],
  },
});
