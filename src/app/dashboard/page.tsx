"use client";
import { motion } from "motion/react";
import {
  LayoutDashboard,
  Users,
  Activity,
  FileText,
  Map as MapIcon,
} from "lucide-react";
import { useProject } from "../hooks/useProjects";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function DashboardOverviewPage() {
  const { data: projects, isLoading } = useProject();
  const [roadmapCount, setRoadmapCount] = useState(0);

  const activeProjectsCount = projects?.length || 0;
  const docsCount =
    projects?.filter((p: any) => p.prdText && p.prdText.trim() !== "").length ||
    0;

  // Tally roadmaps across all projects
  useEffect(() => {
    if (!projects || projects.length === 0) return;

    let isMounted = true;
    const fetchRoadmaps = async () => {
      try {
        const promises = projects.map((p: any) =>
          fetch(`/api/projects/${p.id}/roadmaps`).then((res) => res.json()),
        );
        const results = await Promise.all(promises);

        if (isMounted) {
          // Assuming the API returns an array or an object with a roadmaps array for each
          let total = 0;
          results.forEach((res: any) => {
            if (Array.isArray(res)) total += res.length;
            else if (res && res.roadmaps && Array.isArray(res.roadmaps))
              total += res.roadmaps.length;
            else if (res && typeof res === "object") total += 1; // Fallback if it returns a single object
          });
          setRoadmapCount(total);
        }
      } catch (error) {
        console.error("Failed to fetch roadmaps tally", error);
      }
    };

    fetchRoadmaps();
    return () => {
      isMounted = false;
    };
  }, [projects]);

  const recentProjects = projects
    ? [...projects]
        .sort(
          (a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        .slice(0, 3)
    : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Overview</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Welcome back to your workspace. Here's a snapshot of your activity.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: "Active Projects",
            value: isLoading ? "-" : activeProjectsCount,
            icon: LayoutDashboard,
          },
          {
            label: "Documents",
            value: isLoading ? "-" : docsCount,
            icon: FileText,
          },
          {
            label: "Roadmaps",
            value: isLoading ? "-" : roadmapCount,
            icon: MapIcon,
          },
          { label: "Team Space", value: "Personal", icon: Users },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center shrink-0">
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold mt-1 text-zinc-900 dark:text-white">
                  {stat.value}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Projects */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4 tracking-tight">
          Recent Projects
        </h3>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-32 bg-zinc-200 dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-800"
              />
            ))}
          </div>
        ) : recentProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentProjects.map((project: any, i: number) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                <Link href={`/dashboard/projects`} className="block group">
                  <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm hover:shadow-md hover:border-indigo-500/30 transition-all flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                        <LayoutDashboard size={20} />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                          {project.name}
                        </h4>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                          Created{" "}
                          {project.createdAt
                            ? new Date(project.createdAt).toLocaleDateString()
                            : "recently"}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-dashed border-zinc-300 dark:border-zinc-800 rounded-2xl p-12 flex flex-col items-center justify-center text-center bg-zinc-50/50 dark:bg-zinc-900/50"
          >
            <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center mb-6 text-zinc-400">
              <Activity size={32} />
            </div>
            <h3 className="text-lg font-semibold mb-2">No active projects</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm mb-6">
              Start by creating your first product workspace on the Projects
              page!
            </p>
            <Link
              href="/dashboard/projects"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
            >
              Go to Projects
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
