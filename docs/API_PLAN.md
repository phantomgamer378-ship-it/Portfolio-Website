# API Plan

## Third-Party Integrations
- **GitHub:** Fetch contribution heatmap, repositories, followers, stars, languages, recent activity.
- **Codeforces:** Fetch current rating, max rating, rank, contest history, submission activity.
- **LeetCode:** Fetch problems solved (easy/medium/hard), activity heatmap, streak, badges.

## Edge Function Flow
1. Validate input.
2. Retrieve third-party data from respective APIs.
3. Normalize data.
4. Validate response.
5. Cache data in `platform_stats_cache` table where appropriate.
6. Return stable application-level response.
7. Handle API failures gracefully.
