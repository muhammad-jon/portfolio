import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Search } from "lucide-react";
import type { WorkItem } from "../data/works";
import { cn } from "../utils/cn";

interface WorksListProps {
  works: WorkItem[];
}

export function WorksList({ works }: WorksListProps) {
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState<string | null>(works[0]?.id ?? null);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return works;
    return works.filter((work) =>
      `${work.title} ${work.tags.join(" ")}`.toLowerCase().includes(normalized),
    );
  }, [query, works]);

  useEffect(() => {
    if (!filtered.length) {
      setActiveId(null);
      return;
    }
    if (!activeId || !filtered.some((work) => work.id === activeId)) {
      setActiveId(filtered[0].id);
    }
  }, [filtered, activeId]);

  const activeWork = filtered.find((work) => work.id === activeId) ?? null;

  return (
    <section id="works-list" className="container-main scroll-mt-24 pb-16 md:pb-24">
      <div className="panel p-5 md:p-6">
        <label htmlFor="work-search" className="mb-2 block text-sm text-muted">
          Search projects by title or tag
        </label>
        <div className="relative">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            id="work-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try: React, Next.js, Performance..."
            className="focus-ring w-full rounded-xl border border-line bg-surface py-2.5 pl-10 pr-3 text-sm text-text placeholder:text-muted"
          />
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {filtered.map((work) => {
          const isActive = work.id === activeId;

          return (
            <motion.article
              key={work.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "panel p-5 transition-shadow hover:shadow-soft",
                isActive && "border-accent/70",
              )}
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg">{work.title}</h3>
                  <p className="text-sm text-muted">{work.year}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveId(work.id)}
                  className="focus-ring rounded-full border border-line px-3 py-1 text-xs text-muted transition hover:text-text"
                >
                  Details
                </button>
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
                className="focus-ring mt-4 inline-flex items-center gap-1 text-sm text-text"
              >
                View
                <ArrowUpRight size={15} />
              </a>
            </motion.article>
          );
        })}
      </div>

      <div className="panel mt-6 p-6" aria-live="polite">
        <AnimatePresence mode="wait">
          {activeWork ? (
            <motion.div
              key={activeWork.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-2xl">{activeWork.title}</h3>
                  <p className="text-sm text-muted">{activeWork.year}</p>
                </div>
                <a
                  href={activeWork.link}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-text transition hover:border-accent/60"
                >
                  Open project
                  <ArrowUpRight size={16} />
                </a>
              </div>
              <p className="mt-4 max-w-3xl leading-relaxed text-muted">{activeWork.details}</p>
            </motion.div>
          ) : (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-sm text-muted"
            >
              No projects match your search.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
