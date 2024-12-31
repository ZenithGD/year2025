import { db } from "@/src/db";
import { eq, sql } from "drizzle-orm";
import { puzzle, ranking } from "@/src/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: number }> }
) {
  try {
    const { id } = await context.params;

    const rows = await db.select().from(ranking).where(eq(ranking.id, id));

    console.log("rows", rows);

    return NextResponse.json({ ranking: rows });
  } catch (error) {
    console.error("Error fetching ranking rows:", error);
    return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: number }> }
) {
  try {
    const { id } = await context.params;

    // Parse the request body
    const body = await req.json();
    const { uname, solveTS } = body;

    if (typeof solveTS !== "number") {
      return new Response("Invalid score provided.", { status: 400 });
    }

    await db
      .insert(ranking)
      .values({ id, uname, solveTS })
      .onConflictDoUpdate({
        target: [ranking.id, ranking.uname],
        set: { solveTS: sql`MIN(EXCLUDED.solveTS, ranking.solveTS)` },
      });

    return new Response("Score added successfully.", { status: 201 });
  } catch (error) {
    console.error("Error adding score:", error);
    return new Response("Error processing request.", { status: 500 });
  }
}
