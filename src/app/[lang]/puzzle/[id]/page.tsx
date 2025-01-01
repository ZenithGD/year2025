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
import { PuzzleRowType } from '@/src/db/tables';
import { getTitleWithLocale, MAX_MOBILE_WIDTH, MAX_TABLET_WIDTH, puzzleWidth } from '@/src/utils/misc';
import { generateShuffleState } from '@/src/utils/puzzleUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { useDictionary } from '../../context/i18n/dictionaryProvider';
import LoadingScreen from '../../components/ui/loadingScreen';

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
  let id = params["id"]

  const { dictionary, locale } = useDictionary()

  const isMobile = useMediaQuery({ query: `(max-width: ${MAX_MOBILE_WIDTH}px)` })
  const isTablet = useMediaQuery({ query: `(max-width: ${MAX_TABLET_WIDTH}px)` })

  const fetchPuzzleInfo = async () => {
    try {
      const value = await fetch(`/api/puzzle/${id}`)
        .then(r => r.json())
        .then(r => r.row as PuzzleRowType)
      
      return value
    }
    catch {
      throw new Error("Invalid puzzle")
    }

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
        <LoadingScreen message={dictionary.fetchingPInfo} />
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
        <h1 className='text-center lg:text-4xl text-2xl font-christmas'>{getTitleWithLocale(data, locale)}</h1>
        <Link href={`/puzzle/${id}/ranking`}>
          <div className='flex justify-center items-center bg-yellow-500 text-yellow-900 gap-2 p-2 rounded-full filter drop-shadow-md'>
            <FontAwesomeIcon icon={faTrophy} />
            <p>{dictionary.goToRanking}</p>
          </div>
        </Link>
      </div>
      <p className='lg:w-1/2 w-full text-pretty text-justify'>{data.description}</p>
      <div className='flex flex-col pt-4 gap-4'>
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