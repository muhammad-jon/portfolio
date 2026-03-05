import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { FAQ } from "../components/FAQ";
import { Hero } from "../components/Hero";
import { experience } from "../data/experience";

export function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="pb-16 md:pb-24"
    >
      <Hero />

      <section className="container-main pb-16 md:pb-24">
        <div className="mb-7 flex items-end justify-between gap-4">
          <h2 className="text-3xl md:text-4xl">Work</h2>
          <Link
            to="/work"
            className="focus-ring inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-muted transition hover:text-text"
          >
            See more
            <ArrowRight size={15} />
          </Link>
        </div>

        <div className="panel overflow-hidden">
          <ul className="divide-y divide-line/80">
            {experience.map((item) => (
              <li
                key={item.id}
                className="grid gap-2 px-5 py-4 sm:grid-cols-[1.2fr_1fr_auto] sm:gap-4"
              >
                <p className="text-base">{item.company}</p>
                <p className="text-sm text-muted sm:text-base">{item.role}</p>
                <p className="text-sm text-muted sm:text-right">{item.years}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FAQ />
    </motion.div>
  );
}
