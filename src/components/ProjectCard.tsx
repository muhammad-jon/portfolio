import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ProjectItem } from "../data/projects";

interface ProjectCardProps {
  project: ProjectItem;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group">
      <motion.a
        href={project.href}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open ${project.title} demo`}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        className="p-2 focus-ring block overflow-hidden rounded-lg border border-white/10 bg-zinc-900/70 shadow-[0_14px_34px_-24px_rgba(15,23,42,0.75)] backdrop-blur-sm transition-shadow duration-300 hover:shadow-[0_24px_50px_-26px_rgba(15,23,42,0.9)]"
      >
        <div className="flex items-center justify-between bg-zinc-900/70 px-0 pb-2 backdrop-blur-md">
          <div className="flex items-center gap-2 " aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-white/10 transition group-hover:bg-red-400/95" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/10 transition group-hover:bg-amber-300/95" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/10 transition group-hover:bg-emerald-400/95" />
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
          <div className="backdrop-blur-md border-t border-l  border-r border-white/10 rounded-t-lg px-2 py-1 bottom-0 bg-zinc-900/70">
            <div className="flex justify-between itmes-center">
              <h4 className="text-base">{project.title}</h4>
              <span
                aria-hidden="true"
                className="inline-flex h-5 w-5 rounded-full items-center justify-center border border-white/15 bg-white/5 text-slate-100/85"
              >
                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 ease-out group-hover:-rotate-45"
                />
              </span>
            </div>
          </div>
        </div>
      </motion.a>
    </article>
  );
}
