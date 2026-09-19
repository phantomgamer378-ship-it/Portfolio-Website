import { motion } from "framer-motion";
import { Container } from "../components/ui/Container";
import { SectionHeading } from "../components/ui/SectionHeading";
import { ExternalLink } from "../components/ui/ExternalLink";
import { fadeUpVariant } from "../lib/motion";
import { socials } from "../data/socials";

export const Contact = () => {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <Container>
        <motion.div initial="hidden" animate="visible" variants={fadeUpVariant} className="max-w-2xl">
          <SectionHeading level={1} subhead="Reach Out" className="mb-12">
            Contact
          </SectionHeading>
          
          <p className="text-muted text-lg mb-12 max-w-lg">
            I am always open to discussing new opportunities, exploring interesting technologies, or talking about security and system architectures.
          </p>
          
          <div className="flex flex-col gap-8 border-t border-border/50 pt-12">
            
            <div className="flex flex-col gap-2">
              <span className="font-mono text-sm text-accent uppercase tracking-widest">Email</span>
              {socials.email && socials.email !== "#" ? (
                <a href={`mailto:${socials.email}`} className="text-2xl font-sans font-medium text-foreground hover:text-accent transition-colors w-fit">
                  {socials.email}
                </a>
              ) : (
                <span className="text-2xl font-sans font-medium text-muted">Placeholder@email.com</span>
              )}
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <span className="font-mono text-sm text-accent uppercase tracking-widest">LinkedIn</span>
                {socials.linkedin && socials.linkedin !== "#" ? (
                  <ExternalLink href={socials.linkedin} className="text-lg">Vishal Chauhan</ExternalLink>
                ) : (
                  <span className="text-lg font-mono text-muted">linkedin.com/in/placeholder</span>
                )}
              </div>
              
              <div className="flex flex-col gap-2">
                <span className="font-mono text-sm text-accent uppercase tracking-widest">GitHub</span>
                {socials.github && socials.github !== "#" ? (
                  <ExternalLink href={socials.github} className="text-lg">github.com/placeholder</ExternalLink>
                ) : (
                  <span className="text-lg font-mono text-muted">github.com/placeholder</span>
                )}
              </div>
            </div>
            
          </div>
        </motion.div>
      </Container>
    </div>
  );
};
