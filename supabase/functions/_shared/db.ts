import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

export const getSupabaseClient = () => {
  const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
  return createClient(supabaseUrl, supabaseServiceKey);
};

export const getCachedStats = async (platform: string, handle: string) => {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('platform_stats_cache')
    .select('*')
    .eq('platform', platform)
    .eq('handle', handle)
    .single();
    
  if (error || !data) return null;
  
  // Return cache if it hasn't expired
  if (new Date(data.expires_at) > new Date()) {
    return { data: data.data, status: data.status, isStale: false };
  }
  
  // Return stale data if it exists
  return { data: data.data, status: data.status, isStale: true };
};

export const setCachedStats = async (platform: string, handle: string, statsData: any, status: string, errorMsg: string | null, ttlMinutes = 60) => {
  const supabase = getSupabaseClient();
  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + ttlMinutes);
  
  await supabase.from('platform_stats_cache').upsert({
    platform,
    handle,
    data: statsData,
    fetched_at: new Date().toISOString(),
    expires_at: expiresAt.toISOString(),
    status,
    error_message: errorMsg,
    updated_at: new Date().toISOString()
  });
};
