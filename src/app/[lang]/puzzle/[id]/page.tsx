"use client"

import React, { ReactNode, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

import puzzles from '@/data/puzzles.json';
import PuzzleGame from '@/src/app/[lang]/components/ui/puzzleGame';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import PuzzleContextProvider from '@/src/app/[lang]/context/puzzle/puzzleContextProvider';
import Link from 'next/link';
import { db } from '@/src/db';
import { PuzzleRowType } from '@/src/db/schema';
import { MAX_MOBILE_WIDTH, MAX_TABLET_WIDTH, puzzleWidth } from '@/src/utils/misc';
import { generateShuffleState } from '@/src/utils/puzzleUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { useDictionary } from '../../context/i18n/dictionaryProvider';

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

  const dictionary = useDictionary()

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
        <p>{error?.message}</p>
      )
    }
  if (isPending)
    {
      return (
        <p>{dictionary.fetchingPInfo}</p>
      )
  }
  
  // shuffle state is getting called every render (4 times on strict mode)...
  const randomState = generateShuffleState(data.size)

  return (
    <div className='flex flex-col self-center h-full w-full'>
      <div>
        <Link href="/puzzle" className='flex items-center gap-2 mb-4 text-pretty word-break'>
          <FontAwesomeIcon icon={faArrowLeft} />
          <p>{dictionary.backToPuzzle}</p>
        </Link>
      </div>
      <div className='flex justify-center items-center gap-4 self-stretch'>
        <h1 className='text-center lg:text-4xl text-2xl font-christmas'>{data.title}</h1>
        <Link href={`/puzzle/${id}/ranking`}>
          <div className='flex justify-center items-center bg-yellow-500 text-yellow-900 gap-2 p-2 rounded-full filter drop-shadow-md'>
            <FontAwesomeIcon icon={faTrophy} />
            <p>Ranking</p>
          </div>
        </Link>
      </div>
      <div className='flex flex-col pt-4'>
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