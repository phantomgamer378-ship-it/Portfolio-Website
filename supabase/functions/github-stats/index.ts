import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const getSupabaseClient = () => {
  const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
  return createClient(supabaseUrl, supabaseServiceKey);
};

const getCachedStats = async (platform: string, handle: string) => {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('platform_stats_cache')
    .select('*')
    .eq('platform', platform)
    .eq('handle', handle)
    .single();
    
  if (error || !data) return null;
  if (new Date(data.expires_at) > new Date()) return { data: data.data, status: data.status, isStale: false };
  return { data: data.data, status: data.status, isStale: true };
};

const setCachedStats = async (platform: string, handle: string, statsData: any, status: string, errorMsg: string | null, ttlMinutes = 60) => {
  const supabase = getSupabaseClient();
  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + ttlMinutes);
  await supabase.from('platform_stats_cache').upsert({
    platform, handle, data: statsData,
    fetched_at: new Date().toISOString(), expires_at: expiresAt.toISOString(),
    status, error_message: errorMsg, updated_at: new Date().toISOString()
  });
};

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  
  let reqData;
  try {
    reqData = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON request' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }

  const { handle } = reqData;
  if (!handle || typeof handle !== 'string') {
    return new Response(JSON.stringify({ error: 'Valid handle string is required' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }

  try {
    const cache = await getCachedStats('github', handle);
    if (cache && !cache.isStale && cache.status === 'success') {
      return new Response(JSON.stringify(cache.data), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    // 1. Fetch user profile
    const userRes = await fetch(`https://api.github.com/users/${handle}`, { headers: { 'User-Agent': 'Supabase-Edge-Function' } });
    if (!userRes.ok) throw new Error('Failed to fetch user profile');
    const userData = await userRes.json();

    // 2. Fetch repos for languages
    const reposRes = await fetch(`https://api.github.com/users/${handle}/repos?per_page=100&sort=updated`, { headers: { 'User-Agent': 'Supabase-Edge-Function' } });
    const reposData = reposRes.ok ? await reposRes.json() : [];
    
    const langCounts: Record<string, number> = {};
    reposData.forEach((repo: any) => {
      if (repo.language) {
        langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
      }
    });
    const languages = Object.entries(langCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(entry => entry[0]);

    // 3. Fetch recent events
    const eventsRes = await fetch(`https://api.github.com/users/${handle}/events/public?per_page=10`, { headers: { 'User-Agent': 'Supabase-Edge-Function' } });
    const eventsData = eventsRes.ok ? await eventsRes.json() : [];
    const recentActivity = eventsData
      .filter((e: any) => ["PushEvent", "PullRequestEvent", "IssuesEvent", "CreateEvent"].includes(e.type))
      .slice(0, 5)
      .map((e: any) => ({
        type: e.type.replace('Event', ''),
        repo: e.repo.name.split('/').pop(),
        date: e.created_at.split('T')[0]
      }));

    // 4. Scrape contribution graph
    const contribRes = await fetch(`https://github.com/users/${handle}/contributions`, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const html = await contribRes.text();
    
    let totalContributions = 0;
    const match = html.match(/(\d{1,3}(?:,\d{3})*)\s+contributions/i);
    if (match) {
      totalContributions = parseInt(match[1].replace(/,/g, ''), 10);
    }

    const heatmap: Array<{ date: string; count: number }> = [];
    const regex = /<td[^>]*data-date="([^"]+)"[^>]*data-level="([^"]+)"/g;
    let m;
    while ((m = regex.exec(html)) !== null) {
      // Map data-level (0-4) to a rough count to keep heatmap visual (0, 1, 3, 6, 10+)
      const level = parseInt(m[2], 10);
      const countMap = [0, 1, 3, 6, 10];
      heatmap.push({ date: m[1], count: countMap[level] || 0 });
    }

    // Default empty heatmap if failed to scrape
    if (heatmap.length === 0) {
      for (let i = 0; i < 365; i++) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        heatmap.push({ date: d.toISOString().split('T')[0], count: 0 });
      }
      heatmap.reverse();
    }

    const finalData = {
      totalContributions,
      followers: userData.followers,
      repositories: userData.public_repos,
      languages: languages.length > 0 ? languages : ["Unknown"],
      recentActivity,
      heatmap
    };

    await setCachedStats('github', handle, finalData, 'success', null, 60);
    return new Response(JSON.stringify(finalData), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

  } catch (error: any) {
    console.error('GitHub stats error:', error);
    try {
      if (reqData && reqData.handle) {
        const staleCache = await getCachedStats('github', reqData.handle);
        if (staleCache && staleCache.data) {
          return new Response(JSON.stringify({ ...staleCache.data, _stale: true }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
        }
      }
    } catch (_) {}
    return new Response(JSON.stringify({ error: 'The GitHub activity service is temporarily unavailable.' }), { status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
