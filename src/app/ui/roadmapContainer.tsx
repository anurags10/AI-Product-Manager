"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import MonthSection from "./monthSelection";
import { Trash } from "lucide-react";
import { useDeleteRoadmap } from "../hooks/useRoadmap";
import { useParams } from "next/navigation";

type Roadmap = {
  id: string;
  roadmapData: any;
  createdAt: string;
};

export default function RoadmapContainer({
  roadmap,
  index,
  total,
}: {
  roadmap: Roadmap;
  index: number;
  total: number;
}) {
  const { id } = useParams() as { id: string };

  const deleteRoadmap = useDeleteRoadmap(id);
  const data = roadmap.roadmapData;

  const isDeleteDisabled = total === 1;

  const handleDelete = async () => {
    try {
      await deleteRoadmap.mutateAsync(roadmap.id);
    } catch (error) {
      console.error("Error deleting roadmap:", error);
    }
  };

  return (
    <div className="mb-12 border border-zinc-200 rounded-2xl p-6 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold flex items-center gap-2">
            Roadmap {index + 1}
            {index === 0 && (
              <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
                Latest
              </span>
            )}
          </h2>

          <p className="text-xs text-zinc-400 mt-1">
            {new Date(roadmap.createdAt).toLocaleString()}
          </p>
        </div>

        {/* Delete Button */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-0"
              disabled={isDeleteDisabled}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                the roadmap.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="cursor-pointer">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="cursor-pointer"
                disabled={deleteRoadmap.isPending}
                onClick={handleDelete}
              >
                {deleteRoadmap.isPending ? "Deleting..." : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* Months */}
      <MonthSection title="Month 1" data={data.month1} />
      <MonthSection title="Month 2" data={data.month2} />
      <MonthSection title="Month 3" data={data.month3} />
    </div>
  );
}
