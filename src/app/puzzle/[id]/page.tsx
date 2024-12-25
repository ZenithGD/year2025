"use client"

import React, { ReactNode, useState } from 'react'

import puzzles from '@/data/puzzles.json';
import PuzzleGame from '@/components/ui/puzzleGame';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import PuzzleContextProvider from '@/context/puzzle/puzzleContextProvider';
import Link from 'next/link';
import { db } from '@/src/db';
import { PuzzleRowType } from '@/src/db/schema';

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
  

  return (
    <div className='h-full w-full'>
      <div>
        <Link href="/puzzle">Home</Link>
      </div>
      <h1>Puzzle</h1>
      <PuzzleContextProvider width={data.size} height={data.size}>
        <PuzzleGame 
          puzzleInfo={data}
          puzzleWidth={300}
          cellGap={4}
        />
      </PuzzleContextProvider>
    </div>
  )
}

export default PuzzlePage