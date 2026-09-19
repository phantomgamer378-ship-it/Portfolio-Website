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

    const cache = await getCachedStats('codeforces', handle);
    if (cache && !cache.isStale && cache.status === 'success') {
      return new Response(JSON.stringify(cache.data), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const userInfoRes = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`);
    const userRatingRes = await fetch(`https://codeforces.com/api/user.rating?handle=${handle}`);
    const userStatusRes = await fetch(`https://codeforces.com/api/user.status?handle=${handle}`);

    const [userInfo, userRating, userStatus] = await Promise.all([ userInfoRes.json(), userRatingRes.json(), userStatusRes.json() ]);

    if (userInfo.status !== "OK") throw new Error("User not found");

    const info = userInfo.result[0];
    const submissions = userStatus.result || [];
    const acceptedCount = submissions.filter((s: any) => s.verdict === "OK").length;
    
    const heatmapMap = new Map();
    for (const sub of submissions) {
      const date = new Date(sub.creationTimeSeconds * 1000).toISOString().split('T')[0];
      if (!heatmapMap.has(date)) heatmapMap.set(date, { submissions: 0, accepted: 0 });
      const dayData = heatmapMap.get(date);
      dayData.submissions += 1;
      if (sub.verdict === "OK") dayData.accepted += 1;
    }
    const heatmap = Array.from(heatmapMap.entries()).map(([date, data]) => ({ date, ...data as any })).sort((a, b) => a.date.localeCompare(b.date));

    const ratingGraph = (userRating.result || []).map((r: any) => ({
      contestName: r.contestName,
      rating: r.newRating,
      date: new Date(r.ratingUpdateTimeSeconds * 1000).toISOString().split('T')[0]
    }));

    const responseData = {
      currentRating: info.rating || 0, maxRating: info.maxRating || 0,
      currentRank: info.rank || "Unrated", maxRank: info.maxRank || "Unrated",
      totalSubmissions: submissions.length, acceptedSubmissions: acceptedCount,
      heatmap, ratingGraph
    };
    
    await setCachedStats('codeforces', handle, responseData, 'success', null, 30);
    return new Response(JSON.stringify(responseData), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (error: any) {
    console.error('Codeforces stats error:', error);
    
    try {
      if (reqData && reqData.handle) {
        const staleCache = await getCachedStats('codeforces', reqData.handle);
        if (staleCache && staleCache.data) {
          return new Response(JSON.stringify({ ...staleCache.data, _stale: true }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
        }
      }
    } catch (_) {}
    
    return new Response(JSON.stringify({ error: 'The Codeforces activity service is temporarily unavailable. Please try again later.' }), { status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
