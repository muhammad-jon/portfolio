import { motion } from "framer-motion";

const skills = [
  "React",
  "TypeScript",
  "Next.js",
  "Redux",
  "Accessibility",
  "Performance",
  "Design Systems",
];

const highlights = [
  "Builds clean, maintainable UI architecture for long-term product growth.",
  "Prioritizes performance and interaction quality from the first implementation pass.",
  "Collaborates closely with design and product to ship practical improvements quickly.",
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
        <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
          I am a frontend engineer focused on fast, reliable interfaces. My work sits at the
          intersection of product thinking, visual clarity, and robust implementation details.
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
              <li key={item} className="px-5 py-4 text-sm leading-relaxed text-muted md:text-base">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </motion.section>
  );
}
