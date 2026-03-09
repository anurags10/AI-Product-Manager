"use client";

import type { Project } from "@/types/project";
import { projectSchema, ProjectInput } from "../lib/validator/projects";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateProject } from "../hooks/useProjects";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function EditProjectModal({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const updateProject = useUpdateProject();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProjectInput>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: project.name,
      prdText: project.prdText,
    },
  });

  useEffect(() => {
    reset({
      name: project.name,
      prdText: project.prdText,
    });
  }, [project, reset]);

  console.log(project.id, "project id in edit modal"); // Debug log

  const onSubmit = async (data: ProjectInput) => {
    await updateProject.mutateAsync({
      id: project.id!,
      ...data,
    });
    setOpen(false);
    reset(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input placeholder="Project name" {...register("name")} />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Textarea
              placeholder="Product requirements..."
              className="min-h-[200px] max-h-[400px] overflow-y-auto"
              {...register("prdText")}
            />
            {errors.prdText && (
              <p className="text-sm text-red-500 mt-1">
                {errors.prdText.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={updateProject.isPending}
          >
            {updateProject.isPending ? "Updating..." : "Update Project"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
