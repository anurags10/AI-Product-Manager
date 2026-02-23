import { NextResponse } from "next/server";
import { samplePRD } from "@/app/lib/sample-prd";
import { generateRoadMap } from "@/app/server/services/roadmap.services";

export async function GET() {
  const roadmap = await generateRoadMap(samplePRD);
  return NextResponse.json({ roadmap });
}
