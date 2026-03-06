import { motion } from "framer-motion";
import { ArrowRight, CalendarCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { RadioDiscPlayer } from "./RadioDiscPlayer";
import { SocialLinks } from "./SocialLinks";

const chips = [
  "React",
  "TypeScript",
  "Next.js",
  "React Query",
  "Socket.IO",
  "Tailwind CSS",
];

export function Hero() {
  return (
    <section className="container-main pb-16 pt-8 md:pb-20 md:pt-12">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="grid items-center gap-10 md:grid-cols-[220px_1fr]"
      >
        <div className="flex justify-center md:justify-start">
          <RadioDiscPlayer />
        </div>

        <div>
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-muted">
            Muhammad O'rolov
          </p>
          <h1 className="max-w-3xl text-4xl leading-tight md:text-6xl">
            Frontend Developer with 3+ years building scalable React products.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            I build AI-driven platforms, real-time communication systems, and
            role-based enterprise solutions with a strong focus on performance
            and maintainable code.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/contact"
              className="focus-ring inline-flex items-center gap-2 rounded-full bg-text px-5 py-3 text-sm font-medium text-page transition hover:opacity-90"
            >
              Let's work together
              <ArrowRight size={16} />
            </Link>
            <a
              href="https://cal.com/muhammad-jon"
              target="_blank"
              rel="noreferrer"
              className="focus-ring inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-3 text-sm font-medium text-text transition hover:border-accent/60"
            >
              Schedule a meeting
              <CalendarCheck size={16} />
            </a>
          </div>

          <ul className="mt-7 flex flex-wrap gap-2" aria-label="Primary stack">
            {chips.map((chip) => (
              <li
                key={chip}
                className="rounded-full border border-line bg-surface px-3 py-1 text-xs text-muted"
              >
                {chip}
              </li>
            ))}
          </ul>

          <SocialLinks className="mt-7" />
        </div>
      </motion.div>
    </section>
  );
}
