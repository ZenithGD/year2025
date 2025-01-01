import { db } from "@/src/db"
import { eq } from 'drizzle-orm';
import { puzzle } from "@/src/db/tables"
import { NextRequest, NextResponse } from "next/server"


export async function GET(req: NextRequest, context: { params: Promise<{ id: number }> }) {
  const { id } = await context.params; // Await the params

  const rows = await db.select().from(puzzle).where(eq(puzzle.id, id));

  if (rows.length === 0) {
    const error = `No puzzle exists with id ${id}`;
    return NextResponse.json({ error }, { status: 404 });
  }

  return NextResponse.json({ row: rows[0] });
}