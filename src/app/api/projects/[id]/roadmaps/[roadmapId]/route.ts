import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/db";
import { roadmaps } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { projects } from "@/db/schema";

export async function GET(
  _req: Request,
  { params }: { params: { id: string; roadmapId: string } },
) {
  const session = await getServerSession(authOptions);
  if (!session?.user.id) {
    return new Response("Unauthorized", { status: 401 });
  }
  const roadmapData = await db.query.roadmaps.findFirst({
    where: and(
      eq(roadmaps.id, params.roadmapId),
      eq(roadmaps.projectId, params.id),
    ),
    with: { project: true },
  });
  if (!roadmapData || roadmapData.project?.userId !== session.user.id) {
    return new Response("Not found or not allowed", { status: 404 });
  }

  return Response.json(roadmapData);
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string; roadmapId: string } },
) {
  const session = await getServerSession(authOptions);
  if (!session?.user.id) {
    return new Response("Unauthorized", { status: 401 });
  }
  const roadmapData = await db.query.roadmaps.findFirst({
    where: and(
      eq(roadmaps.id, params.roadmapId),
      eq(roadmaps.projectId, params.id),
    ),
    with: { project: true },
  });
  if (!roadmapData || roadmapData.project?.userId !== session.user.id) {
    return new Response("Not found or not allowed", { status: 404 });
  }
  const deleted = await db
    .delete(roadmaps)
    .where(
      and(eq(roadmaps.id, params.roadmapId), eq(roadmaps.projectId, params.id)),
    )
    .returning();

  return new Response(null, { status: 204 });
}
