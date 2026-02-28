import { Plus } from "lucide-react";
export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="h-16 w-16 rounded-2xl bg-zinc-200 mb-6 grid place-items-center">
        <Plus size={32} />
      </div>

      <h3 className="text-lg font-semibold">No projects yet</h3>
      <p className="text-sm text-zinc-500 mt-2 max-w-sm">
        Create your first AI-powered product roadmap to get started.
      </p>
    </div>
  );
}
