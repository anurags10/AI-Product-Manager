"use client";

import { useEffect } from "react";

import { useParams } from "next/navigation";
import { useGenerateRoadmap, useViewRoadmap } from "@/app/hooks/useRoadmap";
import RoadmapContainer from "@/app/ui/roadmapContainer";

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

  if (isLoading) return <div>Loading roadmaps...</div>;
  if (isError) return <div>Failed to load roadmaps</div>;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Roadmaps</h1>

        {totalRoadmap < 2 && (
          <button
            onClick={() => generateRoadmap.mutate(id)}
            disabled={generateRoadmap.isPending || totalRoadmap >= 2}
            className="px-4 py-2 bg-black text-white rounded-lg text-sm cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {generateRoadmap.isPending
              ? "Generating..."
              : totalRoadmap === 0
                ? "Generate Roadmap"
                : "Generate Another"}
          </button>
        )}
      </div>

      {/* Generating State */}
      {generateRoadmap.isPending && (
        <div className="text-sm text-zinc-500">Generating roadmap... 🚀</div>
      )}

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
