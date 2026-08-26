export const profile = {
  name: "Augusto da Rocha Polonio",
  headline: "Game Developer • Senior Full Stack Engineer",
  location: "Ivoti, Brasil (Remoto)",
  contacts: {
    email: "augustodrp@gmail.com",
    phone: "+55 (51) 98270-7242"
  },
  education: [
    {
      degree: "Tecnólogo em Análise e Desenvolvimento de Sistemas",
      institution: "Senac-RS",
      period: "2013-2015 (Concluído)",
      details:
        "Foco em fundamentos de engenharia de software, design de sistemas e tecnologias web."
    }
  ],
  skills: {
    "Tech Stack": ["TypeScript", "JavaScript", "C#", "SQL", "HTML", "CSS", "GDScript"],
    "Frameworks": ["React", "Next.js", "Node.js", ".NET", "Sencha ExtJS"],
    "Desenvolvimento de Jogos": ["Unity", "Godot", "Three.js", "Phaser", "Blender", "Tiled", "Aseprite", "Unreal Engine (estudando)"],
    "Ferramentas Criativas e Mídia": ["Affinity", "Photoshop", "Illustrator", "Blender", "DaVinci Resolve", "Studio One", "Sonar", "Pro Tools", "After Effects"],
    "Práticas": ["Liderança Técnica", "CI/CD", "Desenvolvimento Orientado por Specs", "Code Reviews", "SOLID"],
    "Ferramentas IA": ["GitHub Copilot", "Amazon Kiro", "Ollama", "LM Studio", "OpenCode", "SUNO AI", "Text-to-Speech"]
  },
  spokenLanguages: ["Português (Nativo)", "Inglês (B2)"],
  links: [
    {
      label: "Portfólio",
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
      label: "Twitter/X",
      url: "https://x.com/augustopolonio"
    },
    {
      label: "Linktree",
      url: "https://linktr.ee/augustopolonio"
    }
  ]
};

export const buildProfileSummary = ({ webMobileYears, gameDevYears }) =>
  `Engenheiro de Software Sênior e Desenvolvedor Indie de Jogos com ${webMobileYears}+ anos construindo produtos SaaS, web e mobile, e ${gameDevYears}+ anos desenvolvendo jogos independentes para PC, mobile e web. Experiente em liderar iniciativas técnicas, modernização de arquitetura, CI/CD, mentoria e otimização de performance. Atualmente transitando o foco profissional para Desenvolvimento de Jogos, mesclando profundidade técnica com uma paixão vitalícia por criar experiências interativas, usando Unity, Godot e Three.js. Sólido histórico de adoção de fluxos de trabalho assistidos por IA e exploração de ferramentas IA open-source para acelerar o fluxo de desenvolvimento.`;
