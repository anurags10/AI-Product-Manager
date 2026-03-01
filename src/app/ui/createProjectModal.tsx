"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectSchema, ProjectInput } from "../lib/validator/projects";
import { toast } from "sonner";

export default function CreateProjectModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProjectInput>({
    resolver: zodResolver(projectSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: ProjectInput) => {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error("Failed to create project");
      }

      return res.json();
    },
    onMutate: async (newProject) => {
      await queryClient.cancelQueries({ queryKey: ["project"] });
      const previousProjects = queryClient.getQueryData(["project"]);
      const optimisticProject = {
        id: `temp-${Date.now()}`,
        userId: "temp",
        name: newProject.name,
        prdText: newProject.prdText,
        createdAt: new Date().toISOString(),
      };
      queryClient.setQueryData(["project"], (old: any[] = []) => [
        optimisticProject,
        ...old,
      ]);

      return { previousProjects };
    },
    onSuccess: (createdProject) => {
      queryClient.setQueryData(["project"], (old: any[] = []) => [
        old.map((project) =>
          project.id.startsWith("temp-") ? createdProject : project,
        ),
      ]);
      toast.success("Project created successfully");

      onClose();
    },
    onError: (_err, _variables, context) => {
      if (context?.previousProjects) {
        queryClient.setQueryData(["project"], context.previousProjects);
      }
      toast.error("Something went wrong");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["project"] });
    },
  });

  const onSubmit = (data: ProjectInput) => {
    mutation.mutate(data);
  };
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center text-black">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
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
