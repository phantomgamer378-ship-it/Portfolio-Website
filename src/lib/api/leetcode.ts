import { supabase } from '../supabase';
import { handles } from '../../config/handles';

export interface LeetCodeStats {
  totalSolved: number;
  easy: number;
  medium: number;
  hard: number;
  streak: number;
  badges: string[];
  recentActivity: Array<{ title: string; difficulty: string; date: string }>;
  _stale?: boolean;
}

export const getLeetcodeStats = async (): Promise<LeetCodeStats | null> => {
  if (!handles.leetcode) return null;
  
  const res = await supabase.functions.invoke('leetcode-stats', {
    body: { handle: handles.leetcode }
  });
  
  const data = res.data as LeetCodeStats | { error: string };
  const error = res.error as Error | null;
  
  if (error || (data && 'error' in data)) {
    const errorMsg = error?.message || (data as { error: string })?.error;
    console.error('Failed to fetch LeetCode stats:', errorMsg);
    throw new Error(errorMsg || 'Failed to fetch LeetCode stats');
  }
  
  return data;
};
