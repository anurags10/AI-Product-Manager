"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectSchema, ProjectInput } from "../lib/validator/projects";
import { toast } from "sonner";
import { X } from "lucide-react";
import { useCreateProject } from "../hooks/useProjects";

export default function CreateProjectModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const queryClient = useQueryClient();
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

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center text-black"
      onClick={onClose} // ✅ close when clicking backdrop
    >
      <div
        className="relative bg-white rounded-2xl p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()} // ✅ prevent closing when clicking inside
      >
        {/* ✅ Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black transition"
        >
          <X size={20} />
        </button>

        <h3 className="text-lg font-semibold mb-4">Create Project</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              {...register("name")}
              placeholder="Project Name"
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <textarea
              {...register("prdText")}
              placeholder="Describe your product..."
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
            {errors.prdText && (
              <p className="text-red-500 text-xs mt-1">
                {errors.prdText.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-zinc-900 text-white py-2 rounded-lg text-sm font-medium"
          >
            {isSubmitting ? "Creating..." : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
}
