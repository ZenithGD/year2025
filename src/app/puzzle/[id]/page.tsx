"use client"

import React, { ReactNode, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

import puzzles from '@/data/puzzles.json';
import PuzzleGame from '@/components/ui/puzzleGame';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import PuzzleContextProvider from '@/context/puzzle/puzzleContextProvider';
import Link from 'next/link';
import { db } from '@/src/db';
import { PuzzleRowType } from '@/src/db/schema';
import { MAX_MOBILE_WIDTH, MAX_TABLET_WIDTH, puzzleWidth } from '@/src/utils/misc';
import { generateShuffleState } from '@/src/utils/puzzleUtils';

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
  const params = useParams<{ id: string }>()
  const id = parseInt(params["id"])

  const isMobile = useMediaQuery({ query: `(max-width: ${MAX_MOBILE_WIDTH}px)` })
  const isTablet = useMediaQuery({ query: `(max-width: ${MAX_TABLET_WIDTH}px)` })

  const fetchPuzzleInfo = async () => {
    return await fetch(`/api/puzzle/${id}`)
      .then(r => r.json())
      .then(r => r.row) as PuzzleRowType
  }

  const { isPending, isError, data, error } = useQuery({ queryKey: ['pinfo'], queryFn: fetchPuzzleInfo })
  if (isError)
    {
      return (
        <p>Error: {error?.message}</p>
      )
    }
  if (isPending)
    {
      return (
        <p>Fetching puzzle info...</p>
      )
  }
  
  const randomState = generateShuffleState(data.size)
  console.log("random: ", randomState)

  return (
    <div className='flex flex-col self-center h-full w-full'>
      <div>
        <Link href="/puzzle">Home</Link>
      </div>
      <h1>Puzzle</h1>
      <div className='flex flex-col py-6'>
        <PuzzleContextProvider width={data.size} height={data.size} currentState={randomState}>
          <PuzzleGame 
            puzzleInfo={data}
            puzzleWidth={puzzleWidth(isMobile, isTablet)}
            cellGap={4}
          />
        </PuzzleContextProvider>
      </div>
    </div>
  )
}

export default PuzzlePage