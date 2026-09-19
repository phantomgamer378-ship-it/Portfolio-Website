# Security Overview

This document outlines the security architecture and best practices implemented in the portfolio platform.

## 1. Supabase & Database Security
- **Row Level Security (RLS)**: All tables have RLS enabled.
  - Read access is strictly `public` via `SELECT USING (true)`.
  - Write access is completely disabled for `public` users for all tables except `contact_submissions`.
  - `contact_submissions` allows `INSERT WITH CHECK (true)` for public but restricts `SELECT`, meaning users can submit messages but cannot read them.
- **Service Role Keys**: The `SUPABASE_SERVICE_ROLE_KEY` is completely isolated to Edge Functions and is never exposed to the client bundle (`.env` only contains `ANON_KEY`).

## 2. API Resilience & Rate Limiting
- **Edge Functions**: External API adapters (GitHub, Codeforces, LeetCode) are hosted as Supabase Edge Functions. They act as a proxy.
- **Caching**: A `platform_stats_cache` table is used to prevent rate-limiting from upstream APIs. Data is cached and served until it is stale.
- **Graceful Degradation**: If an upstream API fails, the Edge Functions fall back to stale cached data to ensure high availability for end-users. Raw error messages are not exposed to the frontend.

## 3. Input Validation
- Edge functions validate incoming JSON payloads and enforce strict type checks (e.g., ensuring `handle` is a valid string).

## 4. Environment Variables
- Ensure that in the production deployment, only `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are provided to the frontend build pipeline.
