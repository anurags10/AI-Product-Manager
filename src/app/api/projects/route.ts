import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { projectSchema } from "@/app/lib/validator/projects";
import { z } from "zod";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await req.json();
  const parsed = projectSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { errors: z.treeifyError(parsed.error) },
      { status: 400 },
    );
  }

  const { name, prdText } = parsed.data;
  const newProject = await db
    .insert(projects)
    .values({
      userId: session.user.id,
      name,
      prdText,
    })
    .returning();
  return Response.json(newProject[0]);
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user.id) {
    return new Response("Unauthorized", { status: 401 });
  }
  const userProjects = await db.query.projects.findMany({
    where: (projects, { eq }) => eq(projects.userId, session.user.id),
  });

  return Response.json(userProjects);
}
