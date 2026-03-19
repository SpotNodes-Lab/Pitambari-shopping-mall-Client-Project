# Pitambari (React + TypeScript + Vite)

This folder contains the Pitambari frontend (React + TypeScript + Vite + Tailwind).

## Prerequisites

1. Node.js `18+`
2. npm (comes with Node.js)

## Install dependencies

```bash
npm install
```

## Environment variable (optional)

The app uses `VITE_API_URL` for its API base URL:

- Default (if you do nothing): `/api`

To override it, create a file named `.env` in this project directory:

```bash
VITE_API_URL=http://localhost:3000/api
```

## Run the app (development)

```bash
npm run dev
```

Open the URL shown in your terminal (by default: `http://localhost:5173`).

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
