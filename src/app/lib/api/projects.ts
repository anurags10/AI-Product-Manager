import type { Project } from "@/types/project";

export async function fetchProjects(): Promise<Project[]> {
  const res = await fetch("/api/projects", { method: "GET" });
  if (!res.ok) {
    throw new Error("Failed to fetch projects");
  }

  return res.json();
}
