import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Search } from "lucide-react";
import { experience } from "../data/experience";
import { projects } from "../data/projects";

export function Work() {
  const [query, setQuery] = useState("");

  const normalized = query.trim().toLowerCase();

  const filteredExperience = useMemo(() => {
    if (!normalized) return experience;
    return experience.filter((item) =>
      `${item.company} ${item.role} ${item.years} ${item.tags.join(" ")}`
        .toLowerCase()
        .includes(normalized),
    );
  }, [normalized]);

  const filteredProjects = useMemo(() => {
    if (!normalized) return projects;
    return projects.filter((item) =>
      `${item.title} ${item.description} ${item.tags.join(" ")}`
        .toLowerCase()
        .includes(normalized),
    );
  }, [normalized]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="container-main pb-16 md:pb-24"
    >
      <header className="mb-6">
        <h1 className="text-4xl md:text-5xl">Works</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
          Selected product and interface work across startups, SaaS tools, and internal platforms.
        </p>
      </header>

      <div className="panel p-4 md:p-5">
        <label htmlFor="projects-search" className="mb-2 block text-sm text-muted">
          Search by company, role, project, or tag
        </label>
        <div className="relative">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            id="projects-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try: React, dashboard, architecture..."
            className="focus-ring w-full rounded-xl border border-line bg-surface py-2.5 pl-10 pr-3 text-sm text-text placeholder:text-muted"
          />
        </div>
      </div>

      <section className="mt-6">
        <h2 className="text-2xl md:text-3xl">Experience</h2>
        <div className="panel mt-4 overflow-hidden">
          {filteredExperience.length ? (
            <ul className="divide-y divide-line/80">
              {filteredExperience.map((item) => (
                <li key={item.id} className="px-5 py-4">
                  <div className="grid gap-2 sm:grid-cols-[1.2fr_1fr_auto] sm:gap-4">
                    <p className="text-base">{item.company}</p>
                    <p className="text-sm text-muted sm:text-base">{item.role}</p>
                    <p className="text-sm text-muted sm:text-right">{item.years}</p>
                  </div>
                  <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">{item.summary}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-5 py-6 text-sm text-muted">No matching items found.</p>
          )}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl md:text-3xl">Highlighted Projects</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {filteredProjects.slice(0, 3).map((project) => (
            <article key={project.id} className="panel p-5">
              <div className="mb-3 flex items-start justify-between gap-2">
                <h3 className="text-lg">{project.title}</h3>
                <p className="text-sm text-muted">{project.year}</p>
              </div>
              <p className="text-sm leading-relaxed text-muted">{project.description}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-line bg-surface px-2.5 py-1 text-xs text-muted"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="focus-ring mt-4 inline-flex items-center gap-1 text-sm text-text"
              >
                View
                <ArrowUpRight size={15} />
              </a>
            </article>
          ))}
        </div>
      </section>
    </motion.section>
  );
}
