import { db } from "@/src/db"
import { eq, lt, gte, ne } from 'drizzle-orm';
import { puzzle } from "@/src/db/schema"
import { NextResponse } from "next/server"
import { NextApiRequest } from "next";

export interface PuzzleGetRequest {
  id: number
}

export async function GET(req: NextApiRequest, { params }: { params: { id: number } }) {

  const { id } = await params

  const rows = await db.select().from(puzzle).where(eq(puzzle.id, id))

  if (rows.length === 0)
  {
    const error = `No puzzle exists with id ${id}`;
    return NextResponse.json({ error }, { status: 404 });
  }

  return NextResponse.json({ row: rows[0] })
}