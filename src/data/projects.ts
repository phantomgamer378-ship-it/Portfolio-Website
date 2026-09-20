export interface ProjectFeature {
  name: string;
  status: string;
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  team: string | null;
  concept: string;
  features: ProjectFeature[];
  technologies: string[];
  achievements: string[];
  repository: string | null;
  demo?: string | null;
}

export const projects: Project[] = [
  {
    slug: "vanirakshak",
    title: "VANIRAKSHAK",
    subtitle: "AI-Powered Real-Time Detection and Prevention of Voice Cloning Impersonation Attacks",
    team: "Vanirakhshak",
    concept: "A security-oriented system for detecting and helping prevent AI-generated voice-cloning impersonation attacks.",
    features: [
      { name: "call screening", status: "unknown" },
      { name: "real-time risk analysis", status: "unknown" },
      { name: "message scanner", status: "unknown" },
      { name: "URL checker", status: "unknown" },
      { name: "AI chatbot", status: "unknown" },
      { name: "secure authentication", status: "unknown" },
      { name: "dashboard", status: "unknown" },
      { name: "voice/deepfake detection", status: "unknown" },
      { name: "dynamic risk score", status: "unknown" },
      { name: "scam intent detection", status: "unknown" },
      { name: "attack classification", status: "unknown" },
      { name: "adaptive liveness", status: "unknown" },
      { name: "trusted voice memory", status: "unknown" },
      { name: "Hindi", status: "unknown" },
      { name: "Marathi", status: "unknown" },
      { name: "code-mixed speech", status: "unknown" },
      { name: "explainable evidence", status: "unknown" }
    ],
    technologies: [
      "React", "Next.js", "Vite", "Tailwind", "Supabase", "WebRTC", 
      "Whisper", "Ollama", "Indica", "OpenRouter", "n8n", "JWT", "Google OAuth"
    ],
    achievements: [
      "SIH Internal Round - 1st Position",
      "Sunstone Arena Hackathon 2.0 - 2nd Position"
    ],
    repository: null
  },
  {
    slug: "bias-environment",
    title: "BIAS ENVIRONMENT",
    subtitle: "Details to be added",
    team: null,
    concept: "Details to be added",
    features: [],
    technologies: [],
    achievements: [],
    repository: "https://github.com/phantomgamer378-ship-it/bias-env"
  },
  {
    slug: "bustro",
    title: "BUSTRO-",
    subtitle: "Details to be added",
    team: null,
    concept: "Details to be added",
    features: [],
    technologies: [],
    achievements: [],
    repository: "https://github.com/phantomgamer378-ship-it/BUSTRO-"
  },
  {
    slug: "guardianshield",
    title: "GUARDIANSHIELD",
    subtitle: "AI-powered scam & threat detection API",
    team: null,
    concept: "GuardianShield is an AI-powered scam and threat detection API designed to secure environments.",
    features: [],
    technologies: [],
    achievements: [],
    repository: "https://github.com/phantomgamer378-ship-it/guardianshield",
    demo: "https://guardianshield-v3.netlify.app"
  },
  {
    slug: "under-dox",
    title: "UNDER_DOX",
    subtitle: "hackwork repo",
    team: null,
    concept: "hackwork repo",
    features: [],
    technologies: [],
    achievements: [],
    repository: "https://github.com/phantomgamer378-ship-it/UNDER_DOX",
    demo: null
  },
  {
    slug: "before-eat-app",
    title: "BEFORE BITES",
    subtitle: "Track the journey, not just the calories.",
    team: null,
    concept: "Details to be added",
    features: [],
    technologies: [],
    achievements: [],
    repository: null,
    demo: "https://before-eat-app.netlify.app"
  }
];
