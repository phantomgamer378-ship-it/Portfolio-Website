import { supabase } from '../supabase';
import { handles } from '../../config/handles';

export interface CodeforcesStats {
  currentRating: number;
  maxRating: number;
  currentRank: string;
  maxRank: string;
  totalSubmissions: number;
  acceptedSubmissions: number;
  heatmap: Array<{ date: string; submissions: number; accepted: number }>;
  ratingGraph: Array<{ contestName: string; rating: number; date: string }>;
  _stale?: boolean;
}

export const getCodeforcesStats = async (): Promise<CodeforcesStats | null> => {
  if (!handles.codeforces) return null;
  
  const res = await supabase.functions.invoke('codeforces-stats', {
    body: { handle: handles.codeforces }
  });
  
  const data = res.data as CodeforcesStats | { error: string };
  const error = res.error as Error | null;
  
  if (error || (data && 'error' in data)) {
    const errorMsg = error?.message || (data as { error: string })?.error;
    console.error('Failed to fetch Codeforces stats:', errorMsg);
    throw new Error(errorMsg || 'Failed to fetch Codeforces stats');
  }
  
  return data;
};
