import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session?.user.id) {
    return new Response("Unauthorized", { status: 401 });
  }
  const deleted = await db
    .delete(projects)
    .where(and(eq(projects.id, id), eq(projects.userId, session.user.id)))
    .returning();
  if (!deleted.length) {
    return new Response("Not Found or Not Allowed", { status: 404 });
  }

  return Response.json({ success: true });
}
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  // console.log('CTX:', params);
  const session = await getServerSession(authOptions);
  const { id } = await params;

  if (!session?.user.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const body = await req.json();

    if (!body?.name || !body?.prdText) {
      return new Response("Invalid body", { status: 400 });
    }

    console.log("Received update request for project ID:", id);

    const { name, prdText } = body;

    const updated = await db
      .update(projects)
      .set({ name, prdText })
      .where(and(eq(projects.id, id), eq(projects.userId, session.user.id)))
      .returning();

    if (!updated.length) {
      return new Response("Not Found or Not Allowed", { status: 404 });
    }

    return Response.json(updated[0]);
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    return new Response("Server Error", { status: 500 });
  }
}
