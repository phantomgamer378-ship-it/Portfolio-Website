import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { Link as RouterLink } from "react-router-dom";
import { profile } from "../../data/profile";
import { socials } from "../../data/socials";

export const Hero = () => {
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
    <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
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
            className="grid md:grid-cols-2 gap-8 mb-12 border-l-2 border-border pl-6"
          >
            <div>
              <h2 className="text-xl font-sans font-medium text-foreground mb-1">{profile.name}</h2>
              <p className="font-mono text-sm text-muted">{profile.education.degree}</p>
              <p className="font-mono text-sm text-muted">Alta School of Technology</p>
              <p className="font-mono text-sm text-muted">Ajeenkya DY Patil University</p>
              <p className="font-mono text-sm text-muted mt-2">Expected graduation: {profile.education.expectedGraduation}</p>
            </div>
            
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-accent mb-2">Current Exploration</p>
              <ul className="font-mono text-sm text-muted flex flex-col gap-1">
                {profile.currentExploration.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
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
