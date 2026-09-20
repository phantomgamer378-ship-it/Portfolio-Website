import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import clsx from "clsx";
import avatarImg from "../../assets/avatar.jpg";

interface AvatarPortraitProps {
  variant?: "hero" | "story";
  className?: string;
  priority?: boolean;
}

export const AvatarPortrait = ({ variant = "hero", className, priority = false }: AvatarPortraitProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll logic for the hero variant
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end start"]
  });

  const scrollOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const scrollScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const scrollY = useTransform(scrollYProgress, [0, 1], [0, -20]);

  const isHero = variant === "hero";
  
  const containerSizeClasses = isHero 
    ? "w-[260px] h-[260px] sm:w-[330px] sm:h-[330px] md:w-[360px] md:h-[360px] lg:w-[480px] lg:h-[480px] xl:w-[520px] xl:h-[520px]" 
    : "w-[120px] h-[120px] md:w-[160px] md:h-[160px]";

  const entranceVariants = {
    hidden: { 
      opacity: 0, 
      scale: shouldReduceMotion ? 1 : 0.96, 
      y: shouldReduceMotion ? 0 : 20 
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] as const, // Cinematic ease-out
        delay: isHero ? 0.2 : 0
      }
    }
  };

  const hoverProps = isHero && !shouldReduceMotion ? { whileHover: { scale: 1.02, transition: { duration: 0.4 } } } : {};

  return (
    <motion.div 
      ref={containerRef}
      className={clsx("relative flex flex-col items-center justify-center", className)}
      style={isHero && !shouldReduceMotion ? { opacity: scrollOpacity, scale: scrollScale, y: scrollY } : {}}
    >
      <motion.div 
        variants={entranceVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="relative group cursor-default"
        {...hoverProps}
      >
        {/* Subtle radial glow */}
        {isHero && (
          <div className="absolute inset-0 bg-accent/5 rounded-full blur-3xl opacity-50 transition-opacity duration-700 group-hover:opacity-80" />
        )}
        
        {/* The Avatar Container */}
        <div className={clsx(
          "relative rounded-full overflow-hidden border border-border/40 shadow-2xl bg-muted/10 transition-colors duration-700 group-hover:border-accent/30",
          containerSizeClasses
        )}>
          <img 
            src={avatarImg} 
            alt="Portrait of Vishal Chauhan"
            decoding={priority ? "sync" : "async"}
            loading={priority ? "eager" : "lazy"}
            className="w-full h-full object-cover grayscale-[10%] contrast-[1.05]"
          />
        </div>

        {/* Technical Metadata (Hero Only) */}
        {isHero && (
          <>
            <div className="absolute top-0 right-0 -translate-y-4 translate-x-4 md:translate-x-8">
              <span className="font-mono text-[10px] text-muted tracking-widest uppercase">VCH / 01</span>
            </div>
            <div className="absolute bottom-4 -left-4 md:-left-12 -rotate-90 origin-bottom-left">
              <span className="font-mono text-[10px] text-muted/70 tracking-widest uppercase">PORTRAIT / 2026</span>
            </div>
            {/* Very subtle line */}
            <div className="absolute top-1/2 -right-12 md:-right-24 w-12 md:w-24 h-px bg-border/40 transition-colors duration-700 group-hover:bg-accent/20" />
          </>
        )}
      </motion.div>
    </motion.div>
  );
};
