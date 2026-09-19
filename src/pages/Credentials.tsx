import { motion } from "framer-motion";
import { Container } from "../components/ui/Container";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Card } from "../components/ui/Card";
import { Chip } from "../components/ui/Chip";
import { ExternalLink } from "../components/ui/ExternalLink";
import { fadeUpVariant } from "../lib/motion";
import { skills } from "../data/skills";
import { achievements } from "../data/achievements";
import { certifications } from "../data/certifications";

export const Credentials = () => {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <Container>
        <motion.div initial="hidden" animate="visible" variants={fadeUpVariant} className="max-w-4xl space-y-32">
          
          {/* Skills Section */}
          <section>
            <SectionHeading level={1} subhead="Stack" className="mb-12">
              Capabilities
            </SectionHeading>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="font-mono text-sm text-accent uppercase tracking-widest mb-6">Experienced</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.experienced.map((skill) => (
                    <Chip key={skill} active>{skill}</Chip>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-mono text-sm text-muted uppercase tracking-widest mb-6">Currently Learning</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.currentlyLearning.map((skill) => (
                    <Chip key={skill}>{skill}</Chip>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Achievements Section */}
          <section>
            <SectionHeading level={1} subhead="Recognition" className="mb-12">
              Achievements
            </SectionHeading>
            <div className="grid gap-6">
              {achievements.map((achievement, idx) => (
                <Card key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-sans text-xl font-semibold text-foreground">{achievement.title}</h3>
                    {achievement.team && (
                      <p className="font-mono text-sm text-muted mt-1">Team: {achievement.team}</p>
                    )}
                  </div>
                  <div className="font-mono text-accent text-lg">
                    {achievement.position}
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Certifications Section */}
          <section>
            <SectionHeading level={1} subhead="Verifications" className="mb-12">
              Certifications
            </SectionHeading>
            <div className="grid md:grid-cols-2 gap-6">
              {certifications.map((cert, idx) => (
                <Card key={idx} className="flex flex-col h-full">
                  <div className="flex-1">
                    <h3 className="font-sans text-lg font-medium text-foreground mb-1">{cert.title}</h3>
                    <p className="font-mono text-sm text-muted">{cert.issuer}</p>
                    <p className="font-mono text-xs text-muted/70 mt-2">{cert.date}</p>
                  </div>
                  {cert.url && cert.url !== "#" && (
                    <div className="mt-6 pt-4 border-t border-border/50">
                      <ExternalLink href={cert.url} className="text-sm">
                        View Credential
                      </ExternalLink>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </section>

        </motion.div>
      </Container>
    </div>
  );
};
