# Performance Overview

This document outlines the performance characteristics and optimizations of the portfolio platform.

## 1. Code Splitting & Lazy Loading
- React route-level code splitting (`React.lazy`) is implemented in `App.tsx` via `Suspense`. This ensures that JavaScript bundles are split per page, significantly reducing the initial payload size and Time to Interactive (TTI).

## 2. Animation Performance
- The application uses `framer-motion` for complex sequences and transitions.
- All simple micro-interactions (e.g., hover effects on buttons, cards, links) are handled via raw CSS transitions instead of JS, preserving CPU resources.
- The `useReducedMotion` hook is actively enforced in `RootLayout.tsx` to respect OS-level accessibility preferences and improve performance on low-end devices.

## 3. Caching
- **API Results**: Data fetched from external APIs (GitHub, Codeforces, LeetCode) are cached in the Supabase database (`platform_stats_cache`) with varying TTLs (30 - 240 mins) to prevent redundant upstream fetching.
- **Images/Static Assets**: Ensure CDN caching strategies are applied for `/public` folder assets when deployed.

## 4. DOM Elements
- Heatmaps use simple DOM structures (CSS Grids with native divs) rather than heavy Canvas elements, as they represent a manageable amount of data (365 cells).
- Rating graphs use lightweight inline SVGs with `polyline` rather than loading heavy charting libraries like `Chart.js` or `Recharts`.
