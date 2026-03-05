export type MockProject = {
  id: string;
  title: string;
  status: "Planning" | "In Progress" | "Completed";
  description: string;
  stack: string[];
  owner: string;
};

export const mockProjects: MockProject[] = [
  {
    id: "mock-alpha",
    title: "Alpha Commerce Revamp",
    status: "In Progress",
    description:
      "A demo ecommerce redesign project focused on checkout simplification and product discovery.",
    stack: ["React", "TypeScript", "Tailwind"],
    owner: "Product Team A",
  },
  {
    id: "mock-beta",
    title: "Beta Admin Dashboard",
    status: "Planning",
    description:
      "Mock admin interface with analytics widgets, team activity feed, and role-based settings.",
    stack: ["Vite", "Redux", "Charts"],
    owner: "Internal Ops",
  },
  {
    id: "mock-gamma",
    title: "Gamma Docs Portal",
    status: "Completed",
    description:
      "Documentation portal concept with improved search, readability, and section navigation.",
    stack: ["Next.js", "MDX", "Accessibility"],
    owner: "Dev Experience",
  },
  {
    id: "mock-delta",
    title: "Delta Booking Flow",
    status: "In Progress",
    description:
      "Multi-step booking funnel prototype optimized for mobile and low-latency interactions.",
    stack: ["React", "Framer Motion", "UX"],
    owner: "Growth Team",
  },
  {
    id: "mock-epsilon",
    title: "Epsilon Landing Suite",
    status: "Completed",
    description:
      "Collection of marketing landing pages built with a shared visual system and reusable blocks.",
    stack: ["Tailwind", "SEO", "Design System"],
    owner: "Marketing",
  },
  {
    id: "mock-zeta",
    title: "Zeta API Console",
    status: "Planning",
    description:
      "Mock API console interface for testing endpoints, request history, and environment profiles.",
    stack: ["TypeScript", "Monaco", "Developer Tools"],
    owner: "Platform Team",
  },
];
