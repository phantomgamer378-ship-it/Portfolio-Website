import { Container } from "../../ui/Container";

const STACK_CATEGORIES = [
  {
    title: "LANGUAGES",
    items: [
      { name: "C / C++", status: "experienced" },
      { name: "Python", status: "experienced" },
      { name: "JavaScript", status: "experienced" },
    ]
  },
  {
    title: "WEB",
    items: [
      { name: "HTML / CSS", status: "experienced" },
      { name: "React", status: "experienced" },
      { name: "Node.js", status: "learning" },
      { name: "Express.js", status: "learning" },
    ]
  },
  {
    title: "DATA / AI",
    items: [
      { name: "NumPy", status: "experienced" },
      { name: "Machine Learning", status: "learning" },
      { name: "Deep Learning", status: "learning" },
    ]
  },
  {
    title: "AI DEVELOPMENT",
    items: [
      { name: "Prompt Engineering", status: "experienced" },
      { name: "AI-assisted development", status: "experienced" },
    ]
  },
  {
    title: "AUTOMATION",
    items: [
      { name: "n8n", status: "experienced" },
    ]
  }
];

export const Stack = () => {
  return (
    <section id="stack" className="relative py-32 border-b border-border/30">
      <Container>
        <div className="mb-24">
          <h2 className="font-sans text-4xl md:text-5xl font-bold tracking-tighter text-foreground mb-4">
            THE STACK
          </h2>
          <div className="h-px w-24 bg-accent/50 mb-6" />
          <div className="flex gap-6 font-mono text-xs">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-foreground" />
              EXPERIENCED
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              CURRENTLY LEARNING
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-24 relative">
          
          {/* Left: Sticky Category Index or just empty space to allow right side to scroll */}
          <div className="hidden md:block">
            <div className="sticky top-32 flex flex-col gap-6">
              {STACK_CATEGORIES.map((category) => (
                <div key={`idx-${category.title}`} className="font-mono text-sm text-muted uppercase tracking-widest">
                  {category.title}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Scrolling Stack Items */}
          <div className="flex flex-col gap-24">
            {STACK_CATEGORIES.map((category) => (
              <div key={category.title} className="relative">
                <h3 className="md:hidden font-mono text-sm text-muted uppercase tracking-widest mb-8">
                  {category.title}
                </h3>
                <div className="flex flex-col gap-8">
                  {category.items.map((item) => (
                    <div key={item.name} className="group flex items-center gap-6">
                      <div className={`w-2 h-2 rounded-full transition-colors ${
                        item.status === 'learning' ? 'bg-accent' : 'bg-foreground'
                      }`} />
                      <span className={`font-sans text-3xl md:text-5xl font-bold tracking-tighter transition-colors ${
                        item.status === 'learning' ? 'text-foreground' : 'text-foreground/90 group-hover:text-foreground'
                      }`}>
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </Container>
    </section>
  );
};
