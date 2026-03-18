"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Generate roadmap
export function useGenerateRoadmap() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (projectId: string) => {
      const res = await fetch(`/api/projects/${projectId}/roadmaps`, {
        method: "POST",
      });

      if (!res.ok) {
        throw new Error("Failed to generate roadmap");
      }

      return res.json();
    },

    onSuccess: (_data, projectId) => {
      toast.success("Roadmap generated successfully");
      queryClient.invalidateQueries({ queryKey: ["roadmap", projectId] });
    },

    onError: () => {
      toast.error("Failed to generate roadmap");
    },
  });
}

// get roadmap

export function useViewRoadmap(projectId: string) {
  return useQuery({
    queryKey: ["roadmaps", projectId],

    queryFn: async () => {
      const res = await fetch(`/api/projects/${projectId}/roadmaps`);

      if (!res.ok) {
        throw new Error("Failed to fetch roadmap");
      }

      return res.json();
    },

    enabled: !!projectId, // prevents running with undefined
  });
}

// generate single roadmap item
export function useRoadmap(projectId: string, roadmapId: string) {
  return useQuery({
    queryKey: ["roadmap", projectId, roadmapId],
    queryFn: async () => {
      const res = await fetch(
        `/api/projects/${projectId}/roadmaps/${roadmapId}`,
      );

      if (!res.ok) throw new Error("Failed to fetch roadmap");

      return res.json();
    },
    enabled: !!projectId && !!roadmapId,
  });
}

// delete roadmap

export function useDeleteRoadmap(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (roadmapId: string) => {
      const res = await fetch(
        `/api/projects/${projectId}/roadmaps/${roadmapId}`,
        { method: "DELETE" },
      );

      if (!res.ok) throw new Error("Failed to delete roadmap");
    },

    onSuccess: () => {
      toast.success("Roadmap deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["roadmaps", projectId],
      });
    },
  });
}
