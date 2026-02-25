import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/db";
import { generateRoadMap } from "@/app/server/services/roadmap.services";
import { roadmaps } from "@/db/schema";
import { projects } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function POST(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);
  if (!session?.user.id) {
    return new Response("Unauthorized", { status: 401 });
  }
  const project = await db.query.projects.findFirst({
    where: and(
      eq(projects.id, params.id),
      eq(projects.userId, session.user.id),
    ),
  });
  if (!project) {
    return new Response("Not found or not allowed", { status: 404 });
  }
  const roadmapsData = await db.query.roadmaps.findMany({
    where: eq(roadmaps.projectId, params.id),
  });

  if (roadmapsData.length >= 2) {
    return new Response("Maximum 2 roadmaps allowed per project", {
      status: 403,
    });
  }

  const roadmapData = await generateRoadMap(project?.prdText as string);
  const inserted = await db
    .insert(roadmaps)
    .values({
      projectId: params.id,
      roadmapData,
    })
    .returning();

  return Response.json(inserted[0]);
}

export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);
  if (!session?.user.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const project = await db.query.projects.findFirst({
    where: and(
      eq(projects.id, params.id),
      eq(projects.userId, session.user.id),
    ),
  });

  if (!project) {
    return new Response("Not found or not allowed", { status: 404 });
  }

  const roadmapsData = await db.query.roadmaps.findMany({
    where: eq(roadmaps.projectId, params.id),
  });
  if (!roadmapsData.length) {
    return new Response("Not found or not allowed", { status: 404 });
  }

  return Response.json(roadmapsData);
}
