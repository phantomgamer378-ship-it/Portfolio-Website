import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "../components/ui/Container";
import { SectionHeading } from "../components/ui/SectionHeading";
import { getFadeUpVariant } from "../lib/motion";
import { profile } from "../data/profile";

export const About = () => {
  const shouldReduceMotion = useReducedMotion();
  const fadeUpVariant = getFadeUpVariant(shouldReduceMotion);

  const stepVariant: Variants = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const lineVariant: Variants = {
    hidden: { height: "0%" },
    visible: { height: "100%", transition: { duration: 1.5, ease: "easeInOut" } }
  };

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <Container>
        <motion.div initial="hidden" animate="visible" variants={fadeUpVariant} className="max-w-3xl mb-32">
          <SectionHeading level={1} subhead="Mission Statement" className="mb-8 text-4xl md:text-6xl font-bold">
            {profile.missionStatement.main}
          </SectionHeading>
          
          <div className="grid sm:grid-cols-2 gap-4 mt-12 border-t border-border pt-8">
            {profile.missionStatement.supportingIdeas.map((idea, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="text-accent font-mono text-sm mt-1">{(index + 1).toString().padStart(2, '0')}</span>
                <p className="font-sans text-muted">{idea}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="max-w-3xl">
          <SectionHeading level={2} subhead="How I got here" className="mb-12">
            The Journey
          </SectionHeading>
          
          <div className="relative space-y-12 ml-2 md:ml-4 pb-8">
            {/* Animated Timeline Line */}
            <motion.div 
              initial="hidden" 
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={shouldReduceMotion ? { hidden: { height: "100%" }, visible: { height: "100%" } } : lineVariant}
              className="absolute left-0 top-0 bottom-0 w-px bg-border/50 origin-top" 
            />

            {profile.journey.map((step, index) => (
              <motion.div 
                key={index} 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={stepVariant}
                className="relative pl-8 md:pl-12"
              >
                {/* Node */}
                <motion.span 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="absolute -left-1.5 top-2 w-3 h-3 rounded-full bg-card border border-accent ring-4 ring-background" 
                />
                
                <h3 className="font-mono text-lg font-medium text-foreground mb-2">
                  <span className="text-accent mr-3">{(index + 1).toString().padStart(2, '0')}</span>
                  {step.title}
                </h3>
                <p className="text-muted leading-relaxed max-w-2xl text-balance">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUpVariant}
            className="mt-16 p-8 border border-border bg-card/30 rounded-sm"
          >
            <p className="font-mono text-lg text-accent italic">"{profile.journeyQuote}"</p>
          </motion.div>
        </div>
      </Container>
    </div>
  );
};
