import MonthSection from "./monthSelection";

type Roadmap = {
  id: string;
  roadmapData: any;
  createdAt: string;
};

export default function RoadmapContainer({
  roadmap,
  index,
}: {
  roadmap: Roadmap;
  index: number;
}) {
  const data = roadmap.roadmapData;

  return (
    <div className="mb-12 border border-zinc-200 rounded-2xl p-6 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Roadmap {index + 1}</h2>

        <span className="text-xs text-zinc-400">
          {new Date(roadmap.createdAt).toLocaleString()}
        </span>
      </div>

      {/* Months */}
      <MonthSection title="Month 1" data={data.month1} />
      <MonthSection title="Month 2" data={data.month2} />
      <MonthSection title="Month 3" data={data.month3} />
    </div>
  );
}
