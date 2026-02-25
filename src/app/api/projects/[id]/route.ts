import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);
  if (!session?.user.id) {
    return new Response("Unauthorized", { status: 401 });
  }
  const deleted = await db
    .delete(projects)
    .where(
      and(eq(projects.id, params.id), eq(projects.userId, session.user.id)),
    )
    .returning();
  if (!deleted.length) {
    return new Response("Not Found or Not Allowed", { status: 404 });
  }

  return Response.json({ success: true });
}
export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);
  if (!session?.user.id) {
    return new Response("Unauthorized", { status: 401 });
  }
  const { name, prdText } = await req.json();
  const updated = await db
    .update(projects)
    .set({ name, prdText })
    .where(
      and(eq(projects.id, params.id), eq(projects.userId, session.user.id)),
    )
    .returning();

  if (!updated.length) {
    return new Response("Not Found or Not Allowed", { status: 404 });
  }

  return Response.json(updated[0]);
}
