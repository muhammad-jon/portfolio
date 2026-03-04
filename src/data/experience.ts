export type ExperienceItem = {
  id: string;
  company: string;
  role: string;
  years: string;
  summary: string;
  tags: string[];
};

export const experience: ExperienceItem[] = [
  {
    id: "nova-labs",
    company: "Nova Labs",
    role: "Senior Frontend Engineer",
    years: "2024 - Present",
    summary:
      "Leading the React platform layer, focusing on performance budgets, shared component standards, and predictable release quality.",
    tags: ["React", "TypeScript", "Architecture"],
  },
  {
    id: "atlas-digital",
    company: "Atlas Digital",
    role: "Frontend Engineer",
    years: "2022 - 2024",
    summary:
      "Built and maintained customer-facing product flows with reusable UI primitives and measurable UX improvements.",
    tags: ["Next.js", "Redux", "UX"],
  },
  {
    id: "pixel-forge",
    company: "Pixel Forge Studio",
    role: "UI Engineer",
    years: "2021 - 2022",
    summary:
      "Delivered landing pages and dashboard interfaces with a focus on semantic markup, accessibility, and maintainable CSS architecture.",
    tags: ["Tailwind", "Accessibility", "UI"],
  },
  {
    id: "freelance",
    company: "Independent",
    role: "Frontend Developer",
    years: "2019 - 2021",
    summary:
      "Worked with startups to ship MVP interfaces quickly while maintaining code quality and scalable component patterns.",
    tags: ["React", "MVP", "Product"],
  },
];
