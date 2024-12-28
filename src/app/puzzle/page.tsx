import PuzzleCard from '@/src/components/ui/puzzleCard';
import { db } from '@/src/db';
import { puzzle, PuzzleRowType } from '@/src/db/schema';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react'

type Props = {
}

async function PuzzleSelectionPage({ }: Props) {
  
  const puzzles: PuzzleRowType[] = await db.select().from(puzzle)

  console.log(puzzles)
 
  return (
    <div>
      <h1>All puzzles</h1>
      <div className='grid xl:grid-cold-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 place-items-center gap-8'>
        {puzzles.map(
          (p, key) =>
            <PuzzleCard key={key} puzzleData={p} />
          )
        }
      </div>
    </div>
  )
}

export default PuzzleSelectionPage