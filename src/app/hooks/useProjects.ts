"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "../lib/api/projects";

export function useProject() {
  return useQuery({
    queryKey: ["project"],
    queryFn: fetchProjects,
  });
}
