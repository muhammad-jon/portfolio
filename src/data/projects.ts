import project1 from "../assets/projects/project-1.svg";
import project2 from "../assets/projects/project-2.svg";
import project3 from "../assets/projects/project-3.svg";

export type ProjectItem = {
  id: string;
  title: string;
  imageSrc: string;
  href: string;
  github?: string;
  year?: number;
  description: string;
  tags: string[];
  link: string;
};

export const projects: ProjectItem[] = [
  {
    id: "pulse-commerce",
    title: "Pulse Commerce",
    imageSrc: project1,
    href: "https://example.com/pulse-commerce",
    github: "https://github.com/example/pulse-commerce",
    year: 2025,
    description:
      "Headless storefront with fast category browsing and a polished checkout experience.",
    tags: ["React", "Performance", "Commerce"],
    link: "https://example.com/pulse-commerce",
  },
  {
    id: "atlas-analytics",
    title: "Atlas Analytics",
    imageSrc: project2,
    href: "https://example.com/atlas-analytics",
    github: "https://github.com/example/atlas-analytics",
    year: 2024,
    description: "Analytics dashboard for SaaS teams with reusable charting and filter workflows.",
    tags: ["Next.js", "Dashboard", "Data"],
    link: "https://example.com/atlas-analytics",
  },
  {
    id: "nomad-docs",
    title: "Nomad Docs",
    imageSrc: project3,
    href: "https://example.com/nomad-docs",
    github: "https://github.com/example/nomad-docs",
    year: 2024,
    description: "Developer docs platform with instant search and clear content hierarchy.",
    tags: ["Search", "Documentation", "UX"],
    link: "https://example.com/nomad-docs",
  },
  {
    id: "studio-cms",
    title: "Studio CMS",
    imageSrc: project1,
    href: "https://example.com/studio-cms",
    github: "https://github.com/example/studio-cms",
    year: 2025,
    description: "Editorial platform with strong form ergonomics and modular page tools.",
    tags: ["TypeScript", "CMS", "Forms"],
    link: "https://example.com/studio-cms",
  },
  {
    id: "fitflow-web",
    title: "FitFlow Web App",
    imageSrc: project2,
    href: "https://example.com/fitflow-web",
    github: "https://github.com/example/fitflow-web",
    year: 2023,
    description: "Goal-focused coaching app built around responsive, mobile-first interactions.",
    tags: ["PWA", "Responsive", "React"],
    link: "https://example.com/fitflow-web",
  },
  {
    id: "zeta-api-console",
    title: "Zeta API Console",
    imageSrc: project3,
    href: "https://example.com/zeta-api-console",
    github: "https://github.com/example/zeta-api-console",
    year: 2026,
    description:
      "Developer-focused API console concept with endpoint testing and environment controls.",
    tags: ["TypeScript", "API", "Developer Tools"],
    link: "https://example.com/zeta-api-console",
  },
];
