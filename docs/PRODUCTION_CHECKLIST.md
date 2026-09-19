# Production Checklist

Prior to final deployment, ensure the following checklist is completed:

## 1. Environment Variables
- [ ] `VITE_SUPABASE_URL` is set to the production Supabase project URL.
- [ ] `VITE_SUPABASE_ANON_KEY` is set to the production Anon key.
- [ ] `SUPABASE_SERVICE_ROLE_KEY` is securely set **only** in the Supabase Edge Functions secrets (`supabase secrets set SUPABASE_SERVICE_ROLE_KEY=...`).
- [ ] Verify that no `.env.local` files containing sensitive data are committed.

## 2. Database
- [ ] Run all migrations (`supabase db push`).
- [ ] Verify Row Level Security (RLS) is enabled and restrictive.
- [ ] Setup scheduled backups in the Supabase Dashboard.

## 3. SEO & Analytics
- [ ] Verify `index.html` OpenGraph meta tags reflect the final domain and branding.
- [ ] Ensure `robots.txt` and `sitemap.xml` are generated (if needed).
- [ ] Integrate analytics tracking (e.g., Google Analytics, Vercel Analytics) if desired.

## 4. Edge Functions
- [ ] Deploy Edge Functions to production: `supabase functions deploy github-stats`, `codeforces-stats`, `leetcode-stats`.
- [ ] Verify CORS headers match the production origin.

## 5. Build & Hosting
- [ ] Run `npm run build` and ensure there are no TypeScript or ESLint errors.
- [ ] Verify that the `dist/` bundle size is within acceptable limits (no large chunks).
- [ ] Deploy to the hosting provider (e.g., Vercel, Netlify, AWS).
- [ ] Configure rewrite rules for Single Page Application (SPA) routing (e.g., redirect all traffic to `index.html`).
