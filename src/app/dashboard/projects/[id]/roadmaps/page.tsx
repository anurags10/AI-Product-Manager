"use client";

import { useEffect } from "react";

import { useParams } from "next/navigation";
import { useGenerateRoadmap, useViewRoadmap } from "@/app/hooks/useRoadmap";
import RoadmapContainer from "@/app/ui/roadmapContainer";

export default function RoadmapsPage() {
  const { id } = useParams() as { id: string };

  const { data: roadmaps, isLoading, isError } = useViewRoadmap(id);

  const generateRoadmap = useGenerateRoadmap();

  // 🚀 Auto-generate if empty
  useEffect(() => {
    if (
      !isLoading &&
      roadmaps &&
      roadmaps.length === 0 &&
      !generateRoadmap.isPending
    ) {
      generateRoadmap.mutate(id);
    }
  }, [isLoading, roadmaps, id, generateRoadmap.isPending]);

  if (isLoading) {
    return <div>Loading roadmaps...</div>;
  }

  if (generateRoadmap.isPending) {
    return <div>Generating roadmap... 🚀</div>;
  }

  if (isError) {
    return <div>Failed to load roadmaps</div>;
  }
  // console.log('Roadmaps:', roadmaps);
  console.log(
    "Roadmaps data:",
    roadmaps.map((r: any) => r.roadmapData.month1),
  );
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Roadmaps</h1>

      {roadmaps?.map((roadmap: any, index: number) => (
        <>
          <RoadmapContainer key={roadmap.id} roadmap={roadmap} index={index} />
        </>
      ))}
    </div>
  );
}
