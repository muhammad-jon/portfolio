import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Github, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ProjectCard } from "../components/ProjectCard";
import { projects, type ProjectItem } from "../data/projects";

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null,
  );
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const handleOpenProject = useCallback((project: ProjectItem) => {
    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    setSelectedProject(project);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  useEffect(() => {
    if (!selectedProject) return;

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleCloseModal();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 0);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus();
    };
  }, [handleCloseModal, selectedProject]);

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        className="container-main pb-16 md:pb-24"
      >
        <header className="mb-7">
          <h1 className="text-4xl md:text-5xl">Projects</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
            Selected frontend work with a premium minimal interface style.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpen={handleOpenProject}
            />
          ))}
        </div>
      </motion.section>

      <AnimatePresence>
        {selectedProject ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/60 px-4 py-7 backdrop-blur-[2px]"
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                handleCloseModal();
              }
            }}
          >
            <motion.article
              role="dialog"
              aria-modal="true"
              aria-labelledby={`project-modal-title-${selectedProject.id}`}
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              className="relative max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_24px_64px_-24px_rgba(15,23,42,0.6)] dark:border-white/10 dark:bg-zinc-900"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                ref={closeButtonRef}
                type="button"
                onClick={handleCloseModal}
                aria-label="Close project details"
                className="focus-ring absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-line/80 bg-surface/80 text-muted backdrop-blur-md transition hover:text-text dark:border-white/15 dark:bg-zinc-900/85"
              >
                <X size={16} />
              </button>

              <div className="max-h-[90vh] overflow-y-auto">
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-page/30">
                  <img
                    src={selectedProject.imageSrc}
                    alt={`${selectedProject.title} preview`}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="space-y-5 p-6 md:p-8">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2
                        id={`project-modal-title-${selectedProject.id}`}
                        className="text-2xl md:text-3xl"
                      >
                        {selectedProject.title}
                      </h2>
                      {selectedProject.year ? (
                        <span className="rounded-full border border-line/80 bg-page/60 px-3 py-1 text-xs font-medium uppercase tracking-wide text-muted dark:border-white/15 dark:bg-white/5">
                          {selectedProject.year}
                        </span>
                      ) : null}
                    </div>
                    <p className="text-sm leading-relaxed text-muted md:text-base">
                      {selectedProject.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={`${selectedProject.id}-${tag}`}
                        className="rounded-full border border-line/80 bg-page/60 px-3 py-1 text-xs text-muted dark:border-white/15 dark:bg-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={selectedProject.link || selectedProject.href}
                      target="_blank"
                      rel="noreferrer"
                      className="focus-ring inline-flex items-center gap-2 rounded-full bg-text px-4 py-2 text-sm font-medium text-page transition hover:opacity-90"
                    >
                      Live Preview
                      <ExternalLink size={15} />
                    </a>
                    {selectedProject.github ? (
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noreferrer"
                        className="focus-ring inline-flex items-center gap-2 rounded-full border border-line/80 bg-surface px-4 py-2 text-sm font-medium text-text transition hover:bg-page/40 dark:border-white/15 dark:bg-white/5"
                      >
                        Source Code
                        <Github size={15} />
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            </motion.article>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
