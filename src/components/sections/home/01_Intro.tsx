import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { Container } from "../../ui/Container";
import { Button } from "../../ui/Button";
import { Link as RouterLink } from "react-router-dom";
import { socials } from "../../../data/socials";

export const Intro = () => {
  const shouldReduceMotion = useReducedMotion();
  const [hasPlayed] = useState(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem('heroAnimated') === 'true';
  });

  useEffect(() => {
    if (!hasPlayed) {
      sessionStorage.setItem('heroAnimated', 'true');
    }
  }, [hasPlayed]);

  const skipAnimation = hasPlayed || shouldReduceMotion;

  const vishalVariant: Variants = {
    hidden: { opacity: 0, display: "none" },
    visible: { 
      opacity: [0, 1, 1, 0],
      display: ["block", "block", "block", "none"],
      transition: { duration: 2, times: [0, 0.2, 0.8, 1], ease: "easeInOut" } 
    }
  };

  const lineVariant: Variants = {
    hidden: { opacity: 0, y: skipAnimation ? 0 : 20 },
    visible: (i: number) => ({
      opacity: 1, 
      y: 0,
      transition: { delay: skipAnimation ? 0 : 1.8 + i * 0.5, duration: skipAnimation ? 0 : 0.6 }
    })
  };

  const restVariant: Variants = {
    hidden: { opacity: 0, y: skipAnimation ? 0 : 20 },
    visible: {
      opacity: 1, 
      y: 0,
      transition: { delay: skipAnimation ? 0 : 1.8 + 4 * 0.5 + 0.2, duration: skipAnimation ? 0 : 0.8 }
    }
  };

  return (
    <section id="intro" className="relative min-h-[100svh] flex items-center pt-24 pb-12 overflow-hidden border-b border-border/30">
      <Container>
        <div className="max-w-4xl relative">
          
          {/* Initial Name Flash */}
          {!skipAnimation && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={vishalVariant}
              className="absolute inset-0 z-10 flex items-start"
            >
              <h1 className="font-sans text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-foreground leading-[1.1]">
                Vishal Chauhan
              </h1>
            </motion.div>
          )}

          {/* Main Statement */}
          <div className="mb-12">
            <h1 className="font-sans text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.1]">
              <motion.span custom={0} initial="hidden" animate="visible" variants={lineVariant} className="block text-muted">I BUILD.</motion.span>
              <motion.span custom={1} initial="hidden" animate="visible" variants={lineVariant} className="block text-muted">I BREAK.</motion.span>
              <motion.span custom={2} initial="hidden" animate="visible" variants={lineVariant} className="block text-muted">I UNDERSTAND.</motion.span>
              <motion.span custom={3} initial="hidden" animate="visible" variants={lineVariant} className="block text-accent">I BUILD AGAIN.</motion.span>
            </h1>
          </div>

          {/* Identity & Details */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={restVariant}
            className="flex flex-col gap-6 mb-12 border-l-2 border-border pl-6"
          >
            <div>
              <h2 className="text-xl font-sans font-medium text-foreground mb-1">Vishal Chauhan</h2>
              <p className="font-mono text-sm text-muted">BTech CS & IT</p>
              <p className="font-mono text-sm text-muted">ADYPU &middot; 2029</p>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={restVariant}
            className="flex flex-wrap items-center gap-4"
          >
            <RouterLink to="/work">
              <Button variant="primary" size="lg">Explore My Work</Button>
            </RouterLink>
            {socials.resume !== "#" && (
              <a href={socials.resume} target="_blank" rel="noreferrer">
                <Button variant="outline" size="lg">View Resume</Button>
              </a>
            )}
          </motion.div>
        </div>
      </Container>
    </section>
  );
};
