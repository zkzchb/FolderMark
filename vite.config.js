import { defineConfig } from "vite";

function normalizeBasePath(value) {
  let base = String(value ?? "/").trim() || "/";
  if (!base.startsWith("/")) {
    base = `/${base}`;
  }
  base = base.replace(/\/{2,}/g, "/");
  if (!base.endsWith("/")) {
    base += "/";
  }
  return base;
}

export default defineConfig({
  base: normalizeBasePath(process.env.FOLDERMARK_BASE_PATH),
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
