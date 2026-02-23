import { model } from "@/app/lib/gemini";

export async function generateRoadMap(prd: string) {
  const prompt = `
You are a senior technical product manager.

Based on the PRD below, generate a realistic 3-month roadmap.
Organize into 2-week sprints.
Balance workload for a small team of 2 developers.

Return STRICT JSON in this format:

{
  "month1": [
    {
      "sprint": "Sprint 1",
      "goals": [],
      "tasks": [
  {
    "dev": "Backend",
    "description": "Set up core framework"
  }
],
      "risks": []
    }
  ],
  "month2": [],
  "month3": []
}

PRD:
${prd}
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  const data = text.replace(/```json|```/g, "").trim();
  // console.log(data);
  return JSON.parse(data);
}
