# Architecture

## Frontend
- **Framework:** React 19 + Vite 6
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Routing:** React Router v7

## Backend
- **Database:** Supabase PostgreSQL
- **Serverless:** Supabase Edge Functions for third-party integrations (GitHub, Codeforces, LeetCode)
- **Data Fetching:** Hybrid approach (static for rarely changing content in `src/data/`, dynamic for stats and contacts via Supabase).
