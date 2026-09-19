import { Container } from "../../ui/Container";

// These can later be fetched from Supabase
const NOW_ITEMS = [
  "JavaScript",
  "React",
  "Node.js",
  "DSA",
  "Machine Learning",
  "Deep Learning"
];

const NEXT_ITEMS = [
  "Advanced DSA",
  "Cybersecurity",
  "Systems",
  "Networking",
  "Deep Learning",
  "Security Research"
];

export const NowNext = () => {
  return (
    <section id="nownext" className="relative py-32 border-b border-border/30 bg-muted/10">
      <Container>
        <div className="grid md:grid-cols-2 gap-24">
          
          {/* NOW */}
          <div>
            <h2 className="font-sans text-4xl md:text-5xl font-bold tracking-tighter text-foreground mb-4">
              NOW
            </h2>
            <div className="h-px w-24 bg-accent/50 mb-12" />
            
            <ul className="flex flex-col gap-6">
              {NOW_ITEMS.map((item, index) => (
                <li key={`now-${index}`} className="flex items-center gap-4">
                  <span className="font-mono text-accent text-sm">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="font-mono text-xl md:text-2xl text-foreground">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* NEXT */}
          <div>
            <h2 className="font-sans text-4xl md:text-5xl font-bold tracking-tighter text-foreground mb-4">
              NEXT
            </h2>
            <div className="h-px w-24 bg-border mb-12" />
            
            <ul className="flex flex-col gap-6">
              {NEXT_ITEMS.map((item, index) => (
                <li key={`next-${index}`} className="flex items-center gap-4 opacity-60 hover:opacity-100 transition-opacity">
                  <span className="font-mono text-muted text-sm">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="font-mono text-xl md:text-2xl text-foreground">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </Container>
    </section>
  );
};
