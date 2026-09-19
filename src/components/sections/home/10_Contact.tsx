import { Container } from "../../ui/Container";
import { socials } from "../../../data/socials";

export const Contact = () => {
  return (
    <section id="contact" className="relative py-32 min-h-[80svh] flex flex-col justify-center bg-background">
      <Container>
        <div className="max-w-3xl">
          <h2 className="font-sans text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-foreground leading-[1.1] mb-12 uppercase">
            GOT AN IDEA?
          </h2>
          
          <div className="font-mono text-xl md:text-2xl text-muted flex flex-col gap-2 mb-16">
            <p>A project.</p>
            <p>A problem.</p>
            <p>A weird idea.</p>
            <p>Something worth breaking apart.</p>
          </div>

          <h3 className="font-sans text-3xl md:text-5xl font-bold tracking-tighter text-accent mb-12">
            Let's talk.
          </h3>

          <div className="flex flex-wrap items-center gap-6 md:gap-12 font-mono text-sm uppercase tracking-widest">
            {socials.email !== "#" && (
              <a 
                href={`mailto:${socials.email}`} 
                className="text-foreground hover:text-accent transition-colors underline underline-offset-4"
              >
                Email
              </a>
            )}
            
            {socials.github !== "#" && (
              <a 
                href={socials.github} 
                target="_blank" 
                rel="noreferrer"
                className="text-foreground hover:text-accent transition-colors underline underline-offset-4"
              >
                GitHub
              </a>
            )}
            
            {socials.linkedin !== "#" && (
              <a 
                href={socials.linkedin} 
                target="_blank" 
                rel="noreferrer"
                className="text-foreground hover:text-accent transition-colors underline underline-offset-4"
              >
                LinkedIn
              </a>
            )}


          </div>
        </div>
      </Container>
    </section>
  );
};
