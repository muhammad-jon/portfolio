import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ProjectCard } from "../components/ProjectCard";
import { projects, type ProjectItem } from "../data/projects";

const projectSections: Array<{
  category: ProjectItem["category"];
  title: string;
  description: string;
}> = [
  {
    category: "personal",
    title: "Personal Projects",
    description:
      "Independent products I planned, designed, and shipped on my own.",
  },
  {
    category: "professional",
    title: "Professional Projects",
    description:
      "Products and client platforms I contributed to during professional work.",
  },
];

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null,
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const handleOpenProject = useCallback((project: ProjectItem) => {
    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    setSelectedImageIndex(0);
    setSelectedProject(project);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedImageIndex(0);
    setSelectedProject(null);
  }, []);

  const handlePreviousImage = useCallback(() => {
    setSelectedImageIndex((currentIndex) => {
      if (!selectedProject) return currentIndex;
      return currentIndex === 0
        ? selectedProject.imageSrc.length - 1
        : currentIndex - 1;
    });
  }, [selectedProject]);

  const handleNextImage = useCallback(() => {
    setSelectedImageIndex((currentIndex) => {
      if (!selectedProject) return currentIndex;
      return currentIndex === selectedProject.imageSrc.length - 1
        ? 0
        : currentIndex + 1;
    });
  }, [selectedProject]);

  useEffect(() => {
    if (!selectedProject) return;

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleCloseModal();
        return;
      }

      if (selectedProject.imageSrc.length > 1 && event.key === "ArrowLeft") {
        handlePreviousImage();
      }

      if (selectedProject.imageSrc.length > 1 && event.key === "ArrowRight") {
        handleNextImage();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    const focusTimer = window.setTimeout(
      () => closeButtonRef.current?.focus(),
      0,
    );

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus();
    };
  }, [handleCloseModal, handleNextImage, handlePreviousImage, selectedProject]);

  const selectedImage =
    selectedProject?.imageSrc[selectedImageIndex] ??
    selectedProject?.imageSrc[0];
  const hasCarousel = (selectedProject?.imageSrc.length ?? 0) > 1;

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
            A split view of independent builds and projects shaped through
            client and product work.
          </p>
        </header>

        <div className="space-y-10">
          {projectSections.map((section) => {
            const sectionProjects = projects.filter(
              (project) => project.category === section.category,
            );

            if (!sectionProjects.length) return null;

            return (
              <section key={section.category} className="space-y-5">
                <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <div>
                    <h2 className="text-2xl md:text-3xl">{section.title}</h2>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
                      {section.description}
                    </p>
                  </div>
                  <span className="w-fit rounded-full border border-line/80 bg-surface px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-muted dark:border-white/10 dark:bg-zinc-900/70">
                    {sectionProjects.length} projects
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {sectionProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onOpen={handleOpenProject}
                    />
                  ))}
                </div>
              </section>
            );
          })}
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
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.img
                      key={`${selectedProject.id}-${selectedImageIndex}`}
                      src={selectedImage}
                      alt={`${selectedProject.title} preview ${selectedImageIndex + 1}`}
                      className="h-full w-full object-cover"
                      initial={{ opacity: 0.35, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0.35, scale: 0.985 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                    />
                  </AnimatePresence>

                  {hasCarousel ? (
                    <>
                      <div className="pointer-events-none absolute inset-x-0 top-4 flex items-center justify-between px-4">
                        <span className="rounded-full bg-slate-950/65 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                          {selectedImageIndex + 1} /{" "}
                          {selectedProject.imageSrc.length}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={handlePreviousImage}
                        aria-label="Previous project image"
                        className="focus-ring absolute left-4 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-slate-950/65 text-white backdrop-blur-md transition hover:bg-slate-950/80"
                      >
                        <ChevronLeft size={18} />
                      </button>

                      <button
                        type="button"
                        onClick={handleNextImage}
                        aria-label="Next project image"
                        className="focus-ring absolute right-4 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-slate-950/65 text-white backdrop-blur-md transition hover:bg-slate-950/80"
                      >
                        <ChevronRight size={18} />
                      </button>

                      <div className="absolute inset-x-0 bottom-4 flex justify-center px-4">
                        <div className="flex items-center gap-2 rounded-full bg-slate-950/60 px-3 py-2 backdrop-blur-md">
                          {selectedProject.imageSrc.map((_, imageIndex) => (
                            <button
                              key={`${selectedProject.id}-image-${imageIndex}`}
                              type="button"
                              onClick={() => setSelectedImageIndex(imageIndex)}
                              aria-label={`Show project image ${imageIndex + 1}`}
                              aria-current={selectedImageIndex === imageIndex}
                              className={`h-2.5 rounded-full transition ${
                                selectedImageIndex === imageIndex
                                  ? "w-8 bg-white"
                                  : "w-2.5 bg-white/45 hover:bg-white/70"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </>
                  ) : null}
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
