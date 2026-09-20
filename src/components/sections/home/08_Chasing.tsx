import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "../../ui/Container";

const PROGRESSION = [
  "WEB",
  "SYSTEMS",
  "NETWORKS",
  "SECURITY",
  "AI",
  "MACHINE LEARNING",
  "DEEP LEARNING"
];

const PROGRESSION_COLORS = {
  muted: "#a1a1aa",
  foreground: "#f4f4f5",
  border: "#27272a",
  accent: "#14b8a6",
};

export const Chasing = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  return (
    <section id="chasing" ref={containerRef} className="relative py-32 border-b border-border/30 bg-background overflow-hidden">
      <Container>
        <div className="mb-32">
          <h2 className="font-sans text-xl md:text-2xl font-bold tracking-tighter text-accent mb-4">
            WHAT I'M CHASING
          </h2>
          <p className="font-sans text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-foreground leading-[1.1] max-w-4xl uppercase">
            I want to understand technology deeply enough to find where it breaks.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center py-24">
          <div className="relative flex flex-col items-center">
            
            {/* The vertical line */}
            <div className="absolute top-0 bottom-0 w-px bg-border/30" />
            
            {/* The animated fill line */}
            <motion.div 
              className="absolute top-0 w-px bg-accent origin-top" 
              style={{ scaleY: scrollYProgress, bottom: 0 }}
            />

            {/* The progression items */}
            {PROGRESSION.map((item, index) => {
              // Calculate specific threshold for each item
              const threshold = index / (PROGRESSION.length - 1);
              
              return (
                <ProgressionNode 
                  key={item}
                  item={item}
                  progress={scrollYProgress}
                  threshold={threshold}
                />
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};

function ProgressionNode({ item, progress, threshold }: { item: string, progress: import("framer-motion").MotionValue<number>, threshold: number }) {
  // We want the item to light up when scroll progress passes its threshold
  // We use a small range around the threshold for the transition
  const opacity = useTransform(progress, [threshold - 0.1, threshold], [0.3, 1]);
  const scale = useTransform(progress, [threshold - 0.1, threshold], [0.8, 1]);
  const color = useTransform(progress, [threshold - 0.1, threshold], [PROGRESSION_COLORS.muted, PROGRESSION_COLORS.foreground]);
  const borderColor = useTransform(progress, [threshold - 0.1, threshold], [PROGRESSION_COLORS.border, PROGRESSION_COLORS.accent]);

  return (
    <div className="relative py-12 flex items-center justify-center">
      <motion.div 
        style={{ borderColor, scale }}
        className="absolute w-4 h-4 bg-background border-2 rounded-full z-10"
      />
      <motion.div 
        style={{ opacity, color, scale }}
        className="font-mono text-2xl md:text-4xl lg:text-6xl tracking-widest uppercase bg-background px-8 z-20"
      >
        {item}
      </motion.div>
    </div>
  );
}
