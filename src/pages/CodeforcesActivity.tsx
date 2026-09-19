import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Container } from '../components/ui/Container';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Card } from '../components/ui/Card';
import { Heatmap } from '../components/ui/Heatmap';
import { RatingGraph } from '../components/ui/RatingGraph';
import { ExternalLink } from '../components/ui/ExternalLink';
import { ErrorState } from '../components/ui/ErrorState';
import { fadeUpVariant } from '../lib/motion';
import { getCodeforcesStats, type CodeforcesStats } from '../lib/api/codeforces';
import { handles } from '../config/handles';

export const CodeforcesActivity = () => {
  const [data, setData] = useState<CodeforcesStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(() => {
    if (!handles.codeforces) return;
    setLoading(true);
    setError(null);
    getCodeforcesStats()
      .then(setData)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchStats();
  }, [fetchStats]);

  if (!handles.codeforces) {
    return (
      <div className="pt-32 pb-24 min-h-screen">
        <Container>
          <SectionHeading level={1} subhead="Activity">Codeforces</SectionHeading>
          <div className="mt-12 p-8 border border-border/50 text-center font-mono text-muted">
            Codeforces handle not configured.
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
                Codeforces
              </SectionHeading>
              <ExternalLink href={`https://codeforces.com/profile/${handles.codeforces}`} className="text-lg">
                @{handles.codeforces}
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
              platformName="Codeforces" 
              message={error} 
              onRetry={fetchStats}
              profileUrl={`https://codeforces.com/profile/${handles.codeforces}`}
            />
          )}

          {data && (
            <>
              {/* Summary Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <Card>
                  <div className="text-3xl font-sans font-medium text-foreground mb-1">{data.currentRating}</div>
                  <div className="font-mono text-xs text-muted uppercase">Rating ({data.currentRank})</div>
                </Card>
                <Card>
                  <div className="text-3xl font-sans font-medium text-foreground mb-1">{data.maxRating}</div>
                  <div className="font-mono text-xs text-muted uppercase">Max ({data.maxRank})</div>
                </Card>
                <Card>
                  <div className="text-3xl font-sans font-medium text-foreground mb-1">{data.totalSubmissions}</div>
                  <div className="font-mono text-xs text-muted uppercase">Submissions</div>
                </Card>
                <Card>
                  <div className="text-3xl font-sans font-medium text-foreground mb-1">{data.acceptedSubmissions}</div>
                  <div className="font-mono text-xs text-muted uppercase">Accepted</div>
                </Card>
              </div>
              
              {data._stale && (
                <div className="font-mono text-xs text-yellow-500 bg-yellow-500/10 p-4 border border-yellow-500/20 rounded">
                  Showing cached data. Live API is currently unavailable or rate-limited.
                </div>
              )}

              {/* Rating Graph */}
              <section>
                <h3 className="font-mono text-sm text-accent uppercase tracking-widest mb-6">Rating History</h3>
                <Card className="p-8 pt-12 overflow-hidden bg-background">
                  <RatingGraph data={data.ratingGraph} />
                </Card>
              </section>

              {/* Heatmap */}
              <section>
                <h3 className="font-mono text-sm text-accent uppercase tracking-widest mb-6">Submission Activity</h3>
                <Card className="p-6 overflow-hidden bg-background">
                  <Heatmap 
                    data={data.heatmap.map(h => ({ date: h.date, count: h.submissions }))} 
                    colorAccessor={(count: number) => {
                      if (count === 0) return 'bg-border/30';
                      if (count < 2) return 'bg-blue-500/40';
                      if (count < 5) return 'bg-blue-500/70';
                      return 'bg-blue-500';
                    }}
                  />
                </Card>
              </section>

            </>
          )}

        </motion.div>
      </Container>
    </div>
  );
};
