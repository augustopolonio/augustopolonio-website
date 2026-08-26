export const profile = {
  name: "Augusto da Rocha Polonio",
  headline: "Game Developer • Senior Full Stack Engineer",
  location: "Ivoti, Brazil (Remote)",
  contacts: {
    email: "augustodrp@gmail.com",
    phone: "+55 (51) 98270-7242"
  },
  education: [
    {
      degree: "Degree in Systems Analysis and Development",
      institution: "Senac-RS",
      period: "2013-2015 (Completed)",
      details:
        "Focus on software engineering fundamentals, systems design, and web technologies."
    }
  ],
  skills: {
    "Tech Stack": ["TypeScript", "JavaScript", "C#", "SQL", "HTML", "CSS", "GDScript"],
    Frameworks: ["React", "Next.js", "Node.js", ".NET", "Sencha ExtJS"],
    "Game Development": ["Unity", "Godot", "Gameplay Systems", "Performance Tuning"],
    "Creative & Media Tools": ["Affinity", "Photoshop", "Illustrator", "Blender", "DaVinci Resolve", "Studio One", "Sonar", "Pro Tools", "After Effects"],
    Practices: ["Technical Leadership", "CI/CD", "Spec-Driven Development", "Code Reviews", "SOLID"],
    "AI Tooling": ["GitHub Copilot", "Amazon Kiro", "Ollama", "LM Studio", "OpenCode", "SUNO AI", "Text-to-Speech"]
  },
  spokenLanguages: ["Portuguese (Native)", "English (B2)"],
  links: [
    {
      label: "Portfolio",
      url: "https://augustopolonio.vercel.app/"
    },
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/augustopolonio/"
    },
    {
      label: "GitHub",
      url: "https://github.com/augustopolonio"
    },
    {
      label: "Itch.io",
      url: "https://augustopolonio.itch.io/"
    },
    {
      label: "Twitter",
      url: "https://twitter.com/augustopolonio"
    },
    {
      label: "Linktree",
      url: "https://linktr.ee/augustopolonio"
    }
  ]
};

export const buildProfileSummary = ({ webMobileYears, gameDevYears }) =>
  `Senior Software Engineer and Indie Game Developer with ${webMobileYears}+ years building SaaS, web, and mobile products, and ${gameDevYears}+ years developing independent games for PC, mobile, and web. Experienced in leading technical initiatives, architecture modernization, CI/CD, mentoring, and performance optimization. Currently transitioning career focus into Game Development, merging technical depth with a lifelong passion for interactive experiences, using Unity, Godot, and Three.js. Strong record of adopting AI-assisted workflows and exploring open-source AI tools to accelerate the development workflow.`;
