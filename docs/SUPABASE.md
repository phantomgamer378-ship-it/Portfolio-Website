# Supabase Architecture

- **Database:** PostgreSQL with Row Level Security (RLS) enabled on all public tables.
- **Access:** Public read access granted for portfolio content; write access restricted to authenticated admin users (to be implemented later).
- **Edge Functions:** Planned for `github-stats`, `codeforces-stats`, and `leetcode-stats`.
- **Environment:** `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are used for frontend access. Service-role keys are securely stored and never exposed.
