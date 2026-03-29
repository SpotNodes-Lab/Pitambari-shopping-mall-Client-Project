# Pitambari (React + TypeScript + Vite + Rewards API)

This project now includes:

- Frontend: React + Vite
- Rewards backend API: Node.js + Express + MongoDB (Mongoose)
- QR-based loyalty flow (QR/share link -> customer views points)

## Prerequisites

1. Node.js `18+`
2. npm (comes with Node.js)

## Install dependencies

```bash
npm install
```

## Environment variables

Create `.env` in the project root:

```bash
MONGODB_URI=mongodb://127.0.0.1:27017/pitambari_rewards
PORT=4000
WEB_BASE_URL=http://localhost:5173
```

Optional **homepage CMS** (Pitambari-backend):

```bash
# Default: same-origin /api (Vite proxies to CMS — see vite.config.ts)
VITE_API_URL=/api
```

The home **banner** (`BannerSection`), **Curated Categories**, and **Reels / YouTube strips** (`ReelsSection` via `useDataStore` → `reelsClips` / `youtubeClips`) use `GET /api/v1/content/homepage`: `data.mainBanner`, `data.categories.items`, `data.reels.items`, and `data.youtube.items` (each item: `title`, `url`). Invalid or empty lists fall back to bundled assets (`CURATED_CATEGORIES_FALLBACK`, `INSTAGRAM_REELS_STATIC_FALLBACK`, `YOUTUBE_SHORTS_STATIC_FALLBACK`). CMS Instagram URLs must match `instagram.com/reel/`, `/reels/`, or `/p/`; YouTube links use the same rules as the backend (watch, Shorts, embed, `youtu.be`). Static Instagram reel fallbacks use bundled MP4s under `src/assets/reels/`; YouTube uses real Shorts URLs. Live CMS rows may also use MP4s or optional `videoUrl` for native preview. See `USER_WEB_API.md` in the monorepo root.

**Note:** `vite` proxies `/api` to `http://localhost:4000`. Run **Pitambari-backend** on that port for CMS, or change the proxy target / set `VITE_API_URL` to your CMS base (must include `/api` path prefix, e.g. `https://cms.example.com/api`).

### Deploying the storefront (e.g. Vercel) — CMS + QR must reach the API

The homepage and **Rewards QR** block call `GET /api/v1/content/homepage` and `GET /api/v1/qr-codes/public`. In **production**, `VITE_API_URL=/api` **does not** forward to your backend (that only works in `npm run dev`).

1. In the **Vercel** (or other) project **Environment Variables**, set:

   `VITE_API_URL` = `https://<your-pitambari-backend-host>/api`

   (Same URL you use for the admin app’s `VITE_API_URL`, if applicable.)

2. **Redeploy** the client after changing env vars (Vite bakes `VITE_*` in at build time).

3. On **Pitambari-backend**, set `CORS_ORIGINS` to your live storefront origin (comma-separated), e.g. `https://shopping-mall-client-proj.vercel.app`, or use `*` only for testing.

If this is missing, the site keeps **static fallbacks** (generic QR to `/rewards/scan`, demo copy) even when the admin shows real QR rows.

Notes:

- `WEB_BASE_URL` is used when generating the customer QR/reward URL.
- Frontend calls `/api/*`, and Vite proxies it to `http://localhost:4000` by default.

## Run the app (development)

```bash
npm run dev
```

Open the URL shown in your terminal (by default: `http://localhost:5173`).

In another terminal, run the rewards API:

```bash
npm run dev:server
```

## Build for production

```bash
npm run build
```

Output goes to `dist/` (already ignored by Git).

## Preview the production build

```bash
npm run preview
```

## Lint

```bash
npm run lint
```

## Rewards System Routes

- Customer landing (scan fallback): `/rewards/scan`
- Customer points page (QR target): `/rewards/:token`

## Implemented Rewards Features

- Unique secure token per customer (`crypto.randomBytes`), used in QR URL
- Demo QR section with static QR + text (no admin panel route)
- Customer mobile-friendly page shows name, points, tier, recent activity
- Optional contact export via VCF download
- WhatsApp sharing for reward links
- Loyalty tiers:
  - Starter (< 200)
  - Silver (200+)
  - Gold (500+)

## Deployment Notes

1. Deploy frontend (Vercel/Netlify) as usual.
2. Deploy backend (`server/index.js`) to any Node host (Render/Railway/Fly/VM).
3. Set backend env vars (`MONGODB_URI`, `PORT`, `WEB_BASE_URL`).
4. If frontend and backend are on different domains, either:
   - update Vite/prod API base handling, or
   - place both behind the same domain and route `/api` to backend.
