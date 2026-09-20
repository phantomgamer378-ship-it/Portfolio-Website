import { useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Container } from "../components/ui/Container";
import { SectionHeading } from "../components/ui/SectionHeading";
import { TechnicalLabel } from "../components/ui/TechnicalLabel";
import { Badge } from "../components/ui/Badge";
import { ExternalLink } from "../components/ui/ExternalLink";
import { fadeUpVariant } from "../lib/motion";
import { projects } from "../data/projects";

export const WorkDetail = () => {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return <Navigate to="/work" replace />;
  }

  // Define architecture flow specifically for Vanirakshak as requested
  const isVanirakshak = project.slug === "vanirakshak";

  return (
    <article className="pt-32 pb-24 min-h-screen">
      <Container>
        <motion.div initial="hidden" animate="visible" variants={fadeUpVariant} className="max-w-4xl">
          <header className="mb-20">
            <h1 className="text-4xl md:text-6xl font-sans font-bold text-foreground mb-6 leading-tight">
              {project.title}
            </h1>
            <p className="text-xl text-muted font-mono mb-10 max-w-3xl">
              {project.subtitle}
            </p>
            
            <div className="flex flex-wrap gap-x-8 gap-y-4 py-6 border-y border-border/50">
              {project.team && (
                <TechnicalLabel label="Team" value={project.team} />
              )}
              {project.repository && (
                <TechnicalLabel 
                  label="Repository" 
                  value={<ExternalLink href={project.repository}>GitHub</ExternalLink>} 
                />
              )}
              {project.demo && (
                <TechnicalLabel 
                  label="Demo" 
                  value={<ExternalLink href={project.demo}>Live Demo</ExternalLink>} 
                />
              )}
            </div>
          </header>

          <div className="space-y-20">
            {/* Concept / Context */}
            <section>
              <SectionHeading level={2} subhead="Context" className="mb-6">
                The Concept
              </SectionHeading>
              <p className="text-muted leading-relaxed text-lg max-w-3xl">
                {project.concept}
              </p>
            </section>

            {/* Architecture (conditional for Vanirakshak) */}
            {isVanirakshak && (
              <section>
                <SectionHeading level={2} subhead="Architecture" className="mb-6">
                  System Flow
                </SectionHeading>
                <div className="p-8 border border-border bg-card/30 rounded-sm font-mono text-sm text-muted">
                  <div className="flex flex-col gap-2 max-w-xs mx-auto">
                    <div className="p-3 border border-border/50 text-center rounded bg-card">Voice</div>
                    <div className="text-center text-accent">↓</div>
                    <div className="p-3 border border-border/50 text-center rounded bg-card">WebRTC/audio</div>
                    <div className="text-center text-accent">↓</div>
                    <div className="p-3 border border-border/50 text-center rounded bg-card">ASR</div>
                    <div className="text-center text-accent">↓</div>
                    <div className="p-3 border border-border/50 text-center rounded bg-card">Voice analysis</div>
                    <div className="text-center text-accent">↓</div>
                    <div className="p-3 border border-border/50 text-center rounded bg-card">Scam intent</div>
                    <div className="text-center text-accent">↓</div>
                    <div className="p-3 border border-border/50 text-center rounded bg-card">Risk engine</div>
                    <div className="text-center text-accent">↓</div>
                    <div className="p-3 border border-accent/50 text-accent text-center rounded bg-accent/10">User alert</div>
                  </div>
                </div>
              </section>
            )}

            {/* Features */}
            {project.features && project.features.length > 0 && (
              <section>
                <SectionHeading level={2} subhead="Implementation" className="mb-6">
                  Features
                </SectionHeading>
                <div className="grid sm:grid-cols-2 gap-4">
                  {project.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 border border-border rounded-sm bg-card/50">
                      <span className="font-sans text-foreground">{feature.name}</span>
                      <Badge variant={feature.status === "unknown" ? "outline" : "default"}>
                        {feature.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
              <section>
                <SectionHeading level={2} subhead="Stack" className="mb-6">
                  Technology
                </SectionHeading>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="px-3 py-1 border border-border/50 rounded bg-card text-muted font-mono text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Achievements */}
            {project.achievements && project.achievements.length > 0 && (
              <section>
                <SectionHeading level={2} subhead="Outcome" className="mb-6">
                  Achievements
                </SectionHeading>
                <ul className="space-y-4">
                  {project.achievements.map((achievement, idx) => (
                    <li key={idx} className="flex items-center gap-3 font-sans text-muted">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </motion.div>
      </Container>
    </article>
  );
};
