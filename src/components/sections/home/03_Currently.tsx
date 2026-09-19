import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "../../ui/Container";

const CURRENT_ITEMS = [
  { id: "js", label: "JavaScript", desc: "Building interactive web experiences." },
  { id: "react", label: "React", desc: "Component-driven UI architectures." },
  { id: "node", label: "Node.js", desc: "Backend scalable systems." },
  { id: "express", label: "Express.js", desc: "RESTful APIs and routing." },
  { id: "dsa", label: "DSA", desc: "Algorithmic problem solving & efficiency." },
  { id: "ml", label: "Machine Learning", desc: "Predictive models and data analysis." },
  { id: "dl", label: "Deep Learning", desc: "Neural networks and advanced AI architectures." }
];

export const Currently = () => {
  return (
    <section id="currently" className="relative py-32 border-b border-border/30 bg-muted/20">
      <Container>
        <div className="mb-24">
          <h2 className="font-sans text-4xl md:text-5xl font-bold tracking-tighter text-foreground mb-4">
            CURRENTLY OBSESSED WITH
          </h2>
          <div className="h-px w-24 bg-accent/50" />
        </div>

        <div className="flex flex-col gap-12 md:gap-32 pb-32">
          {CURRENT_ITEMS.map((item, index) => (
            <CurrentlyItem 
              key={item.id}
              item={item}
              index={index}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

function CurrentlyItem({ item, index }: { item: typeof CURRENT_ITEMS[0], index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  
  // We use scroll offset center to center so it highlights when in the middle of viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 1, 0.2]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  const x = useTransform(scrollYProgress, [0, 0.5, 1], [0, 20, 0]);

  return (
    <motion.div 
      ref={ref}
      style={{ opacity, scale, x }}
      className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 origin-left"
    >
      <span className="font-mono text-xl md:text-2xl text-accent opacity-80">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div>
        <h3 className="font-sans text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-foreground leading-[1.1]">
          {item.label}
        </h3>
        <motion.p 
          style={{ opacity: useTransform(opacity, (o) => (o > 0.8 ? 1 : 0)) }}
          className="font-mono text-lg text-muted mt-4 transition-opacity duration-300"
        >
          {item.desc}
        </motion.p>
      </div>
    </motion.div>
  );
}
