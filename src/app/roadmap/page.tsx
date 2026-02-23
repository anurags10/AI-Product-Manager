"use client";

import { useQuery } from "@tanstack/react-query";
import { Roadmap } from "@/types/roadmap";

export default function RoadmapPage() {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ["roadmap"],
    queryFn: async () => {
      const res = await fetch("/api/roadmap");
      if (!res.ok) throw new Error("Failed to fetch roadmap");
      return res.json();
    },
    enabled: false,
  });

  const roadmap: Roadmap | null = data?.roadmap ?? null;
  console.log(roadmap);

  return (
    <div className="min-h-screen bg-gray-50 p-10 text-black">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold">Execution Roadmap</h1>

          <button
            type="button"
            onClick={() => refetch()}
            className="px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            {isFetching ? "Generating..." : "Generate Roadmap"}
          </button>
        </div>

        {!roadmap && (
          <p className="text-gray-500">
            Click generate to create your 3-month execution plan.
          </p>
        )}

        {roadmap &&
          Object.entries(roadmap).map(([month, sprints]) => (
            <div key={month} className="mb-14">
              <h2 className="text-2xl font-semibold mb-6 capitalize">
                {month}
              </h2>

              {(sprints as any[]).map((sprint, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-sm border p-8 mb-8"
                >
                  <h3 className="text-xl font-semibold mb-6">
                    {sprint.sprint}
                  </h3>

                  <div className="grid md:grid-cols-3 gap-8">
                    {/* Goals */}
                    <div>
                      <h4 className="font-medium mb-3">Goals</h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        {sprint.goals.map((goal: string, i: number) => (
                          <li key={i}>• {goal}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Tasks */}
                    <div>
                      <h4 className="font-medium mb-3">Tasks</h4>
                      <div className="space-y-3 text-sm text-gray-700">
                        {sprint.tasks.map((task: any, i: number) => (
                          <div
                            key={i}
                            className="p-3 bg-gray-50 rounded-lg border"
                          >
                            <p className="text-xs font-semibold text-gray-500 mb-1">
                              {task.dev}
                            </p>
                            <p>{task.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Risks */}
                    <div>
                      <h4 className="font-medium mb-3 text-red-500">Risks</h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        {sprint.risks.map((risk: string, i: number) => (
                          <li key={i}>• {risk}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
}
