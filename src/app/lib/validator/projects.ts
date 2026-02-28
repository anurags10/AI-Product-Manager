import { z } from "zod";

export const projectSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  prdText: z.string().min(10, "PRD must be at least 10 characters"),
});

export type ProjectInput = z.infer<typeof projectSchema>;
