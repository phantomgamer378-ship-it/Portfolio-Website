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

const MOCK_GITHUB_DATA = {
  totalContributions: 1420,
  followers: 42,
  repositories: 35,
  languages: ["TypeScript", "Python", "JavaScript", "C++"],
  recentActivity: [
    { type: "PushEvent", repo: "vanirakshak", date: "2026-09-18" },
    { type: "PullRequestEvent", repo: "bias-env", date: "2026-09-15" }
  ],
  heatmap: Array.from({ length: 365 }).map((_, i) => ({
    date: new Date(new Date().setDate(new Date().getDate() - i)).toISOString().split('T')[0],
    count: Math.floor(Math.random() * 5)
  })).reverse()
};

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  try {
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
    
    const cache = await getCachedStats('github', handle);
    if (cache && !cache.isStale && cache.status === 'success') {
      return new Response(JSON.stringify(cache.data), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    
    // In a real scenario, this would call the GitHub API. 
    // We simulate API fetching latency here.
    await new Promise(resolve => setTimeout(resolve, 800));
    
    await setCachedStats('github', handle, MOCK_GITHUB_DATA, 'success', null, 120);
    return new Response(JSON.stringify(MOCK_GITHUB_DATA), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (error: any) {
    console.error('GitHub stats error:', error);
    
    // Fallback to stale cache if available
    try {
      if (reqData && reqData.handle) {
        const staleCache = await getCachedStats('github', reqData.handle);
        if (staleCache && staleCache.data) {
          return new Response(JSON.stringify({ ...staleCache.data, _stale: true }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
        }
      }
    } catch (_) {}
    
    // Never expose raw upstream errors directly to client
    return new Response(JSON.stringify({ error: 'The GitHub activity service is temporarily unavailable. Please try again later.' }), { status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
