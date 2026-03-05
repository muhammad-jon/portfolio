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
    id: "smart-base",
    company: "Smart-Base",
    role: "Frontend Developer",
    years: "May 2025 - Present",
    summary:
      "Leading frontend development of an AI-driven platform for automated data collection and facial recognition analytics, including real-time dashboards and communication systems.",
    tags: ["React", "TypeScript", "React Query", "ApexCharts", "WebRTC"],
  },
  {
    id: "ssbrok",
    company: "SSBrok.uz",
    role: "Frontend Developer (Contract)",
    years: "Dec 2024 - Present",
    summary:
      "Built a customs automation platform that reduced processing time from days to hours, with role-based navigation and optimized API interactions for real-time updates.",
    tags: ["React", "TypeScript", "REST APIs", "Role-based Access"],
  },
  {
    id: "k-group",
    company: "K-Group Dream Team",
    role: "Freelance / Independent Projects",
    years: "Feb 2024 - Dec 2024",
    summary:
      "Developed SAP and CRM integration solutions, built an eCommerce platform with improved load performance, and delivered Web3 and quiz platforms.",
    tags: ["Next.js", "Sass", "Firebase", "Tailwind CSS", "CRM"],
  },
  {
    id: "tenx",
    company: "TenX Group",
    role: "Frontend Developer",
    years: "Nov 2022 - Dec 2023",
    summary:
      "Built a quote generation tool reducing input time by 20% and improved UI systems, increasing engagement by 25% through frontend architecture improvements.",
    tags: ["React", "TypeScript", "UX", "Performance"],
  },
  {
    id: "pdp",
    company: "PDP Academy",
    role: "Frontend Developer, Assistant",
    years: "Mar 2022 - Apr 2023",
    summary:
      "Developed an expense tracking app with secure authentication and image-based records using React and Firebase, focusing on clean code and cross-browser compatibility.",
    tags: ["React", "Firebase", "API Integration", "Optimization"],
  },
];
