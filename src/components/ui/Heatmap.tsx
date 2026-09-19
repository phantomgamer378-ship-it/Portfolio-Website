import { useMemo } from 'react';

interface HeatmapProps {
  data: Array<{ date: string; count: number }>;
  colorAccessor?: (count: number) => string;
}

export const Heatmap = ({ data, colorAccessor }: HeatmapProps) => {
  // We assume data is sorted earliest to latest or latest to earliest.
  // The github-stats endpoint returns 365 days.
  
  const cells = useMemo(() => {
    // default color mapping if none provided
    const defaultColor = (count: number) => {
      if (count === 0) return 'bg-border/30';
      if (count < 3) return 'bg-accent/40';
      if (count < 6) return 'bg-accent/70';
      return 'bg-accent';
    };

    const getColor = colorAccessor || defaultColor;

    return data.map((d, i) => (
      <div 
        key={i} 
        className={`w-3 h-3 rounded-sm ${getColor(d.count)} transition-all hover:scale-125 hover:z-20 hover:ring-1 hover:ring-foreground relative group cursor-crosshair`}
        role="gridcell"
        tabIndex={0}
        aria-label={`${d.count} contributions on ${d.date}`}
      >
        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-foreground text-background text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-10 transition-opacity">
          {d.count} contributions on {d.date}
        </div>
      </div>
    ));
  }, [data, colorAccessor]);

  return (
    <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
      <div className="flex flex-col gap-1 min-w-max" role="grid">
        <div className="flex gap-1 flex-wrap w-[800px] h-[100px] flex-col relative">
          {/* We're doing a simple flex-col layout that wraps to form columns.
              For a strict 7-row calendar, we ensure the container height is exactly 7 * (cell height + gap) */}
          <div className="flex flex-col flex-wrap gap-1 h-[112px]">
            {cells}
          </div>
        </div>
      </div>
    </div>
  );
};
