import { motion } from "motion/react";

export default function ProjectCard({ project }: { project: any }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-200 hover:shadow-md transition-all cursor-pointer"
    >
      <h3 className="text-lg font-semibold mb-2">{project.name}</h3>

      <div className="mt-4 text-xs text-zinc-400">
        Created at: {project.createdAt}
      </div>
    </motion.div>
  );
}
