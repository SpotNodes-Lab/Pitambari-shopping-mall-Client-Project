import fs from "node:fs";
import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import type { Plugin } from "vite";

/** Public marketing-site origin (no trailing slash). Used for sitemap + robots.txt on production build. */
const DEFAULT_SITE_URL = "https://www.pitambariindia.com";

/**
 * Public indexable routes (see `App.tsx`). Rebuild (`yarn build`) after edits.
 * Omit `/rewards/:token` — dynamic loyalty pages must not be bulk-listed.
 */
const SITEMAP_ENTRIES: readonly { path: string; priority: string }[] = [
  { path: "/", priority: "1.0" },
  { path: "/about", priority: "0.8" },
  { path: "/gallery", priority: "0.8" },
  { path: "/showrooms", priority: "0.8" },
  { path: "/showrooms/pitambari-jewel-studio", priority: "0.8" },
  { path: "/showrooms/virasat", priority: "0.8" },
  { path: "/contact", priority: "0.8" },
  { path: "/rewards/scan", priority: "0.6" },
];

const FAVICON_SRC = path.resolve(
  __dirname,
  "src/assets/pitambri-logo-removebg-preview.png",
);

function normalizeOrigin(raw: string): string {
  return raw.replace(/\/$/, "");
}

function buildSitemapXml(siteOrigin: string): string {
  const base = normalizeOrigin(siteOrigin);
  const lastmod = new Date().toISOString().slice(0, 10);
  const urlEntries = SITEMAP_ENTRIES.map(({ path: pathname, priority }) => {
    const loc = pathname === "/" ? `${base}/` : `${base}${pathname}`;
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
  }).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`;
}

function buildRobotsTxt(siteOrigin: string): string {
  const base = normalizeOrigin(siteOrigin);
  return `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`;
}

/**
 * Same canonical origin as production `dist/` (VITE_SITE_URL or default).
 * Dev server only *serves* the file at localhost; `<loc>` must stay the live domain for SEO.
 */
function pitambariSeoPlugin(siteOrigin: string): Plugin {
  return {
    name: "pitambari-seo",
    buildStart() {
      fs.copyFileSync(
        FAVICON_SRC,
        path.resolve(__dirname, "public/favicon.png"),
      );
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const pathname = req.url?.split("?")[0] ?? "";
        if (pathname === "/sitemap.xml") {
          res.setHeader("Content-Type", "application/xml; charset=utf-8");
          res.end(buildSitemapXml(siteOrigin));
          return;
        }
        if (pathname === "/robots.txt") {
          res.setHeader("Content-Type", "text/plain; charset=utf-8");
          res.end(buildRobotsTxt(siteOrigin));
          return;
        }
        next();
      });
    },
    writeBundle() {
      const outDir = path.resolve(__dirname, "dist");
      fs.writeFileSync(
        path.join(outDir, "sitemap.xml"),
        buildSitemapXml(siteOrigin),
        "utf8",
      );
      fs.writeFileSync(
        path.join(outDir, "robots.txt"),
        buildRobotsTxt(siteOrigin),
        "utf8",
      );
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const siteOrigin = env.VITE_SITE_URL?.trim() || DEFAULT_SITE_URL;

  return {
    plugins: [react(), pitambariSeoPlugin(siteOrigin)],
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
  };
});
