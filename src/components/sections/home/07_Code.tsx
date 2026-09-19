import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Container } from '../../ui/Container';
import { getGithubStats, type GithubStats } from '../../../lib/api/github';
import { getCodeforcesStats, type CodeforcesStats } from '../../../lib/api/codeforces';
import { getLeetcodeStats, type LeetCodeStats } from '../../../lib/api/leetcode';
import { handles } from '../../../config/handles';

export const Code = () => {
  const [gh, setGh] = useState<GithubStats | null>(null);
  const [cf, setCf] = useState<CodeforcesStats | null>(null);
  const [lc, setLc] = useState<LeetCodeStats | null>(null);

  useEffect(() => {
    if (handles.github) getGithubStats().then(setGh).catch(() => {});
    if (handles.codeforces) getCodeforcesStats().then(setCf).catch(() => {});
    if (handles.leetcode) getLeetcodeStats().then(setLc).catch(() => {});
  }, []);

  return (
    <section id="code" className="relative py-32 border-b border-border/30">
      <Container>
        <div className="mb-24">
          <h2 className="font-sans text-4xl md:text-5xl font-bold tracking-tighter text-foreground mb-4">
            THE CODING LAB
          </h2>
          <div className="h-px w-24 bg-accent/50 mb-6" />
          <p className="font-mono text-sm text-muted max-w-xs">
            Where curiosity becomes repetition.
          </p>
        </div>

        <div className="flex flex-col gap-24">
          
          <CodeModule 
            title="GitHub" 
            link="/activity/github"
            loading={!gh && !!handles.github}
            configured={!!handles.github}
          >
            {gh && (
              <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12">
                <div className="text-6xl md:text-8xl font-sans font-bold tracking-tighter text-foreground">
                  {gh.totalContributions}
                </div>
                <div className="font-mono text-accent uppercase tracking-widest">
                  Contributions <br/> in the last year
                </div>
              </div>
            )}
          </CodeModule>

          <CodeModule 
            title="Codeforces" 
            link="/activity/codeforces"
            loading={!cf && !!handles.codeforces}
            configured={!!handles.codeforces}
          >
            {cf && (
              <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12">
                <div className="text-6xl md:text-8xl font-sans font-bold tracking-tighter text-foreground">
                  {cf.currentRating}
                </div>
                <div className="font-mono text-accent uppercase tracking-widest">
                  Current Rating <br/> ({cf.currentRank})
                </div>
              </div>
            )}
          </CodeModule>

          <CodeModule 
            title="LeetCode" 
            link="/activity/leetcode"
            loading={!lc && !!handles.leetcode}
            configured={!!handles.leetcode}
          >
            {lc && (
              <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12">
                <div className="text-6xl md:text-8xl font-sans font-bold tracking-tighter text-foreground">
                  {lc.totalSolved}
                </div>
                <div className="font-mono text-accent uppercase tracking-widest">
                  Problems Solved <br/> ({lc.easy} E &middot; {lc.medium} M &middot; {lc.hard} H)
                </div>
              </div>
            )}
          </CodeModule>

        </div>
      </Container>
    </section>
  );
};

function CodeModule({ title, link, loading, configured, children }: { title: string, link: string, loading: boolean, configured: boolean, children?: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "end 50%"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [30, 0]);

  return (
    <motion.div ref={ref} style={{ opacity, y }} className="relative group">
      <div className="flex items-end justify-between border-b-2 border-border pb-4 mb-8">
        <h3 className="font-sans text-3xl md:text-4xl font-bold tracking-tighter text-foreground">
          {title}
        </h3>
        <Link to={link} className="font-mono text-sm text-muted hover:text-accent transition-colors opacity-0 group-hover:opacity-100 hidden md:block">
          EXPLORE FULL REPORT &rarr;
        </Link>
      </div>

      <div className="min-h-[120px]">
        {!configured ? (
          <div className="font-mono text-sm text-muted/70">Not configured</div>
        ) : loading ? (
          <div className="flex gap-2">
            <div className="w-4 h-4 bg-accent/20 animate-pulse" />
            <div className="w-4 h-4 bg-accent/40 animate-pulse delay-75" />
            <div className="w-4 h-4 bg-accent/60 animate-pulse delay-150" />
          </div>
        ) : (
          children
        )}
      </div>

      <Link to={link} className="font-mono text-sm text-accent hover:text-foreground transition-colors mt-8 block md:hidden">
        EXPLORE FULL REPORT &rarr;
      </Link>
    </motion.div>
  );
}
