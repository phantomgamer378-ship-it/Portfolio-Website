import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "../../ui/Container";
import { AvatarPortrait } from "../../portfolio/AvatarPortrait";

const STORY_ITEMS = [
  "Gaming",
  "Modded APK experimentation",
  "Cracked games",
  "Minecraft",
  "GitHub at around age 14",
  "Lack of guidance",
  "Programming",
  "Web development",
  "AI-assisted development",
  "Machine Learning / Deep Learning",
  "Cybersecurity"
];

const TIMELINE_COLORS = {
  muted: "#a1a1aa",
  foreground: "#f4f4f5",
};

export const Story = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  return (
    <section id="story" ref={containerRef} className="relative min-h-screen py-32 border-b border-border/30">
      <Container>
        <div className="grid md:grid-cols-2 gap-12 md:gap-24 relative">
          
          {/* Left: Sticky Visual Title */}
          <div className="hidden md:block">
            <div className="sticky top-1/2 -translate-y-1/2">
              <div className="mb-8">
                <AvatarPortrait variant="story" />
              </div>
              <h2 className="font-sans text-4xl md:text-5xl font-bold tracking-tighter text-foreground mb-4">
                HOW I GOT HERE
              </h2>
              <div className="h-px w-24 bg-accent/50 mb-6" />
              <p className="font-mono text-sm text-muted max-w-xs">
                A timeline of curiosity. From tearing games apart to understanding how systems are built—and secured.
              </p>
            </div>
          </div>

          {/* Right: Scrolling Narrative */}
          <div className="relative">
            <div className="md:hidden mb-12 flex flex-col gap-6">
              <AvatarPortrait variant="story" />
              <div>
                <h2 className="font-sans text-4xl font-bold tracking-tighter text-foreground mb-4">
                  HOW I GOT HERE
                </h2>
                <div className="h-px w-24 bg-accent/50" />
              </div>
            </div>

            {/* Line connecting the items */}
            <div className="absolute left-4 top-4 bottom-4 w-px bg-border">
              <motion.div 
                className="w-full bg-accent origin-top"
                style={{ scaleY: scrollYProgress }}
              />
            </div>

            <div className="flex flex-col gap-12">
              {STORY_ITEMS.map((item, index) => {
                // Determine when this item should become fully opaque based on scroll progress
                // We'll calculate a localized progress range for each item
                const start = index / STORY_ITEMS.length;
                const end = (index + 1) / STORY_ITEMS.length;

                return (
                  <StoryItem 
                    key={index} 
                    item={item} 
                    progress={scrollYProgress} 
                    range={[start - 0.1, end]} 
                  />
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

function StoryItem({ item, progress, range }: { item: string, progress: import("framer-motion").MotionValue<number>, range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.3, 1]);
  const y = useTransform(progress, range, [20, 0]);
  const color = useTransform(progress, range, [TIMELINE_COLORS.muted, TIMELINE_COLORS.foreground]);

  return (
    <motion.div 
      style={{ opacity, y }}
      className="relative pl-12"
    >
      <div className="absolute left-3.5 top-1.5 w-2 h-2 rounded-full bg-background border border-accent -translate-x-1/2" />
      <motion.p 
        style={{ color }}
        className="font-mono text-lg md:text-xl tracking-tight"
      >
        {item}
      </motion.p>
    </motion.div>
  );
}
