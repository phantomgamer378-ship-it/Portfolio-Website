import { Container } from "../../ui/Container";
import { Link } from "react-router-dom";
import { projects } from "../../../data/projects";
import beforeBitesImg from "../../../assets/before-bites.png";
import vanirakshakImg from "../../../assets/vanirakshak.png";
import { motion } from "framer-motion";

export const Build = () => {
  const vanirakshak = projects.find(p => p.slug === "vanirakshak")!;
  const beforeBites = projects.find(p => p.slug === "before-eat-app")!;

  return (
    <section id="build" className="relative overflow-hidden py-32 border-b border-border/30 bg-muted/20">
      <Container>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mb-24"
        >
          <h2 className="font-sans text-4xl md:text-5xl font-bold tracking-tighter text-foreground mb-4">
            WHAT I'VE BUILT
          </h2>
          <div className="h-px w-24 bg-accent/50" />
        </motion.div>

        <div className="flex flex-col gap-32">
          
          {/* Project 01: Vanirakshak */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-24 relative">
            {/* Left: Sticky Project Visual */}
            <div className="hidden md:block">
              <div className="sticky top-32">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="aspect-square bg-card border border-border flex flex-col relative overflow-hidden group"
                >
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
                    style={{ backgroundImage: `url(${vanirakshakImg})` }} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
                  <div className="flex-1" />
                  <div className="p-8 z-10 flex flex-col justify-end">
                    <h3 className="font-sans text-4xl font-bold tracking-tighter text-foreground">
                      01 <br />
                      {vanirakshak.title}
                    </h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="font-mono text-xs px-2 py-1 bg-background/80 backdrop-blur-sm border border-border text-muted">Security</span>
                      <span className="font-mono text-xs px-2 py-1 bg-background/80 backdrop-blur-sm border border-border text-muted">AI</span>
                      <span className="font-mono text-xs px-2 py-1 bg-background/80 backdrop-blur-sm border border-border text-muted">WebRTC</span>
                      <span className="font-mono text-xs px-2 py-1 bg-background/80 backdrop-blur-sm border border-border text-muted">ML</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right: Scrolling Details */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, staggerChildren: 0.1 }}
              className="flex flex-col gap-16"
            >
              <div className="md:hidden">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5 }}
                  className="mb-8 aspect-[4/3] overflow-hidden border border-border bg-card"
                >
                  <img
                    src={vanirakshakImg}
                    alt={`${vanirakshak.title} project preview`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </motion.div>
                <h3 className="font-sans text-3xl font-bold tracking-tighter text-foreground">
                  01 {vanirakshak.title}
                </h3>
              </div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                <p className="font-mono text-sm text-accent uppercase tracking-widest mb-4">The Concept</p>
                <p className="font-sans text-xl md:text-2xl text-foreground leading-relaxed">
                  {vanirakshak.subtitle}
                </p>
                <p className="font-sans text-muted mt-4">
                  {vanirakshak.concept}
                </p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                <p className="font-mono text-sm text-accent uppercase tracking-widest mb-4">Architecture & Tech</p>
                <div className="flex flex-wrap gap-2">
                  {vanirakshak.technologies.map(tech => (
                    <span key={tech} className="font-mono text-sm text-muted">
                      {tech} &middot;
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                <p className="font-mono text-sm text-accent uppercase tracking-widest mb-4">Achievements</p>
                <ul className="flex flex-col gap-4">
                  {vanirakshak.achievements.map((ach, i) => (
                    <li key={i} className="font-sans text-foreground pb-4 border-b border-border/50">
                      {ach}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                <Link to={`/work/${vanirakshak.slug}`} className="inline-flex items-center gap-2 font-mono text-sm text-foreground hover:text-accent transition-colors group">
                  Explore case study
                  <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Project 02: Before Bites */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-24 relative mt-16 pt-16 border-t border-border/30">
            <div className="hidden md:block">
              <div className="sticky top-32">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="aspect-square bg-card border border-border flex flex-col relative overflow-hidden group"
                >
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
                    style={{ backgroundImage: `url(${beforeBitesImg})` }} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                  <div className="flex-1" />
                  <div className="p-8 z-10">
                    <h3 className="font-sans text-4xl font-bold tracking-tighter text-foreground">
                      02 <br />
                      {beforeBites.title}
                    </h3>
                  </div>
                </motion.div>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, staggerChildren: 0.1 }}
              className="flex flex-col gap-16"
            >
              <div className="md:hidden">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5 }}
                  className="mb-8 aspect-[4/3] overflow-hidden border border-border bg-card"
                >
                  <img
                    src={beforeBitesImg}
                    alt={`${beforeBites.title} project preview`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </motion.div>
                <h3 className="font-sans text-3xl font-bold tracking-tighter text-foreground">
                  02 {beforeBites.title}
                </h3>
              </div>
              
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                <p className="font-sans text-xl md:text-2xl text-foreground leading-relaxed">
                  {beforeBites.subtitle}
                </p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                <Link to={`/work/${beforeBites.slug}`} className="inline-flex items-center gap-2 font-mono text-sm text-foreground hover:text-accent transition-colors group">
                  Explore project
                  <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </Container>
    </section>
  );
};
