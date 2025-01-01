import puzzles from '@/data/puzzles.json';
import { readFile } from 'fs/promises';
import { puzzle, PuzzleRowType } from './tables';
import { db } from '.';
/**
 * Processes JSON data to an array of objects to insert with drizzle
 * @param data Array of raw puzzle objects
 * @returns Processed puzzle objects
 */
async function processJSONData(data: Array<any>): Promise<PuzzleRowType[]> {
  return Promise.all(
    data.map(async (p, id) => {

      return {
        id,
        es_title: p.es_title,
        en_title: p.en_title,
        fr_title: p.fr_title,
        description: p.description,
        difficulty: p.difficulty,
        size: p.gridSize,
        image: p.image,
      };
    })
  );
}

async function main() {
  try {
    const rows = await processJSONData(puzzles);
    console.log(rows);

    await db
      .insert(puzzle)
      .values(rows)
      .onConflictDoNothing()
      .then((r) => console.log('Inserted', r.rowsAffected, 'rows'))
      .catch((e) => console.log('Error inserting rows:', e.message));
  } catch (e: any) {
    console.error('Error in main:', e.message);
  }
}

await main()