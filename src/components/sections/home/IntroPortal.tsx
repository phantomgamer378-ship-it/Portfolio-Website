import { Container } from "../../ui/Container";
import { GlyphPortal } from "../../ui/GlyphPortal";
import { ButtonLink } from "../../ui/Button";

const LOOP_ITEMS = [
  {
    label: "Build",
    text: "Turn the rough idea into something real enough to test.",
  },
  {
    label: "Break",
    text: "Stress the edges, find the weak points, and learn from the failure.",
  },
  {
    label: "Understand",
    text: "Trace the system until the pattern becomes clear.",
  },
];

export const IntroPortal = () => {
  return (
    <GlyphPortal
      id="again"
      word="AGAIN"
      scrollLength={2.25}
      className="border-b border-border/30"
      style={{
        "--gp-paper": "#0a0a0a",
        "--gp-accent": "#6366f1",
        "--gp-accent-soft": "rgba(99,102,241,0.2)",
        "--gp-foreground": "#f4f4f5",
      }}
      front={
        <Container className="relative h-full">
          <div className="absolute left-4 top-28 md:left-8 lg:left-12">
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-muted">
              Build / Break / Understand
            </p>
            <div className="mt-5 h-px w-20 bg-accent/60" />
          </div>

          <div className="absolute bottom-24 left-4 max-w-xs md:left-8 lg:left-12">
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-accent">
              Scroll through the loop
            </p>
            <p className="mt-3 font-sans text-lg leading-relaxed text-muted">
              Same color, same idea, one more transition before the story starts.
            </p>
          </div>
        </Container>
      }
    >
      <Container className="w-full">
        <div className="max-w-6xl">
          <p className="mb-5 font-mono text-sm uppercase tracking-[0.28em] text-accent">
            The loop
          </p>
          <h2 className="max-w-4xl font-sans text-4xl font-bold leading-[1.05] tracking-tighter text-foreground md:text-6xl lg:text-7xl">
            I keep returning with sharper questions.
          </h2>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {LOOP_ITEMS.map((item, index) => (
              <div key={item.label} className="border-t border-foreground/20 pt-5">
                <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">
                  {String(index + 1).padStart(2, "0")} / {item.label}
                </p>
                <p className="mt-4 font-sans text-base leading-relaxed text-foreground/80">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-4">
            <ButtonLink href="#story" variant="primary" size="md">
              Continue Story
            </ButtonLink>
            <ButtonLink href="#build" variant="outline" size="md">
              Jump To Work
            </ButtonLink>
          </div>
        </div>
      </Container>
    </GlyphPortal>
  );
};
