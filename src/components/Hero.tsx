import { motion } from "framer-motion";
import { ArrowRight, CalendarCheck } from "lucide-react";
import { Link } from "react-router-dom";
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
          <div className="relative flex size-40 items-center justify-center rounded-full border border-line bg-gradient-to-br from-accent/30 via-surface to-slate-200 shadow-soft dark:to-slate-700">
            <svg
              width="82"
              height="82"
              viewBox="0 0 82 82"
              fill="none"
              aria-hidden="true"
              className="opacity-70"
            >
              <circle
                cx="41"
                cy="41"
                r="33"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M24 49C30 35 52 35 58 49"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <circle cx="33" cy="34" r="2" fill="currentColor" />
              <circle cx="49" cy="34" r="2" fill="currentColor" />
            </svg>
            <span className="absolute text-lg font-medium tracking-wide">
              WC
            </span>
          </div>
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
              href="https://cal.com/placeholder"
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
