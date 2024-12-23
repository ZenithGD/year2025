"use client"

import React, { ReactNode, useState } from 'react'

import puzzles from '@/data/puzzles.json';
import PuzzleGame from '@/components/ui/puzzleGame';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import PuzzleContextProvider from '@/context/puzzle/puzzleContextProvider';
import Link from 'next/link';

type Props = {
}

function PuzzlePage(props: Props)
{
  let queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <PuzzlePageComponent {...props} />
    </QueryClientProvider>
  )
}

function PuzzlePageComponent({ }: Props) {
  const [puzzle, setPuzzle] = useState(null);
  const params = useParams<{ id: string }>()
  const id = parseInt(params["id"])

  return (
    <div className='h-full w-full'>
      <div>
        <Link href="/puzzle">Home</Link>
      </div>
      <h1>Puzzle</h1>
      <PuzzleContextProvider width={puzzles[id].gridSize.x} height={puzzles[id].gridSize.y}>
        <PuzzleGame 
          imagePath={puzzles[id].image} 
          puzzleWidth={300}
          cellGap={4}
        />
      </PuzzleContextProvider>
    </div>
  )
}

export default PuzzlePage