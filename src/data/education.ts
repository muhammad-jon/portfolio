export type EducationItem = {
  id: string;
  degree: string;
  institution: string;
  years: string;
  details: string;
};

export const education: EducationItem[] = [
  {
    id: "tuit-bachelor",
    degree: "Bachelor's in Telecommunications",
    institution: "Tashkent University of Information Technologies (TUIT)",
    years: "2019 - 2023",
    details:
      "Built a web platform for teachers to create posts and quizzes with an admin panel and authentication.",
  },
  {
    id: "pdp-bootcamp",
    degree: "Frontend Development Bootcamp",
    institution: "PDP Academy",
    years: "2021 - 2022",
    details:
      "Focused on practical frontend engineering with React, APIs, UI architecture, and production workflows.",
  },
];
