import axios from 'axios';

/**
 * Axios `baseURL` must end with `/api` because requests use paths like `v1/qr-codes/public`.
 * Admin UI defaults to `http://localhost:4000` and appends `/api/v1` in code — if you copy that
 * host into the storefront as `VITE_API_URL=http://localhost:4000`, we add `/api` so both match.
 */
function resolveCmsApiBase(): string {
  const raw = (import.meta.env.VITE_API_URL as string | undefined)?.trim() ?? '';
  const base = raw.replace(/\/$/, '');
  if (!base) return '/api';
  if (base === '/api') return '/api';
  if (/^https?:\/\//i.test(base)) {
    return base.endsWith('/api') ? base : `${base}/api`;
  }
  return base;
}

const resolvedBase = resolveCmsApiBase();

/**
 * Dev: `/api` + Vite proxy → Pitambari-backend.
 * Production (Vercel, etc.): set `VITE_API_URL` to your API host (`https://…`); `/api` is added if missing.
 * Relative `/api` on a static host is not your CMS unless you add a rewrite.
 */
if (import.meta.env.PROD && resolvedBase === '/api') {
  console.warn(
    '[Pitambari CMS] VITE_API_URL is not set. Public QR/homepage requests use /api, which only works with the Vite dev proxy. Set VITE_API_URL in your host (e.g. Vercel) to your Pitambari-backend base URL ending in /api.',
  );
}

// Create Axios Instance
export const apiClient = axios.create({
  baseURL: resolvedBase,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Interceptors (e.g., attaching auth token for secure routes)
apiClient.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers['Authorization'] = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);
