"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "../lib/api/projects";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectSchema, ProjectInput } from "../lib/validator/projects";
import { toast } from "sonner";

/* =========================
   GET PROJECTS
========================= */
export function useProject() {
  return useQuery({
    queryKey: ["project"],
    queryFn: fetchProjects,
  });
}

/* =========================
   CREATE PROJECT
========================= */

export function useCreateProject(onClose: () => void) {
  const queryClient = useQueryClient();
  return useMutation({
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

    // ✅ Optimistic Update
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

    // ✅ Replace fake project with real one
    onSuccess: (createdProject) => {
      queryClient.setQueryData(["project"], (old: any[] = []) =>
        old.map((project) =>
          project.id.startsWith("temp-") ? createdProject : project,
        ),
      );

      toast.success("Project created successfully");
      onClose();
    },

    // ✅ Rollback on error
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
}

/* =========================
   DELETE PROJECT
========================= */

export function useDeleteProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");
      return id;
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["project"] });
      const previous = queryClient.getQueryData(["project"]);
      queryClient.setQueryData(["project"], (old: any[] = []) =>
        old.filter((p) => p.id !== id),
      );

      return { previous };
    },
    onError: (_err, _id, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["project"], context.previous);
      }
      toast.error("Failed to delete project");
    },

    onSuccess: () => {
      toast.success("Project deleted");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["project"] });
    },
  });
}

/* =========================
   UPDATE PROJECT
========================= */

export function useUpdateProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      name,
      prdText,
    }: {
      id: string;
      name: string;
      prdText: string;
    }) => {
      const res = await fetch(`/api/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, prdText }),
      });

      if (!res.ok) throw new Error("Failed to update");

      return res.json();
    },

    onMutate: async (updatedProject) => {
      await queryClient.cancelQueries({ queryKey: ["project"] });

      const previous = queryClient.getQueryData(["project"]);

      queryClient.setQueryData(["project"], (old: any[] = []) =>
        old.map((project) =>
          project.id === updatedProject.id
            ? { ...project, ...updatedProject }
            : project,
        ),
      );

      return { previous };
    },

    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["project"], context.previous);
      }
      toast.error("Failed to update project");
    },

    onSuccess: () => {
      toast.success("Project updated");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["project"] });
    },
  });
}
