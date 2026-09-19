import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Container } from '../components/ui/Container';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Card } from '../components/ui/Card';
import { Chip } from '../components/ui/Chip';
import { ExternalLink } from '../components/ui/ExternalLink';
import { ErrorState } from '../components/ui/ErrorState';
import { fadeUpVariant } from '../lib/motion';
import { getLeetcodeStats, type LeetCodeStats } from '../lib/api/leetcode';
import { handles } from '../config/handles';

export const LeetcodeActivity = () => {
  const [data, setData] = useState<LeetCodeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(() => {
    if (!handles.leetcode) return;
    setLoading(true);
    setError(null);
    getLeetcodeStats()
      .then(setData)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchStats();
  }, [fetchStats]);

  if (!handles.leetcode) {
    return (
      <div className="pt-32 pb-24 min-h-screen">
        <Container>
          <SectionHeading level={1} subhead="Activity">LeetCode</SectionHeading>
          <div className="mt-12 p-8 border border-border/50 text-center font-mono text-muted">
            LeetCode handle not configured.
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <Container>
        <motion.div initial="hidden" animate="visible" variants={fadeUpVariant} className="space-y-16">
          
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <SectionHeading level={1} subhead="Activity" className="mb-2">
                LeetCode
              </SectionHeading>
              <ExternalLink href={`https://leetcode.com/${handles.leetcode}`} className="text-lg">
                @{handles.leetcode}
              </ExternalLink>
            </div>
            {data?._stale && (
              <div className="font-mono text-xs text-amber-500 bg-amber-500/10 px-3 py-1.5 rounded-sm self-start md:self-end">
                Displaying cached data
              </div>
            )}
          </header>

          {loading && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-pulse">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-24 bg-card/50 rounded-sm border border-border/50" />
              ))}
            </div>
          )}
          
          {error && (
            <ErrorState 
              platformName="LeetCode" 
              message={error} 
              onRetry={fetchStats}
              profileUrl={`https://leetcode.com/${handles.leetcode}`}
            />
          )}

          {data && (
            <>
              {/* Summary Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <Card>
                  <div className="text-3xl font-sans font-medium text-foreground mb-1">{data.totalSolved}</div>
                  <div className="font-mono text-xs text-muted uppercase">Total Solved</div>
                </Card>
                <Card>
                  <div className="text-3xl font-sans font-medium text-foreground mb-1">{data.streak}</div>
                  <div className="font-mono text-xs text-muted uppercase">Day Streak</div>
                </Card>
                <Card className="col-span-2 flex flex-col justify-center">
                  <div className="flex gap-4 items-end">
                    <div>
                      <div className="text-xl font-sans text-green-500">{data.easy}</div>
                      <div className="font-mono text-xs text-muted">Easy</div>
                    </div>
                    <div>
                      <div className="text-xl font-sans text-yellow-500">{data.medium}</div>
                      <div className="font-mono text-xs text-muted">Med</div>
                    </div>
                    <div>
                      <div className="text-xl font-sans text-red-500">{data.hard}</div>
                      <div className="font-mono text-xs text-muted">Hard</div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Badges */}
              {data.badges.length > 0 && (
                <section>
                  <h3 className="font-mono text-sm text-accent uppercase tracking-widest mb-6">Badges</h3>
                  <div className="flex flex-wrap gap-2">
                    {data.badges.map((badge, idx) => (
                      <Chip key={idx}>{badge}</Chip>
                    ))}
                  </div>
                </section>
              )}

              {/* Recent Activity */}
              <section>
                <h3 className="font-mono text-sm text-accent uppercase tracking-widest mb-6">Recent Solves</h3>
                <div className="grid gap-4">
                  {data.recentActivity.map((activity, idx) => (
                    <div key={idx} className="flex justify-between items-center py-4 border-b border-border/50 last:border-0">
                      <div>
                        <span className="font-medium text-foreground mr-3">{activity.title}</span>
                        <span className={`font-mono text-xs px-2 py-0.5 rounded-sm ${
                          activity.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                          activity.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {activity.difficulty}
                        </span>
                      </div>
                      <div className="font-mono text-xs text-muted/70">{activity.date}</div>
                    </div>
                  ))}
                </div>
              </section>

            </>
          )}

        </motion.div>
      </Container>
    </div>
  );
};
