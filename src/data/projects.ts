import okeybo from "../assets/projects/okeybo.png";
import pixeltech from "../assets/projects/pixeltech.png";
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
    id: "okeybo-ai-health-platform",
    title: "OkeyBo AI Health Assistant",
    imageSrc: okeybo,
    href: "https://okeybo.uz/uz",
    github: "",
    year: 2025,
    description:
      "AI-powered health assistant platform designed to help users quickly analyze symptoms and receive preliminary guidance before visiting a doctor. The platform provides fast AI triage, health recommendations, and an intuitive interface focused on accessibility and speed.",
    tags: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    link: "https://okeybo.uz/uz",
  },
  {
    id: "pixeltech-website",
    title: "PixelTech IT Company Website",
    imageSrc: pixeltech,
    href: "http://pixeltech.uz/",
    github: "",
    year: 2025,
    description:
      "Corporate website for an IT services company showcasing software development solutions, company portfolio, and services. Built with a modern responsive interface focused on clear service presentation, performance, and user-friendly navigation.",
    tags: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Corporate Website",
      "UI/UX",
      "Responsive Design",
    ],
    link: "http://pixeltech.uz/",
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
    description:
      "Enterprise integration platform with role-based access for 8 different user roles.",
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
