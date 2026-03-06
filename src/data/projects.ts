import okeybo from "../assets/projects/okeybo.png";
import pixeltech from "../assets/projects/pixeltech.png";
import ssbrok from "../assets/projects/ssbrok.png";
import turonmontessori from "../assets/projects/turonmontessori.png";
import centrum from "../assets/projects/centrum.jpg";
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
    id: "ssbrok-client-dashboard",
    title: "SSBrok Client Service Platform",
    imageSrc: ssbrok,
    href: "https://ssbrok.uz/",
    github: "",
    year: 2025,
    description:
      "Web platform for managing and delivering services to clients through an integrated dashboard. The system allows users to access services, manage requests, and track their activities in a centralized interface designed for efficiency and ease of use.",
    tags: [
      "React",
      "Next.js",
      "Ant design",
      "TypeScript",
      "Tailwind CSS",
      "Dashboard",
      "Admin Panel",
      "Client Management",
      "Web Application",
    ],
    link: "https://ssbrok.uz/",
  },
  {
    id: "turon-montessori-landing",
    title: "Turon Montessori Website",
    imageSrc: turonmontessori,
    href: "https://turonmontessori.uz/",
    github: "",
    year: 2025,
    description:
      "Landing website for a Montessori-based kindergarten designed to present educational programs, facilities, and enrollment information for parents. Built with two different landing page versions, featuring a responsive UI, SEO optimization, and a clean design aligned with Montessori principles for clarity and trust.",
    tags: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Landing Page",
      "Responsive Design",
      "SEO Optimization",
      "UI/UX",
    ],
    link: "https://turonmontessori.uz/",
  },
  {
    id: "centrum-air-declaration-dashboard",
    title: "Centrum Air Declaration Management Dashboard",
    imageSrc: centrum,
    href: "https://centrum.edithapis.uz/",
    github: "",
    year: 2025,
    description:
      "Internal web dashboard for managing and approving passenger declarations for Centrum Air. The system provides administrators with tools to review submissions, approve or reject declarations, and monitor records through a structured interface. Built with a scalable architecture, responsive UI, and optimized data fetching using React Query.",
    tags: [
      "React",
      "TypeScript",
      "Material UI",
      "React Query",
      "Dashboard",
      "Admin Panel",
      "Data Management",
      "Responsive Design",
    ],
    link: "https://centrum.edithapis.uz/",
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
