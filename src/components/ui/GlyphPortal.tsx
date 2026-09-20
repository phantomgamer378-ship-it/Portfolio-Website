import { useId, useRef, type CSSProperties, type ReactNode } from "react";
import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "../../utils/cn";

export type GlyphPortalStyle = CSSProperties & {
  "--gp-paper"?: string;
  "--gp-accent"?: string;
  "--gp-accent-soft"?: string;
  "--gp-foreground"?: string;
};

interface GlyphPortalProps {
  id?: string;
  word?: string;
  front?: ReactNode;
  children?: ReactNode;
  className?: string;
  style?: GlyphPortalStyle;
  scrollLength?: number;
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export const GlyphPortal = ({
  id,
  word = "AGAIN",
  front,
  children,
  className,
  style,
  scrollLength = 2.15,
}: GlyphPortalProps) => {
  const generatedId = useId().replace(/[^a-zA-Z0-9]/g, "");
  const clipId = `glyph-portal-${generatedId}`;
  const gradientId = `glyph-gradient-${generatedId}`;
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const length = clamp(scrollLength, 1.4, 4);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.78], [1, shouldReduceMotion ? 1 : 24]);
  const roll = useTransform(scrollYProgress, [0, 0.38, 0.78], [0, shouldReduceMotion ? 0 : -3.5, 0]);
  const glyphY = useTransform(scrollYProgress, [0, 0.78], [300, shouldReduceMotion ? 300 : 326]);
  const glyphTransform = useMotionTemplate`translate(500 ${glyphY}) scale(${scale}) rotate(${roll}) translate(-500 -300)`;

  const frontOpacity = useTransform(scrollYProgress, [0, 0.2], [1, shouldReduceMotion ? 1 : 0]);
  const wordFillOpacity = useTransform(scrollYProgress, [0, 0.18, 0.36], [0.42, 0.2, 0]);
  const outlineOpacity = useTransform(scrollYProgress, [0, 0.16, 0.5], [0.38, 0.16, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0.68, 0.88], [shouldReduceMotion ? 1 : 0, 1]);
  const contentY = useTransform(scrollYProgress, [0.68, 0.9], [shouldReduceMotion ? 0 : 42, 0]);
  const fieldScale = useTransform(scrollYProgress, [0, 0.78], [1, shouldReduceMotion ? 1 : 1.12]);

  return (
    <section
      id={id}
      ref={sectionRef}
      aria-label={`${word} transition`}
      className={cn("relative isolate overflow-clip bg-background", className)}
      style={{
        minHeight: shouldReduceMotion ? "auto" : `${length * 100}svh`,
        "--gp-paper": "#0a0a0a",
        "--gp-accent": "#6366f1",
        "--gp-accent-soft": "rgba(99,102,241,0.18)",
        "--gp-foreground": "#f4f4f5",
        ...style,
      }}
    >
      <div className={cn("top-0 h-[100svh] min-h-[640px] overflow-hidden", shouldReduceMotion ? "relative" : "sticky")}>
        <motion.div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ scale: fieldScale }}
        >
          <svg className="h-full w-full" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
            <defs>
              <radialGradient id={gradientId} cx="50%" cy="50%" r="72%">
                <stop offset="0%" stopColor="var(--gp-foreground)" stopOpacity="0.96" />
                <stop offset="24%" stopColor="var(--gp-accent)" stopOpacity="0.96" />
                <stop offset="62%" stopColor="var(--gp-accent)" stopOpacity="0.58" />
                <stop offset="100%" stopColor="var(--gp-paper)" stopOpacity="1" />
              </radialGradient>
              <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
                <motion.g transform={glyphTransform}>
                  <text
                    x="500"
                    y="300"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontFamily="Space Grotesk, Arial Black, Arial, sans-serif"
                    fontWeight="700"
                    fontSize="178"
                    letterSpacing="-8"
                  >
                    {word}
                  </text>
                </motion.g>
              </clipPath>
            </defs>

            <rect width="1000" height="600" fill="var(--gp-paper)" />
            <rect width="1000" height="600" fill={`url(#${gradientId})`} clipPath={`url(#${clipId})`} />
            <motion.g transform={glyphTransform} opacity={wordFillOpacity}>
              <text
                x="500"
                y="300"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="var(--gp-accent)"
                fontFamily="Space Grotesk, Arial Black, Arial, sans-serif"
                fontWeight="700"
                fontSize="178"
                letterSpacing="-8"
              >
                {word}
              </text>
            </motion.g>
            <motion.g transform={glyphTransform} opacity={outlineOpacity}>
              <text
                x="500"
                y="300"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="none"
                stroke="var(--gp-accent)"
                strokeWidth="1.6"
                fontFamily="Space Grotesk, Arial Black, Arial, sans-serif"
                fontWeight="700"
                fontSize="178"
                letterSpacing="-8"
              >
                {word}
              </text>
            </motion.g>
          </svg>
        </motion.div>

        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,transparent_0,rgba(10,10,10,0.02)_34%,rgba(10,10,10,0.76)_78%)]" />
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

        {front && (
          <motion.div
            className="absolute inset-0 z-10"
            style={{ opacity: frontOpacity }}
          >
            {front}
          </motion.div>
        )}

        <motion.div
          className="absolute inset-0 z-20 flex items-center text-[var(--gp-foreground)]"
          style={{ opacity: contentOpacity, y: contentY }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
};
