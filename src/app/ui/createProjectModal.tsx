"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema, ProjectInput } from "../lib/validator/projects";
import { X, Sparkles } from "lucide-react";
import { useCreateProject } from "../hooks/useProjects";
import { motion, AnimatePresence } from "motion/react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function CreateProjectModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const createProject = useCreateProject(onClose);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProjectInput>({
    resolver: zodResolver(projectSchema),
  });

  const onSubmit = (data: ProjectInput) => {
    createProject.mutate(data);
  };

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-zinc-900/40 dark:bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: "spring", duration: 0.5, bounce: 0 }}
          className="relative w-full max-w-lg bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] p-6 sm:p-8 shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Subtle Glow inside modal */}
          <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[80px] -z-10 pointer-events-none" />

          {/* Close Button */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="rounded-full h-8 w-8 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
            >
              <X size={18} />
            </Button>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Start a new project
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
              Define your product name and requirements, and our AI will build
              an execution roadmap.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Project Name
              </label>
              <Input
                {...register("name")}
                placeholder="e.g. Acme Mobile App V2"
                className="h-11 bg-zinc-50 dark:bg-zinc-900/50"
                autoFocus
              />
              {errors.name && (
                <p className="text-red-500 dark:text-red-400 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Product Requirements (PRD)
              </label>
              <Textarea
                {...register("prdText")}
                placeholder="Describe your product goals, targeted users, and core features here..."
                className="min-h-[160px] resize-none bg-zinc-50 dark:bg-zinc-900/50"
              />
              {errors.prdText && (
                <p className="text-red-500 dark:text-red-400 text-xs mt-1">
                  {errors.prdText.message}
                </p>
              )}
            </div>

            <div className="pt-2">
              <Button
                type="submit"
                disabled={isSubmitting || createProject.isPending}
                className="w-full h-11 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20 cursor-pointer font-medium flex items-center gap-2"
              >
                {isSubmitting || createProject.isPending ? (
                  "Creating Project..."
                ) : (
                  <>
                    <Sparkles size={16} />
                    Create & Generate Roadmap
                  </>
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
