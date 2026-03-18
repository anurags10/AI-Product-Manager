import RoadmapCard from "@/app/ui/roadmapCard";

export default function MonthSection({
  title,
  data,
}: {
  title: string;
  data: any[];
}) {
  // console.log('MonthSection data:', data);
  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {data.map((sprint, i) => (
          <RoadmapCard key={i} sprint={sprint} />
        ))}
      </div>
    </div>
  );
}
