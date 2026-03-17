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
