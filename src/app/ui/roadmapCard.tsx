import { motion } from "motion/react";

type Task = {
  dev: string;
  description: string;
};

type Sprint = {
  sprint: string;
  goals: string[];
  risks: string[];
  tasks: Task[];
};

export default function RoadmapCard({
  key,
  sprint,
}: {
  key: number;
  sprint: Sprint;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
    >
      {/* Sprint Badge */}
      <div className="mb-4">
        <span className="text-xs font-medium px-3 py-1 rounded-full bg-zinc-100 text-zinc-600">
          {sprint.sprint}
        </span>
      </div>

      {/* Goals */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-zinc-800 mb-2">🎯 Goals</h4>
        <ul className="space-y-1 text-sm text-zinc-600">
          {sprint.goals.map((goal, i) => (
            <li key={i}>• {goal}</li>
          ))}
        </ul>
      </div>

      {/* Tasks */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-zinc-800 mb-2">🛠 Tasks</h4>
        <div className="space-y-2">
          {sprint.tasks.map((task, i) => (
            <div
              key={i}
              className="p-2 rounded-lg border border-zinc-100 bg-zinc-50 text-sm"
            >
              <span className="font-medium text-zinc-700">[{task.dev}]</span>{" "}
              <span className="text-zinc-600">{task.description}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Risks */}
      <div>
        <h4 className="text-sm font-semibold text-red-500 mb-2">⚠ Risks</h4>
        <ul className="space-y-1 text-sm text-zinc-600">
          {sprint.risks.map((risk, i) => (
            <li key={i}>• {risk}</li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
