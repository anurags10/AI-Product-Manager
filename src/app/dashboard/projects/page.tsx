"use client";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Plus } from "lucide-react";
import EmptyState from "../../ui/emptyState";
import ProjectGrid from "../../ui/projectGrid";
import ProjectSkeleton from "../../ui/projectSkeleton";
import { useProject } from "../../hooks/useProjects";
import CreateProjectModal from "../../ui/createProjectModal";

export default function ProjectsPage() {
  const [open, setOpen] = useState<boolean>(false);
  const { data: projects, isLoading, isError } = useProject();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">Your Projects</h2>

        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-all duration-200 cursor-pointer shadow-sm"
        >
          <Plus size={16} />
          New Project
        </button>
      </div>

      <div>{open && <CreateProjectModal onClose={() => setOpen(false)} />}</div>

      {/* Loading */}
      {isLoading && (
        <AnimatePresence>
          {!open && (
            <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ProjectSkeleton />
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Error */}
      {isError && (
        <div className="text-red-500 text-sm">Failed to load projects.</div>
      )}

      {/* Grid */}
      {projects?.length === 0 ? (
        <EmptyState />
      ) : (
        <ProjectGrid projects={projects} />
      )}
    </div>
  );
}
