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

Notes:

- `WEB_BASE_URL` is used when generating the customer QR/reward URL.
- Frontend calls `/api/*`, and Vite proxies it to `http://localhost:4000`.

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
