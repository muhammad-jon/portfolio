export type ProjectItem = {
  id: string;
  title: string;
  year: number;
  description: string;
  tags: string[];
  link: string;
};

export const projects: ProjectItem[] = [
  {
    id: "pulse-commerce",
    title: "Pulse Commerce",
    year: 2025,
    description:
      "Headless storefront with fast category browsing and a polished checkout experience.",
    tags: ["React", "Performance", "Commerce"],
    link: "https://example.com/pulse-commerce",
  },
  {
    id: "atlas-analytics",
    title: "Atlas Analytics",
    year: 2024,
    description: "Analytics dashboard for SaaS teams with reusable charting and filter workflows.",
    tags: ["Next.js", "Dashboard", "Data"],
    link: "https://example.com/atlas-analytics",
  },
  {
    id: "nomad-docs",
    title: "Nomad Docs",
    year: 2024,
    description: "Developer docs platform with instant search and clear content hierarchy.",
    tags: ["Search", "Documentation", "UX"],
    link: "https://example.com/nomad-docs",
  },
  {
    id: "studio-cms",
    title: "Studio CMS",
    year: 2025,
    description: "Editorial platform with strong form ergonomics and modular page tools.",
    tags: ["TypeScript", "CMS", "Forms"],
    link: "https://example.com/studio-cms",
  },
  {
    id: "fitflow-web",
    title: "FitFlow Web App",
    year: 2023,
    description: "Goal-focused coaching app built around responsive, mobile-first interactions.",
    tags: ["PWA", "Responsive", "React"],
    link: "https://example.com/fitflow-web",
  },
];
