import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ProjectItem } from "../data/projects";

interface ProjectCardProps {
  project: ProjectItem;
  onOpen: (project: ProjectItem) => void;
}

export function ProjectCard({ project, onOpen }: ProjectCardProps) {
  return (
    <article className="group">
      <motion.button
        type="button"
        onClick={() => onOpen(project)}
        aria-label={`Open ${project.title} details`}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        className="focus-ring relative block w-full overflow-hidden rounded-lg border border-line/80 bg-surface/85 p-2 text-left shadow-[0_14px_34px_-24px_hsl(220_35%_12%_/_0.35)] backdrop-blur-sm transition-shadow duration-300 hover:shadow-[0_24px_50px_-26px_hsl(220_35%_12%_/_0.45)] dark:border-white/10 dark:bg-zinc-900/70 dark:shadow-[0_14px_34px_-24px_rgba(15,23,42,0.75)] dark:hover:shadow-[0_24px_50px_-26px_rgba(15,23,42,0.9)]"
      >
        <div className="flex items-center justify-between bg-surface/80 px-0 pb-2 backdrop-blur-md dark:bg-zinc-900/70">
          <div className="flex items-center gap-2 " aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-line transition group-hover:bg-red-400/95 dark:bg-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-line transition group-hover:bg-amber-300/95 dark:bg-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-line transition group-hover:bg-emerald-400/95 dark:bg-white/10" />
          </div>
        </div>

        <div className="relative aspect-[16/10] overflow-hidden  rounded-lg ">
          <img
            src={project.imageSrc}
            alt={`${project.title} thumbnail`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
          />
        </div>
        <div className="absolute bottom-0 left-0 w-full px-10">
          <div className="backdrop-blur-md border-t border-l  border-r border-line/80 rounded-t-lg px-2 py-1 bottom-0 bg-surface/90 dark:border-white/10 dark:bg-zinc-900/70">
            <div className="flex items-center justify-between">
              <h4 className="text-sm">{project.title}</h4>
              <span
                aria-hidden="true"
                className="inline-flex h-5 w-5 rounded-full items-center justify-center border border-line/80 bg-page/70 text-text/80 dark:border-white/15 dark:bg-white/5 dark:text-slate-100/85"
              >
                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 ease-out group-hover:-rotate-45"
                />
              </span>
            </div>
          </div>
        </div>
      </motion.button>
    </article>
  );
}
