import { db } from "@/db";
import { users } from "@/db/schema";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const body = await req.json();

  const hashedPassword = await bcrypt.hash(body.password, 10);

  await db.insert(users).values({
    email: body.email,
    passwordHash: hashedPassword,
  });

  return Response.json({ success: true });
}
