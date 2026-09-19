import { supabase } from '../supabase';
import { handles } from '../../config/handles';

export interface GithubStats {
  totalContributions: number;
  followers: number;
  repositories: number;
  languages: string[];
  recentActivity: Array<{ type: string; repo: string; date: string }>;
  heatmap: Array<{ date: string; count: number }>;
  _stale?: boolean;
}

export const getGithubStats = async (): Promise<GithubStats | null> => {
  if (!handles.github) return null;
  
  const res = await supabase.functions.invoke('github-stats', {
    body: { handle: handles.github }
  });
  
  const data = res.data as GithubStats | { error: string };
  const error = res.error as Error | null;
  
  if (error || (data && 'error' in data)) {
    const errorMsg = error?.message || (data as { error: string })?.error;
    console.error('Failed to fetch Github stats:', errorMsg);
    throw new Error(errorMsg || 'Failed to fetch Github stats');
  }
  
  return data;
};
