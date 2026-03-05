import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { mockProjects } from "../data/mockProjects";

export function Projects() {
  const [query, setQuery] = useState("");
  const status = "All";

  const filteredProjects = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return mockProjects;
    return mockProjects.filter((item) =>
      `${item.title} ${item.description} ${item.stack.join(" ")} ${item.owner}`
        .toLowerCase()
        .includes(normalized),
    );
  }, [query]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="container-main pb-16 md:pb-24"
    >
      <header className="mb-6">
        <h1 className="text-4xl md:text-5xl">Projects</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
          This page is populated with mock project data for preview and structure testing.
        </p>
      </header>

      <div className="panel p-4 md:p-5">
        <div className="mb-2 flex items-center justify-between gap-3">
          <label htmlFor="projects-search" className="block text-sm text-muted">
            Search mock projects
          </label>
          <span className="rounded-full border border-line bg-surface px-2.5 py-1 text-xs text-muted">
            Status: {status}
          </span>
        </div>
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
            placeholder="Try: dashboard, api, marketing..."
            className="focus-ring w-full rounded-xl border border-line bg-surface py-2.5 pl-10 pr-3 text-sm text-text placeholder:text-muted"
          />
        </div>
      </div>

      <section className="mt-6">
        <div className="grid gap-4 md:grid-cols-2">
          {filteredProjects.map((project) => (
            <article key={project.id} className="panel p-5">
              <div className="mb-3 flex items-center justify-between gap-3">
                <h2 className="text-lg">{project.title}</h2>
                <span className="rounded-full border border-line bg-surface px-2.5 py-1 text-xs text-muted">
                  {project.status}
                </span>
              </div>

              <p className="text-sm leading-relaxed text-muted">{project.description}</p>

              <p className="mt-3 text-xs uppercase tracking-[0.12em] text-muted/90">Owner</p>
              <p className="mt-1 text-sm text-text">{project.owner}</p>

              <ul className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-line bg-surface px-2.5 py-1 text-xs text-muted"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {!filteredProjects.length && (
          <div className="panel mt-4 px-5 py-6">
            <p className="text-sm text-muted">No mock projects found for this search.</p>
          </div>
        )}
      </section>
    </motion.section>
  );
}
