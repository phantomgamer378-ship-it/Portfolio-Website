import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface RatingGraphProps {
  data: Array<{ contestName: string; rating: number; date: string }>;
}

export const RatingGraph = ({ data }: RatingGraphProps) => {
  const { points, minRating, maxRating } = useMemo(() => {
    if (!data.length) return { points: '', minRating: 0, maxRating: 0 };
    
    const sorted = [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const minR = Math.min(...sorted.map(d => d.rating));
    const maxR = Math.max(...sorted.map(d => d.rating));
    const minD = new Date(sorted[0].date).getTime();
    const maxD = new Date(sorted[sorted.length - 1].date).getTime();
    
    // Normalize coordinates for an SVG box 800x200
    const w = 800;
    const h = 200;
    
    const rRange = maxR - minR || 1;
    const dRange = maxD - minD || 1;

    const pts = sorted.map(d => {
      const x = ((new Date(d.date).getTime() - minD) / dRange) * w;
      const y = h - (((d.rating - minR) / rRange) * h);
      return `${x},${y}`;
    }).join(' ');
    
    return { points: pts, minRating: minR, maxRating: maxR };
  }, [data]);

  if (!data.length) return <div className="text-muted font-mono text-sm p-8">No rating history available</div>;

  return (
    <div className="w-full overflow-x-auto pb-4 custom-scrollbar relative">
      <div className="w-[800px] h-[200px] min-w-max relative">
        <svg width="800" height="200" className="overflow-visible" aria-label="Rating history graph">
          {/* Grid lines */}
          <line x1="0" y1="0" x2="800" y2="0" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="4 4" />
          <line x1="0" y1="100" x2="800" y2="100" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="4 4" />
          <line x1="0" y1="200" x2="800" y2="200" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="4 4" />
          
          <motion.polyline 
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            points={points} 
            fill="none" 
            stroke="var(--color-accent)" 
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="absolute left-0 top-0 -translate-y-full text-xs font-mono text-muted">{maxRating}</div>
        <div className="absolute left-0 bottom-0 translate-y-full text-xs font-mono text-muted">{minRating}</div>
      </div>
    </div>
  );
};
