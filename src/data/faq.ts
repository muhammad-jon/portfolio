export type FaqTabId = "services" | "pricing" | "personal";

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type FaqTab = {
  id: FaqTabId;
  label: string;
  items: FaqItem[];
};

export const faqTabs: FaqTab[] = [
  {
    id: "services",
    label: "Services",
    items: [
      {
        id: "service-1",
        question: "What kind of frontend projects do you take?",
        answer:
          "I focus on React and TypeScript interfaces: product dashboards, marketing sites, design system work, and performance-focused refactors.",
      },
      {
        id: "service-2",
        question: "Can you work inside an existing codebase?",
        answer:
          "Yes. I usually start with a short audit, align on constraints, and then ship incremental updates without disrupting your release cycle.",
      },
      {
        id: "service-3",
        question: "Do you support accessibility standards?",
        answer:
          "Yes. Semantic structure, keyboard navigation, focus visibility, and clear interaction states are treated as baseline requirements.",
      },
    ],
  },
  {
    id: "pricing",
    label: "Pricing",
    items: [
      {
        id: "pricing-1",
        question: "Do you work hourly or fixed-scope?",
        answer:
          "Both. Short optimization tasks are often hourly; product features and redesign tracks are usually fixed-scope with clear milestones.",
      },
      {
        id: "pricing-2",
        question: "What is the typical engagement length?",
        answer:
          "Most projects run between 2 and 8 weeks depending on complexity, review cycles, and existing technical debt.",
      },
      {
        id: "pricing-3",
        question: "Is maintenance available after delivery?",
        answer:
          "Yes, I offer follow-up support for bug fixes, iterative enhancements, and performance monitoring after launch.",
      },
    ],
  },
  {
    id: "personal",
    label: "Personal",
    items: [
      {
        id: "personal-1",
        question: "What do you optimize first in a UI?",
        answer:
          "I start with rendering cost, interaction latency, and readability. If users can navigate quickly, the product usually performs better overall.",
      },
      {
        id: "personal-2",
        question: "How do you collaborate with designers?",
        answer:
          "I prefer tight handoff loops: shared component language, quick review cycles, and early validation of edge cases before development scales.",
      },
      {
        id: "personal-3",
        question: "What are you looking for next?",
        answer:
          "I'm open to Frontend roles and project partnerships where product quality and engineering standards are taken seriously.",
      },
    ],
  },
];
