# Vishal Chauhan - Developer Portfolio

A highly polished, interactive, and production-ready personal portfolio built for Vishal Chauhan. It blends a "Dark Technical Editorial" aesthetic with robust software engineering practices.

## Design Philosophy
- **Dark Technical Editorial**: Deep blacks, stark whites, and subtle accent colors.
- **Interactive Systems**: Meaningful micro-interactions without overwhelming animations.
- **Focus on Content**: Emphasizes skills, journey, and technical prowess.

## Features
- **Responsive Layout**: Fluid design that scales gracefully from 360px mobile to 1920px desktop.
- **Dynamic Coding Activity**: Real-time stats integration for GitHub, Codeforces, and LeetCode.
- **Performance Optimized**: Route-level code splitting, lazy-loaded components, and native CSS transitions.
- **Accessible**: Full ARIA support, keyboard navigation, and `prefers-reduced-motion` compliance.

## Tech Stack
- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Framer Motion
- **Backend (BaaS)**: Supabase (PostgreSQL + Row Level Security)
- **Serverless**: Deno-based Supabase Edge Functions for API proxies
- **Routing**: React Router DOM

## Architecture
The application is structured as a Single Page Application (SPA) with dynamic routing. 
External API calls (GitHub, LeetCode, Codeforces) are routed through Supabase Edge Functions. These functions fetch, transform, and cache the data in a PostgreSQL table (`platform_stats_cache`) to prevent rate-limiting and ensure high availability.

## Local Setup
1. Clone the repository
2. Install dependencies: `npm install`
3. Start the dev server: `npm run dev`

## Environment Variables
Create a `.env` file based on `.env.example`:
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Supabase Setup & Database Migrations
1. Link your local project to your Supabase instance: `supabase link --project-ref your_project_ref`
2. Push the schema: `supabase db push`
3. Note: The database employs strict Row Level Security (RLS) to ensure public read-only access, with limited write access for contact submissions.

## Edge Functions & Coding Platform Integrations
The project uses Edge Functions to proxy API requests and securely cache them.
1. Deploy functions: `supabase functions deploy github-stats` (repeat for `codeforces-stats`, `leetcode-stats`)
2. Set the service role key as a secret: `supabase secrets set SUPABASE_SERVICE_ROLE_KEY=your_service_key`

## Development Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint checks

## Deployment
1. Ensure your `.env` variables are configured in your hosting provider (e.g., Vercel, Netlify).
2. The project is a standard Vite app. Set the build command to `npm run build` and the output directory to `dist/`.
3. Set up SPA fallback routing (rewrite all 404s to `index.html`).

## Known Limitations
- The contact form is database-only and does not currently trigger an email notification (requires a third-party service integration like Resend or SendGrid).
- Coding platform handles must be manually configured in `src/config/handles.ts` before activity pages will display real data.
