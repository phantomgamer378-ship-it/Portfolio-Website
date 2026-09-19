export const motionTokens = {
  duration: {
    micro: 0.15, // 150ms
    ui: 0.3,    // 300ms
    section: 0.5, // 500ms
    hero: 0.9,   // 900ms
  },
  ease: {
    default: [0.25, 1, 0.5, 1] as [number, number, number, number],
    expressive: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
  },
};

export const getFadeUpVariant = (reducedMotion: boolean | null = false) => ({
  hidden: { opacity: 0, y: reducedMotion ? 0 : 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: motionTokens.duration.section,
      ease: motionTokens.ease.default
    }
  }
});

// Used in legacy pages, to be migrated if possible
export const fadeUpVariant = getFadeUpVariant(false);

export const getPageTransition = (reducedMotion: boolean | null = false) => ({
  hidden: { opacity: 0, y: reducedMotion ? 0 : 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: motionTokens.duration.ui, ease: motionTokens.ease.default }
  },
  exit: { 
    opacity: 0, 
    transition: { duration: motionTokens.duration.micro, ease: motionTokens.ease.default }
  }
});
