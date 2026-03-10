import { motion } from "motion/react";
import type { Project } from "@/types/project";
import EditProjectModal from "./editProjectModal";
import DeleteProjectDialog from "./deleteProjectDialog";
import { Trash } from "lucide-react";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className="group bg-white rounded-2xl p-6 border border-zinc-200 shadow-sm hover:shadow-md transition-all"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold text-zinc-900 line-clamp-2">
          {project.name}
        </h3>
      </div>

      <p className="mt-2 text-sm text-zinc-500 line-clamp-2">
        {project.prdText?.slice(0, 120)}
      </p>

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between">
        <span className="text-xs text-zinc-400">
          {new Date(project.createdAt).toLocaleDateString()}
        </span>

        {/* Actions */}
        <div className="flex items-center gap-2 opacity-20 group-hover:opacity-100 transition">
          <EditProjectModal project={project} />

          <DeleteProjectDialog projectId={project.id!}>
            <button className="p-2 rounded-md hover:bg-red-50 text-red-500 transition cursor-pointer">
              <Trash size={16} />
            </button>
          </DeleteProjectDialog>
        </div>
      </div>
    </motion.div>
  );
}
