import { motion } from "motion/react";
import type { Project } from "@/types/project";
import EditProjectModal from "./editProjectModal";
import DeleteProjectDialog from "./deleteProjectDialog";
import { Trash } from "lucide-react";
import Link from "next/link";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className="group bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
    >
      <div>
        {/* Header */}
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 line-clamp-2">
            {project.name}
          </h3>
        </div>

        {/* Description */}
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2">
          {project.prdText?.slice(0, 120)}
        </p>
      </div>

      <div>
        {/* 🚀 Primary Action */}
        <div className="mt-6">
          <Link
            href={`/dashboard/projects/${project.id}/roadmaps`}
            className="block text-center text-sm font-medium px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-500/20 transition-all cursor-pointer"
          >
            View Roadmap
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between">
          <span className="text-xs text-zinc-400">
            {new Date(project.createdAt).toLocaleDateString()}
          </span>

          {/* Secondary Actions */}
          <div className="flex items-center gap-2 opacity-20 group-hover:opacity-100 transition">
            <EditProjectModal project={project} />

            <DeleteProjectDialog projectId={project.id!}>
              <button className="p-2 rounded-md hover:bg-red-50 dark:hover:bg-red-500/10 text-red-500 dark:text-red-400 transition cursor-pointer">
                <Trash size={16} />
              </button>
            </DeleteProjectDialog>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
