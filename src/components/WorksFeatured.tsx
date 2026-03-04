import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import type { WorkItem } from "../data/works";

interface WorksFeaturedProps {
  works: WorkItem[];
}

export function WorksFeatured({ works }: WorksFeaturedProps) {
  const featured = works.slice(0, 3);

  return (
    <section className="container-main pb-12 md:pb-16">
      <div className="mb-7 flex items-end justify-between gap-4">
        <h2 className="text-3xl md:text-4xl">Works</h2>
        <a
          href="#works-list"
          className="focus-ring inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-muted transition hover:text-text"
        >
          See more
          <ChevronDown size={16} />
        </a>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {featured.map((work, index) => (
          <motion.article
            key={work.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.35, delay: index * 0.08 }}
            className="panel flex flex-col p-5"
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <h3 className="text-xl">{work.title}</h3>
              <span className="text-sm text-muted">{work.year}</span>
            </div>

            <p className="text-sm leading-relaxed text-muted">{work.description}</p>

            <ul className="mt-4 flex flex-wrap gap-2">
              {work.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-line bg-surface px-2.5 py-1 text-xs text-muted"
                >
                  {tag}
                </li>
              ))}
            </ul>

            <a
              href={work.link}
              target="_blank"
              rel="noreferrer"
              className="focus-ring mt-6 inline-flex items-center gap-2 self-start rounded-full border border-line px-4 py-2 text-sm text-text transition hover:border-accent/60"
            >
              View
              <ArrowRight size={15} />
            </a>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
