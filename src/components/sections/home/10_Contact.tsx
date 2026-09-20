import { Container } from "../../ui/Container";
import { socials } from "../../../data/socials";
import { motion } from "framer-motion";
import { ExternalLink, Mail } from "lucide-react";

export const Contact = () => {
  return (
    <section id="contact" className="relative py-32 min-h-[80svh] flex flex-col justify-center bg-background">
      <Container>
        <div className="max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
            className="font-sans text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-foreground leading-[1.1] mb-12 uppercase"
          >
            GOT AN IDEA?
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-mono text-xl md:text-2xl text-muted flex flex-col gap-2 mb-16"
          >
            <p>A project.</p>
            <p>A problem.</p>
            <p>A weird idea.</p>
            <p>Something worth breaking apart.</p>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="font-sans text-3xl md:text-5xl font-bold tracking-tighter text-accent mb-12"
          >
            Let's talk.
          </motion.h3>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.26 }}
            className="flex flex-wrap items-center gap-6 md:gap-12 font-mono text-sm uppercase tracking-widest"
          >
            {socials.email !== "#" && (
              <a 
                href={`mailto:${socials.email}`} 
                className="text-foreground hover:text-accent transition-colors underline underline-offset-4 flex items-center gap-2"
              >
                <Mail className="h-[18px] w-[18px]" />
                Email
              </a>
            )}
            
            {socials.github !== "#" && (
              <a 
                href={socials.github} 
                target="_blank" 
                rel="noreferrer"
                className="text-foreground hover:text-accent transition-colors underline underline-offset-4 flex items-center gap-2"
              >
                <ExternalLink className="h-[18px] w-[18px]" />
                GitHub
              </a>
            )}
            
            {socials.linkedin !== "#" && (
              <a 
                href={socials.linkedin} 
                target="_blank" 
                rel="noreferrer"
                className="text-foreground hover:text-accent transition-colors underline underline-offset-4 flex items-center gap-2"
              >
                <ExternalLink className="h-[18px] w-[18px]" />
                LinkedIn
              </a>
            )}


          </motion.div>
        </div>
      </Container>
    </section>
  );
};
