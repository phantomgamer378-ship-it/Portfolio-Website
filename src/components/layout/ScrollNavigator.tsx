
import { motion, AnimatePresence } from "framer-motion";
import { useScrollSpy } from "../../hooks/useScrollSpy";
import { useReducedMotion } from "framer-motion";

export interface SectionDescriptor {
  id: string;
  title: string;
}

interface ScrollNavigatorProps {
  sections: SectionDescriptor[];
}

export const ScrollNavigator = ({ sections }: ScrollNavigatorProps) => {
  const sectionIds = sections.map((s) => s.id);
  const activeId = useScrollSpy(sectionIds, 100);
  const shouldReduceMotion = useReducedMotion();

  const activeIndex = sections.findIndex((s) => s.id === activeId);
  const activeIndexToDisplay = activeIndex >= 0 ? activeIndex + 1 : 1;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      if (shouldReduceMotion) {
        el.scrollIntoView();
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      {/* Desktop Navigator */}
      <div className="hidden md:flex fixed right-8 top-1/2 -translate-y-1/2 z-50 flex-col items-center gap-4">
        {sections.map((section, index) => {
          const isActive = section.id === activeId;
          return (
            <div key={section.id} className="relative group flex items-center justify-end">
              <span className="absolute right-8 px-2 py-1 bg-card border border-border text-foreground text-xs font-mono rounded opacity-0 pointer-events-none transition-opacity duration-200 group-hover:opacity-100 whitespace-nowrap">
                {String(index + 1).padStart(2, "0")} &mdash; {section.title}
              </span>
              <button
                onClick={() => scrollToSection(section.id)}
                className="w-8 h-8 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-full"
                aria-label={`Scroll to ${section.title}`}
                aria-current={isActive ? "step" : undefined}
              >
                <div
                  className={`transition-all duration-300 rounded-full ${
                    isActive
                      ? "w-2.5 h-2.5 bg-accent"
                      : "w-1.5 h-1.5 bg-muted hover:bg-foreground/50 hover:scale-125"
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>

      {/* Mobile Navigator */}
      <AnimatePresence>
        {activeIndexToDisplay > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="md:hidden fixed bottom-6 right-6 z-50 bg-card/80 backdrop-blur-md border border-border rounded-full px-4 py-2 font-mono text-xs text-foreground shadow-lg"
          >
            {String(activeIndexToDisplay).padStart(2, "0")} / {String(sections.length).padStart(2, "0")}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
