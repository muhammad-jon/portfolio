import { motion } from "framer-motion";
import { ProjectCard } from "../components/ProjectCard";
import { projects } from "../data/projects";

export function Projects() {
  return (
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
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </motion.section>
  );
}
