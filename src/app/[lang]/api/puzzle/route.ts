import { db } from "@/src/db"
import { eq } from 'drizzle-orm';
import { puzzle } from "@/src/db/tables"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest, context: { params: Promise<{ id: number }> }) {
  
  const puzzles = await db.select().from(puzzle);

  return NextResponse.json({ puzzles });
}