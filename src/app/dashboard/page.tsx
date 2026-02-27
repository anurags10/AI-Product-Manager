"use client";

import { motion } from "motion/react";
import { Plus } from "lucide-react";
import EmptyState from "../ui/emptyState";
import ProjectGrid from "../ui/projectGrid";

export default function DashboardPage() {
  const projects: any[] = []; // temporary placeholder

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">Your Projects</h2>

        <button className="inline-flex items-center gap-2 bg-zinc-900 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-zinc-800 transition-all duration-200">
          <Plus size={16} />
          New Project
        </button>
      </div>

      {/* Grid */}
      {projects.length === 0 ? (
        <EmptyState />
      ) : (
        <ProjectGrid projects={projects} />
      )}
    </div>
  );
}
