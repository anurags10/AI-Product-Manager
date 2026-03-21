"use client";

import { useEffect } from "react";

import { useParams } from "next/navigation";
import { useGenerateRoadmap, useViewRoadmap } from "@/app/hooks/useRoadmap";
import RoadmapContainer from "@/app/ui/roadmapContainer";
import RoadmapGenerating from "@/app/ui/roadmapGenerating";
import { Plus } from "lucide-react";

export default function RoadmapsPage() {
  const { id } = useParams() as { id: string };

  const { data: roadmaps, isLoading, isError } = useViewRoadmap(id);
  const generateRoadmap = useGenerateRoadmap();

  const totalRoadmap = roadmaps?.length ?? 0;

  useEffect(() => {
    if (!isLoading && totalRoadmap === 0) {
      generateRoadmap.mutate(id);
    }
  }, [isLoading, totalRoadmap, id]);

  if (isLoading)
    return (
      <div className="p-6 space-y-6 animate-pulse">
        <div className="flex items-center justify-between mb-8">
          <div className="h-8 w-48 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
          <div className="h-10 w-40 bg-zinc-200 dark:bg-zinc-800 rounded-lg hidden sm:block" />
        </div>
        <div className="h-[400px] w-full bg-zinc-100 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800" />
      </div>
    );
  if (isError)
    return <div className="p-6 text-red-500">Failed to load roadmaps</div>;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Roadmaps</h1>

        {totalRoadmap < 2 && !generateRoadmap.isPending && (
          <button
            onClick={() => generateRoadmap.mutate(id)}
            disabled={generateRoadmap.isPending || totalRoadmap >= 2}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium transition-colors shadow-sm shadow-indigo-500/20 disabled:opacity-50 flex items-center gap-2 cursor-pointer"
          >
            <Plus size={16} />
            {totalRoadmap === 0 ? "Generate Roadmap" : "Generate Alternative"}
          </button>
        )}
      </div>

      {/* Generating State */}
      {generateRoadmap.isPending && <RoadmapGenerating />}

      {/* Roadmaps */}
      {roadmaps?.map((roadmap: any, index: number) => (
        <RoadmapContainer
          key={roadmap.id}
          roadmap={roadmap}
          index={index}
          total={totalRoadmap}
        />
      ))}
    </div>
  );
}
