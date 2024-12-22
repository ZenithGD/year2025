"use client"

import React, { ReactNode, useState } from 'react'

import puzzles from '@/data/puzzles.json';
import Puzzle from '@/components/puzzle/grid'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import PuzzleContextProvider from '@/context/puzzle/puzzleContextProvider';

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
    <div className='h-full'>
      <h1>Puzzle</h1>
      <PuzzleContextProvider width={puzzles[id].gridSize.x} height={puzzles[id].gridSize.y}>
        <Puzzle 
          imagePath={puzzles[id].image} 
          gridSize={puzzles[id].gridSize}
          puzzleWidth={300}
        />
      </PuzzleContextProvider>
    </div>
  )
}

export default PuzzlePage