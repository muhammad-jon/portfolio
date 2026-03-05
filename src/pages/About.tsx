import { motion } from "framer-motion";

const skills = [
  "React",
  "TypeScript",
  "Next.js",
  "Redux",
  "Tailwind CSS",
  "MUI",
  "Chakra UI",
  "Sass",
  "Bootstrap",
  "React Query",
  "REST APIs",
  "Firebase",
  "Node.js",
  "Socket.IO",
  "MongoDB",
  "Git",
  "GitHub",
  "Swagger",
  "Postman",
  "ApexCharts",
];

const highlights = [
  "3+ years of hands-on frontend engineering experience with React and TypeScript.",
  "Built AI-based products, real-time communication features, and role-based enterprise systems.",
  "Focused on performance optimization, clean architecture, and long-term maintainability.",
];

export function About() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="container-main pb-16 md:pb-24"
    >
      <header className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl">About</h1>
        <img
          src="https://avatars.githubusercontent.com/u/75540900?v=4"
          alt="Muhammad O'rolov profile photo"
          className="mt-5 h-32 w-32 rounded-full border-2 border-line bg-surface object-cover shadow-soft md:h-48 md:w-48"
          loading="eager"
          referrerPolicy="no-referrer"
        />
        <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
          I am a frontend developer based in Tashkent, Uzbekistan. I enjoy
          building fast and reliable interfaces, solving performance
          bottlenecks, and improving UX through clean and maintainable code.
        </p>
      </header>

      <section className="mt-8">
        <h2 className="text-2xl md:text-3xl">Skills</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <li
              key={skill}
              className="rounded-full border border-line bg-surface px-3 py-1 text-xs text-muted"
            >
              {skill}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl md:text-3xl">Highlights</h2>
        <div className="panel mt-4">
          <ul className="divide-y divide-line/80">
            {highlights.map((item) => (
              <li
                key={item}
                className="px-5 py-4 text-sm leading-relaxed text-muted md:text-base"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </motion.section>
  );
}
