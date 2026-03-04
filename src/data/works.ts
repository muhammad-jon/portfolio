export type WorkItem = {
  id: string;
  title: string;
  year: number;
  description: string;
  details: string;
  tags: string[];
  link: string;
};

export const works: WorkItem[] = [
  {
    id: "pulse-commerce",
    title: "Pulse Commerce",
    year: 2025,
    description:
      "Headless storefront with clean navigation and a high-conversion checkout flow.",
    details:
      "Designed and implemented a modular React architecture with route-level splitting and performance budgets. Result: faster product discovery and stable Core Web Vitals across catalog pages.",
    tags: ["React", "TypeScript", "Performance"],
    link: "https://example.com/pulse-commerce",
  },
  {
    id: "atlas-analytics",
    title: "Atlas Analytics",
    year: 2024,
    description:
      "Product analytics dashboard for SaaS teams with clear data storytelling.",
    details:
      "Built reusable data-view components, keyboard-friendly filters, and lazy-rendered chart modules. The UI handles large datasets without compromising responsiveness.",
    tags: ["Next.js", "Redux", "Data Viz"],
    link: "https://example.com/atlas-analytics",
  },
  {
    id: "nomad-docs",
    title: "Nomad Docs",
    year: 2024,
    description:
      "Developer documentation platform with powerful search and content structure.",
    details:
      "Implemented semantic navigation, instant client-side search, and content previews. Focused on accessibility and reduced interaction friction for repeat readers.",
    tags: ["React", "Accessibility", "Search"],
    link: "https://example.com/nomad-docs",
  },
  {
    id: "fitflow-web",
    title: "FitFlow Web App",
    year: 2023,
    description:
      "Responsive fitness coaching app with goal tracking and session planning.",
    details:
      "Shipped a mobile-first interface with component-level skeleton states and optimistic updates. Prioritized fast perceived performance for daily active users.",
    tags: ["TypeScript", "UX", "PWA"],
    link: "https://example.com/fitflow-web",
  },
  {
    id: "studio-cms",
    title: "Studio CMS",
    year: 2025,
    description:
      "Internal content platform for marketing teams and editorial workflows.",
    details:
      "Developed role-based UI states, predictable form patterns, and a compact design system layer. Reduced production mistakes by enforcing strong input validation in the UI.",
    tags: ["Next.js", "Forms", "Design System"],
    link: "https://example.com/studio-cms",
  },
  {
    id: "green-cart",
    title: "GreenCart Checkout",
    year: 2023,
    description:
      "Checkout optimization project focused on trust cues and friction reduction.",
    details:
      "Refined multi-step checkout UX with clear progress, resilient field validation, and smart defaults. Improved completion flow while keeping interactions minimal.",
    tags: ["React", "Conversion", "UI"],
    link: "https://example.com/green-cart",
  },
];
