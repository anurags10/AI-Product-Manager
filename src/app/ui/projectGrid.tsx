import { motion } from "motion/react";
import ProjectCard from "./projectCard";
import type { Project } from "@/types/project";
export default function ProjectGrid({
  projects = [],
}: {
  projects?: Project[];
}) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.08,
          },
        },
      }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </motion.div>
  );
}
