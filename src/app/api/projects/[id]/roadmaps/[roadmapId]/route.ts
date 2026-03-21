import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/db";
import { roadmaps } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { projects } from "@/db/schema";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string; roadmapId: string }> },
) {
  const { id, roadmapId } = await params;
  const session = await getServerSession(authOptions);
  if (!session?.user.id) {
    return new Response("Unauthorized", { status: 401 });
  }
  const roadmapData = await db.query.roadmaps.findFirst({
    where: and(eq(roadmaps.id, roadmapId), eq(roadmaps.projectId, id)),
    with: { project: true },
  });
  if (!roadmapData || roadmapData.project?.userId !== session.user.id) {
    return new Response("Not found or not allowed", { status: 404 });
  }

  return Response.json(roadmapData);
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string; roadmapId: string }> },
) {
  const { id, roadmapId } = await params;
  const session = await getServerSession(authOptions);
  if (!session?.user.id) {
    return new Response("Unauthorized", { status: 401 });
  }
  const roadmapData = await db.query.roadmaps.findFirst({
    where: and(eq(roadmaps.id, roadmapId), eq(roadmaps.projectId, id)),
    with: {
      project: true,
    },
  });

  if (!roadmapData || roadmapData.project?.userId !== session.user.id) {
    return new Response("Not found or not allowed", { status: 404 });
  }
  const deleted = await db
    .delete(roadmaps)
    .where(and(eq(roadmaps.id, roadmapId), eq(roadmaps.projectId, id)))
    .returning();

  return Response.json({ success: true });
}
