import { Container } from "../../ui/Container";
import { certifications } from "../../../data/certifications";

export const Proof = () => {
  return (
    <section id="proof" className="relative py-32 border-b border-border/30">
      <Container>
        <div className="mb-24">
          <h2 className="font-sans text-4xl md:text-5xl font-bold tracking-tighter text-foreground mb-4">
            THINGS I'VE DONE
          </h2>
          <div className="h-px w-24 bg-accent/50" />
        </div>

        <div className="max-w-3xl mx-auto flex flex-col gap-32">
          
          {/* Achievements */}
          <div>
            <div className="font-mono text-2xl text-accent mb-12">2026</div>
            
            <div className="flex flex-col items-center text-center relative">
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-border/50 -z-10" />

              <div className="bg-background py-4 px-6 border border-border">
                <h3 className="font-sans text-2xl font-bold tracking-tighter text-foreground">
                  SIH INTERNAL ROUND
                </h3>
                <p className="font-mono text-accent mt-2">1st Position</p>
                <p className="font-mono text-sm text-muted mt-1">Team Vanirakshak</p>
              </div>

              <div className="h-16 flex items-center justify-center text-muted font-sans text-xl">
                ↓
              </div>

              <div className="bg-background py-4 px-6 border border-border">
                <h3 className="font-sans text-2xl font-bold tracking-tighter text-foreground">
                  SUNSTONE ARENA HACKATHON 2.0
                </h3>
                <p className="font-mono text-accent mt-2">2nd Position</p>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="font-sans text-3xl font-bold tracking-tighter text-foreground mb-12 text-center md:text-left">
              CERTIFICATIONS
            </h3>
            
            <div className="flex flex-col">
              <div className="font-mono text-2xl text-accent mb-8">2026</div>
              
              <div className="relative pl-6 md:pl-8 border-l border-border/50 flex flex-col gap-12">
                {certifications.map((cert, i) => (
                  <div key={i} className="relative group">
                    {/* Tree branch connector */}
                    <div className="absolute -left-6 md:-left-8 top-1/2 w-6 md:w-8 h-px bg-border/50 group-hover:bg-accent transition-colors" />
                    
                    <a 
                      href={cert.url || "#"} 
                      target={cert.url ? "_blank" : undefined}
                      rel={cert.url ? "noreferrer" : undefined}
                      className="block p-4 border border-transparent hover:border-border hover:bg-muted/10 transition-colors"
                    >
                      <h4 className="font-sans text-xl font-medium text-foreground group-hover:text-accent transition-colors">
                        {cert.title}
                      </h4>
                      <p className="font-mono text-sm text-muted mt-2">
                        {cert.issuer}
                      </p>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};
