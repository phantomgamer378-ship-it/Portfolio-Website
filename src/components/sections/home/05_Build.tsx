import { Container } from "../../ui/Container";
import { Link } from "react-router-dom";
import { projects } from "../../../data/projects";

export const Build = () => {
  const vanirakshak = projects.find(p => p.slug === "vanirakshak")!;
  const bias = projects.find(p => p.slug === "bias-environment")!;

  return (
    <section id="build" className="relative py-32 border-b border-border/30 bg-muted/20">
      <Container>
        <div className="mb-24">
          <h2 className="font-sans text-4xl md:text-5xl font-bold tracking-tighter text-foreground mb-4">
            WHAT I'VE BUILT
          </h2>
          <div className="h-px w-24 bg-accent/50" />
        </div>

        <div className="flex flex-col gap-32">
          
          {/* Project 01: Vanirakshak */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-24 relative">
            {/* Left: Sticky Project Visual */}
            <div className="hidden md:block">
              <div className="sticky top-32">
                <div className="aspect-square bg-card border border-border flex flex-col p-8 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="flex-1" />
                  <h3 className="font-sans text-4xl font-bold tracking-tighter text-foreground z-10">
                    01 <br />
                    {vanirakshak.title}
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-2 z-10">
                    <span className="font-mono text-xs px-2 py-1 bg-background border border-border text-muted">Security</span>
                    <span className="font-mono text-xs px-2 py-1 bg-background border border-border text-muted">AI</span>
                    <span className="font-mono text-xs px-2 py-1 bg-background border border-border text-muted">WebRTC</span>
                    <span className="font-mono text-xs px-2 py-1 bg-background border border-border text-muted">ML</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Scrolling Details */}
            <div className="flex flex-col gap-16">
              <div className="md:hidden">
                <h3 className="font-sans text-3xl font-bold tracking-tighter text-foreground">
                  01 {vanirakshak.title}
                </h3>
              </div>

              <div>
                <p className="font-mono text-sm text-accent uppercase tracking-widest mb-4">The Concept</p>
                <p className="font-sans text-xl md:text-2xl text-foreground leading-relaxed">
                  {vanirakshak.subtitle}
                </p>
                <p className="font-sans text-muted mt-4">
                  {vanirakshak.concept}
                </p>
              </div>

              <div>
                <p className="font-mono text-sm text-accent uppercase tracking-widest mb-4">Architecture & Tech</p>
                <div className="flex flex-wrap gap-2">
                  {vanirakshak.technologies.map(tech => (
                    <span key={tech} className="font-mono text-sm text-muted">
                      {tech} &middot;
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-mono text-sm text-accent uppercase tracking-widest mb-4">Achievements</p>
                <ul className="flex flex-col gap-4">
                  {vanirakshak.achievements.map((ach, i) => (
                    <li key={i} className="font-sans text-foreground pb-4 border-b border-border/50">
                      {ach}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <Link to={`/work/${vanirakshak.slug}`} className="inline-flex items-center gap-2 font-mono text-sm text-foreground hover:text-accent transition-colors group">
                  Explore case study
                  <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Project 02: Bias Environment */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-24 relative mt-16 pt-16 border-t border-border/30">
            <div className="hidden md:block">
              <div className="sticky top-32">
                <div className="aspect-square bg-card border border-border flex flex-col p-8 relative overflow-hidden group">
                  <div className="flex-1" />
                  <h3 className="font-sans text-4xl font-bold tracking-tighter text-foreground z-10">
                    02 <br />
                    {bias.title}
                  </h3>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-16">
              <div className="md:hidden">
                <h3 className="font-sans text-3xl font-bold tracking-tighter text-foreground">
                  02 {bias.title}
                </h3>
              </div>
              
              <div>
                <p className="font-sans text-xl md:text-2xl text-foreground leading-relaxed">
                  {bias.subtitle}
                </p>
              </div>

              <div>
                <Link to={`/work/${bias.slug}`} className="inline-flex items-center gap-2 font-mono text-sm text-foreground hover:text-accent transition-colors group">
                  Explore project
                  <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};
