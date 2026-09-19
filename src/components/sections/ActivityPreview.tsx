import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../ui/Card';
import { SectionHeading } from '../ui/SectionHeading';
import { getGithubStats, type GithubStats } from '../../lib/api/github';
import { getCodeforcesStats, type CodeforcesStats } from '../../lib/api/codeforces';
import { getLeetcodeStats, type LeetCodeStats } from '../../lib/api/leetcode';
import { handles } from '../../config/handles';

export const ActivityPreview = () => {
  const [gh, setGh] = useState<GithubStats | null>(null);
  const [cf, setCf] = useState<CodeforcesStats | null>(null);
  const [lc, setLc] = useState<LeetCodeStats | null>(null);

  useEffect(() => {
    if (handles.github) getGithubStats().then(setGh).catch(() => {});
    if (handles.codeforces) getCodeforcesStats().then(setCf).catch(() => {});
    if (handles.leetcode) getLeetcodeStats().then(setLc).catch(() => {});
  }, []);

  return (
    <section className="py-24 border-t border-border/50">
      <SectionHeading level={2} subhead="Metrics" className="mb-12">
        Coding Activity
      </SectionHeading>
      
      <div className="grid md:grid-cols-3 gap-6">
        {/* GitHub Preview */}
        <Card className="flex flex-col h-full">
          <div className="flex-1">
            <h3 className="font-mono text-sm text-accent uppercase tracking-widest mb-4">GitHub</h3>
            {handles.github ? (
              gh ? (
                <div className="space-y-2">
                  <div className="text-3xl font-sans font-medium text-foreground">{gh.totalContributions}</div>
                  <div className="font-mono text-xs text-muted uppercase">Contributions</div>
                </div>
              ) : (
                <div className="font-mono text-sm text-muted animate-pulse">Loading...</div>
              )
            ) : (
              <div className="font-mono text-sm text-muted/70">Not configured</div>
            )}
          </div>
          <Link to="/activity/github" className="mt-8 font-mono text-xs text-muted hover:text-accent transition-colors block border-t border-border/50 pt-4">
            View Full Report →
          </Link>
        </Card>

        {/* Codeforces Preview */}
        <Card className="flex flex-col h-full">
          <div className="flex-1">
            <h3 className="font-mono text-sm text-accent uppercase tracking-widest mb-4">Codeforces</h3>
            {handles.codeforces ? (
              cf ? (
                <div className="space-y-2">
                  <div className="text-3xl font-sans font-medium text-foreground">{cf.currentRating}</div>
                  <div className="font-mono text-xs text-muted uppercase">Rating ({cf.currentRank})</div>
                </div>
              ) : (
                <div className="font-mono text-sm text-muted animate-pulse">Loading...</div>
              )
            ) : (
              <div className="font-mono text-sm text-muted/70">Not configured</div>
            )}
          </div>
          <Link to="/activity/codeforces" className="mt-8 font-mono text-xs text-muted hover:text-accent transition-colors block border-t border-border/50 pt-4">
            View Full Report →
          </Link>
        </Card>

        {/* LeetCode Preview */}
        <Card className="flex flex-col h-full">
          <div className="flex-1">
            <h3 className="font-mono text-sm text-accent uppercase tracking-widest mb-4">LeetCode</h3>
            {handles.leetcode ? (
              lc ? (
                <div className="space-y-2">
                  <div className="text-3xl font-sans font-medium text-foreground">{lc.totalSolved}</div>
                  <div className="font-mono text-xs text-muted uppercase">Problems Solved</div>
                </div>
              ) : (
                <div className="font-mono text-sm text-muted animate-pulse">Loading...</div>
              )
            ) : (
              <div className="font-mono text-sm text-muted/70">Not configured</div>
            )}
          </div>
          <Link to="/activity/leetcode" className="mt-8 font-mono text-xs text-muted hover:text-accent transition-colors block border-t border-border/50 pt-4">
            View Full Report →
          </Link>
        </Card>
      </div>
    </section>
  );
};
