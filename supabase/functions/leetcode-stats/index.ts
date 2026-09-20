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
  
  let reqData: any = {};
  try {
    try {
      reqData = await req.json();
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid JSON request' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const { handle } = reqData;
    if (!handle || typeof handle !== 'string') {
      return new Response(JSON.stringify({ error: 'Valid handle string is required' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    
    const cache = await getCachedStats('leetcode', handle);
    if (cache && !cache.isStale && cache.status === 'success') {
      return new Response(JSON.stringify(cache.data), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    
    // Fetch from public LeetCode stats API
    const res = await fetch(`https://leetcode-stats-api.herokuapp.com/${handle}`);
    if (!res.ok) throw new Error("Failed to fetch LeetCode data");
    
    const data = await res.json();
    if (data.status === "error") throw new Error(data.message || "User not found");

    const finalData = {
      totalSolved: data.totalSolved || 0,
      easy: data.easySolved || 0,
      medium: data.mediumSolved || 0,
      hard: data.hardSolved || 0,
      streak: 0, // Not provided by this API
      badges: [], // Not provided
      recentActivity: [] // Not provided by this simple API, could use GraphQL for full details
    };

    await setCachedStats('leetcode', handle, finalData, 'success', null, 240);
    
    return new Response(JSON.stringify(finalData), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (error: any) {
    console.error('LeetCode stats error:', error);
    
    try {
      if (reqData && reqData.handle) {
        const staleCache = await getCachedStats('leetcode', reqData.handle);
        if (staleCache && staleCache.data) {
          return new Response(JSON.stringify({ ...staleCache.data, _stale: true }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
        }
      }
    } catch (_) {}

    return new Response(JSON.stringify({ error: 'The LeetCode activity service is temporarily unavailable. Please try again later.' }), { status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
