"use client"
import PuzzleCard from '@/src/app/[lang]/components/ui/puzzleCard';
import { PuzzleRowType } from '@/src/db/tables';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import React from 'react'

import { getPuzzleData, PuzzleSaveData, savePuzzleData } from '@/src/services/storageService';
import { useDictionary } from '../context/i18n/dictionaryProvider';
import LoadingScreen from '../components/ui/loadingScreen';

type Props = {
}

type PuzzleInfoSave = PuzzleRowType & { saveData: PuzzleSaveData };

function PuzzleSelectionPage(props: Props)
{
  let queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <PuzzleSelectionPageComponent {...props} />
    </QueryClientProvider>
  )
}

function PuzzleSelectionPageComponent({ }: Props) {

  const { dictionary, locale } = useDictionary()

  const fetchPuzzlesInfo = async () => {
    return await fetch(`/api/puzzle`)
      .then(r => r.json())
      .then(r => r.puzzles as PuzzleRowType[])
      .then(puzzles => puzzles.map(p => { return { ...p, saveData: getPuzzleData(p.id) } }))
  }

  const { isPending, isError, data: puzzles, error } = useQuery({ queryKey: ['allp'], queryFn: fetchPuzzlesInfo })
  if (isError)
    {
      return (
        <p>Error: {error?.message}</p>
      )
    }
  if (isPending)
    {
      return (
        <LoadingScreen message={dictionary.fetchingPInfo} />
      )
  }
 
  return (
    <div>
      <h1 className='text-center font-bold text-4xl font-christmas '>{dictionary.allPuzzles}</h1>
      <div className='mt-12 grid xl:grid-cold-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 place-items-center gap-8'>
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