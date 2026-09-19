import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Container } from "../components/ui/Container";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Card } from "../components/ui/Card";
import { fadeUpVariant } from "../lib/motion";
import { projects } from "../data/projects";

export const Work = () => {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <Container>
        <motion.div initial="hidden" animate="visible" variants={fadeUpVariant} className="max-w-4xl">
          <SectionHeading level={1} subhead="Projects" className="mb-16">
            Selected Work
          </SectionHeading>
          
          <div className="flex flex-col gap-8">
            {projects.map((project, idx) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 + 0.2 }}
              >
                <Link to={`/work/${project.slug}`} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm">
                  <Card interactive className="h-full flex flex-col justify-between">
                    <div>
                      <h2 className="text-3xl font-sans font-bold text-foreground mb-2 group-hover:text-accent group-hover:translate-x-1 transition-all duration-300">
                        {project.title}
                      </h2>
                      <p className="text-muted text-sm font-mono mb-6 max-w-2xl text-balance opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                        {project.subtitle}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/50">
                      <span className="text-xs font-mono uppercase tracking-widest text-muted group-hover:text-foreground group-hover:translate-x-1 transition-all duration-300">
                        View Case Study →
                      </span>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </div>
  );
};
