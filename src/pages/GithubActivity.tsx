import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Container } from '../components/ui/Container';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Card } from '../components/ui/Card';
import { Heatmap } from '../components/ui/Heatmap';
import { ExternalLink } from '../components/ui/ExternalLink';
import { ErrorState } from '../components/ui/ErrorState';
import { fadeUpVariant } from '../lib/motion';
import { getGithubStats, type GithubStats } from '../lib/api/github';
import { handles } from '../config/handles';

export const GithubActivity = () => {
  const [data, setData] = useState<GithubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(() => {
    if (!handles.github) return;
    setLoading(true);
    setError(null);
    getGithubStats()
      .then(setData)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchStats();
  }, [fetchStats]);

  if (!handles.github) {
    return (
      <div className="pt-32 pb-24 min-h-screen">
        <Container>
          <SectionHeading level={1} subhead="Activity">GitHub</SectionHeading>
          <div className="mt-12 p-8 border border-border/50 text-center font-mono text-muted">
            GitHub handle not configured.
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
                GitHub
              </SectionHeading>
              <ExternalLink href={`https://github.com/${handles.github}`} className="text-lg">
                @{handles.github}
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
              platformName="GitHub" 
              message={error} 
              onRetry={fetchStats}
              profileUrl={`https://github.com/${handles.github}`}
            />
          )}

          {data && (
            <>
              {/* Summary Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <Card>
                  <div className="text-3xl font-sans font-medium text-foreground mb-1">{data.totalContributions}</div>
                  <div className="font-mono text-xs text-muted uppercase">Contributions</div>
                </Card>
                <Card>
                  <div className="text-3xl font-sans font-medium text-foreground mb-1">{data.repositories}</div>
                  <div className="font-mono text-xs text-muted uppercase">Repositories</div>
                </Card>
                <Card>
                  <div className="text-3xl font-sans font-medium text-foreground mb-1">{data.followers}</div>
                  <div className="font-mono text-xs text-muted uppercase">Followers</div>
                </Card>
                <Card>
                  <div className="text-xl font-sans font-medium text-foreground mb-1 truncate">
                    {data.languages.slice(0, 2).join(', ')}
                  </div>
                  <div className="font-mono text-xs text-muted uppercase">Top Languages</div>
                </Card>
              </div>

              {/* Heatmap */}
              <section>
                <h3 className="font-mono text-sm text-accent uppercase tracking-widest mb-6">Contribution Activity</h3>
                <Card className="p-6 overflow-hidden bg-background">
                  <Heatmap data={data.heatmap} />
                </Card>
              </section>

              {/* Recent Activity */}
              <section>
                <h3 className="font-mono text-sm text-accent uppercase tracking-widest mb-6">Recent Events</h3>
                <div className="grid gap-4">
                  {data.recentActivity.map((activity, idx) => (
                    <div key={idx} className="flex justify-between items-center py-4 border-b border-border/50 last:border-0">
                      <div>
                        <span className="font-medium text-foreground mr-3">{activity.type}</span>
                        <span className="font-mono text-sm text-muted">{activity.repo}</span>
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
