import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/db";
import { generateRoadMap } from "@/app/server/services/roadmap.services";
import { roadmaps } from "@/db/schema";
import { projects } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session?.user.id) {
    return new Response("Unauthorized", { status: 401 });
  }
  const project = await db.query.projects.findFirst({
    where: and(eq(projects.id, id), eq(projects.userId, session.user.id)),
  });
  if (!project) {
    return new Response("Not found or not allowed", { status: 404 });
  }
  const roadmapsData = await db.query.roadmaps.findMany({
    where: eq(roadmaps.projectId, id),
  });

  if (roadmapsData.length >= 2) {
    return new Response("Maximum 2 roadmaps allowed per project", {
      status: 403,
    });
  }

  try {
    const roadmapData = await generateRoadMap(project.prdText);

    const inserted = await db
      .insert(roadmaps)
      .values({
        projectId: id,
        roadmapData,
      })
      .returning();

    return Response.json(inserted[0]);
  } catch (error) {
    return new Response("Roadmap generation failed", { status: 500 });
  }
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const session = await getServerSession(authOptions);
  if (!session?.user.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const project = await db.query.projects.findFirst({
    where: and(eq(projects.id, id), eq(projects.userId, session.user.id)),
  });

  if (!project) {
    return new Response("Project not found", { status: 404 });
  }

  const roadmapsData = await db.query.roadmaps.findMany({
    where: eq(roadmaps.projectId, id),
    orderBy: (roadmaps, { desc }) => [desc(roadmaps.createdAt)],
  });

  // ✅ Always return array
  return Response.json(roadmapsData);
}
