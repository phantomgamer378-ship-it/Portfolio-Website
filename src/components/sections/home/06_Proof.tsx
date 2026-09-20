import { Container } from "../../ui/Container";
import { certifications } from "../../../data/certifications";
import { motion } from "framer-motion";

export const Proof = () => {
  return (
    <section id="proof" className="relative py-32 border-b border-border/30">
      <Container>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mb-24"
        >
          <h2 className="font-sans text-4xl md:text-5xl font-bold tracking-tighter text-foreground mb-4">
            THINGS I'VE DONE
          </h2>
          <div className="h-px w-24 bg-accent/50" />
        </motion.div>

        <div className="max-w-3xl mx-auto flex flex-col gap-32">
          
          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, staggerChildren: 0.2 }}
          >
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="font-mono text-2xl text-accent mb-12">2026</motion.div>
            
            <div className="flex flex-col items-center text-center relative">
              <motion.div 
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-border/50 -z-10 origin-top" 
              />

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-background py-4 px-6 border border-border">
                <h3 className="font-sans text-2xl font-bold tracking-tighter text-foreground">
                  SIH INTERNAL ROUND
                </h3>
                <p className="font-mono text-accent mt-2">1st Position</p>
                <p className="font-mono text-sm text-muted mt-1">Team Vanirakshak</p>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="h-16 flex items-center justify-center text-muted font-sans text-xl">
                ↓
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="bg-background py-4 px-6 border border-border">
                <h3 className="font-sans text-2xl font-bold tracking-tighter text-foreground">
                  SUNSTONE ARENA HACKATHON 2.0
                </h3>
                <p className="font-mono text-accent mt-2">2nd Position</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
          >
            <motion.h3 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-sans text-3xl font-bold tracking-tighter text-foreground mb-12 text-center md:text-left">
              CERTIFICATIONS
            </motion.h3>
            
            <div className="flex flex-col">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="font-mono text-2xl text-accent mb-8">2026</motion.div>
              
              <div className="relative pl-6 md:pl-8 border-l border-border/50 flex flex-col gap-12">
                {certifications.map((cert, i) => (
                  <CertificationItem key={cert.title} cert={cert} index={i} />
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
};

function CertificationItem({
  cert,
  index,
}: {
  cert: (typeof certifications)[number];
  index: number;
}) {
  const hasUrl = !!cert.url && cert.url !== "#";
  const content = (
    <>
      <h4 className="font-sans text-xl font-medium text-foreground transition-colors group-hover:text-accent">
        {cert.title}
      </h4>
      <p className="mt-2 font-mono text-sm text-muted">
        {cert.issuer} / {cert.date}
      </p>
      {cert.credentialId && (
        <p className="mt-2 max-w-full break-all font-mono text-xs text-muted/70">
          ID: {cert.credentialId}
        </p>
      )}
    </>
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="relative group"
    >
      <div className="absolute -left-6 top-1/2 h-px w-6 bg-border/50 transition-colors group-hover:bg-accent md:-left-8 md:w-8" />

      {hasUrl ? (
        <a
          href={cert.url ?? undefined}
          target="_blank"
          rel="noreferrer"
          className="block border border-transparent p-4 transition-colors hover:border-border hover:bg-muted/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {content}
        </a>
      ) : (
        <div className="border border-transparent p-4 transition-colors group-hover:border-border group-hover:bg-muted/10">
          {content}
        </div>
      )}
    </motion.div>
  );
}
