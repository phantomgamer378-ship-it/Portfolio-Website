# Architectural Decisions

## 1. Hybrid Data Architecture
Instead of relying completely on Supabase for all content, we use static TypeScript files (`src/data/*.ts`) for rarely changing portfolio data (e.g., skills, education, past projects). Supabase is reserved for dynamic elements like cached API statistics and contact form submissions. This prevents unnecessary database requests on every page load.

## 2. Supabase Over Express/MongoDB
As per the requirements, we use Supabase PostgreSQL and Edge Functions for a streamlined, serverless backend. We actively avoid introducing Express or MongoDB unless a future requirement proves Supabase insufficient.

## 3. Tailwind CSS v4
Used `@tailwindcss/vite` plugin for modern integration with Vite, configuring design tokens in `index.css`.

## 4. UI Library Avoidance
We are building custom UI components based on the Design System rather than importing heavy component libraries (like MUI or Bootstrap) to maintain precise control over the "Dark Technical Editorial" aesthetic.
