import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const githubRepoName = process.env.GITHUB_REPOSITORY?.split("/")[1];

export default defineConfig({
  base: process.env.BASE_PATH || (githubRepoName ? `/${githubRepoName}/` : "/"),
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
  },
});
