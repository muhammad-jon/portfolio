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
    id: "smartbase-ai-analytics",
    title: "AI Analytics Platform",
    imageSrc: project1,
    href: "https://example.com/smartbase-ai-analytics",
    github: "https://github.com/example/smartbase-ai-analytics",
    year: 2025,
    description:
      "AI-driven platform for automated data collection and facial recognition analytics with dynamic dashboards.",
    tags: ["React", "TypeScript", "React Query", "ApexCharts"],
    link: "https://example.com/smartbase-ai-analytics",
  },
  {
    id: "realtime-chat-voice",
    title: "Real-time Chat & Voice",
    imageSrc: project2,
    href: "https://example.com/realtime-chat-voice",
    github: "https://github.com/example/realtime-chat-voice",
    year: 2025,
    description:
      "WebSocket chat and WebRTC-based voice communication with authentication and backend API integration.",
    tags: ["Socket.IO", "WebRTC", "Authentication", "React"],
    link: "https://example.com/realtime-chat-voice",
  },
  {
    id: "ssbrok-customs",
    title: "Customs Automation Platform",
    imageSrc: project3,
    href: "https://example.com/ssbrok-customs",
    github: "https://github.com/example/ssbrok-customs",
    year: 2024,
    description:
      "Customs workflow product that reduced processing time from days to hours with role-based navigation and live updates.",
    tags: ["Role-based Access", "REST APIs", "Optimization"],
    link: "https://example.com/ssbrok-customs",
  },
  {
    id: "sap-crm-integration",
    title: "SAP + CRM Integration",
    imageSrc: project1,
    href: "https://example.com/sap-crm-integration",
    github: "https://github.com/example/sap-crm-integration",
    year: 2024,
    description: "Enterprise integration platform with role-based access for 8 different user roles.",
    tags: ["React", "Enterprise", "Role-based Access"],
    link: "https://example.com/sap-crm-integration",
  },
  {
    id: "nextjs-ecommerce",
    title: "Next.js eCommerce",
    imageSrc: project2,
    href: "https://example.com/nextjs-ecommerce",
    github: "https://github.com/example/nextjs-ecommerce",
    year: 2024,
    description:
      "eCommerce frontend built with Next.js and Sass, improving load performance by approximately 15%.",
    tags: ["Next.js", "Sass", "Performance"],
    link: "https://example.com/nextjs-ecommerce",
  },
  {
    id: "expense-tracker-firebase",
    title: "Expense Tracker App",
    imageSrc: project3,
    href: "https://example.com/expense-tracker-firebase",
    github: "https://github.com/example/expense-tracker-firebase",
    year: 2023,
    description:
      "Expense tracking app with secure authentication and image-based records, built with React and Firebase.",
    tags: ["React", "Firebase", "Authentication"],
    link: "https://example.com/expense-tracker-firebase",
  },
];
