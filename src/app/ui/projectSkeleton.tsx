export default function ProjectSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-200 animate-pulse"
        >
          <div className="h-5 bg-zinc-200 rounded w-2/3 mb-4" />
          <div className="h-4 bg-zinc-200 rounded w-full mb-2" />
          <div className="h-4 bg-zinc-200 rounded w-4/5" />
        </div>
      ))}
    </div>
  );
}
