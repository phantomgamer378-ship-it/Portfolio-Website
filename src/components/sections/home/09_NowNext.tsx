import { Container } from "../../ui/Container";
import { motion } from "framer-motion";

// These can later be fetched from Supabase
const NOW_ITEMS = [
  "JavaScript",
  "React",
  "Node.js",
  "DSA",
  "Machine Learning",
  "Deep Learning"
];

const NEXT_ITEMS = [
  "Advanced DSA",
  "Cybersecurity",
  "Systems",
  "Networking",
  "Deep Learning",
  "Security Research"
];

export const NowNext = () => {
  return (
    <section id="nownext" className="relative py-32 border-b border-border/30 bg-muted/10">
      <Container>
        <div className="grid md:grid-cols-2 gap-24">
          
          {/* NOW */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-sans text-4xl md:text-5xl font-bold tracking-tighter text-foreground mb-4">
              NOW
            </h2>
            <div className="h-px w-24 bg-accent/50 mb-12" />
            
            <ul className="flex flex-col gap-6">
              {NOW_ITEMS.map((item, index) => (
                <motion.li
                  key={`now-${index}`}
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  className="flex items-center gap-4"
                >
                  <span className="font-mono text-accent text-sm">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="font-mono text-xl md:text-2xl text-foreground">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* NEXT */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="font-sans text-4xl md:text-5xl font-bold tracking-tighter text-foreground mb-4">
              NEXT
            </h2>
            <div className="h-px w-24 bg-border mb-12" />
            
            <ul className="flex flex-col gap-6">
              {NEXT_ITEMS.map((item, index) => (
                <motion.li
                  key={`next-${index}`}
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 0.6, x: 0 }}
                  whileHover={{ opacity: 1, x: 4 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  className="flex items-center gap-4"
                >
                  <span className="font-mono text-muted text-sm">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="font-mono text-xl md:text-2xl text-foreground">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

        </div>
      </Container>
    </section>
  );
};
