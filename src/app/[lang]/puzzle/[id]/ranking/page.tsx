import { PuzzleRowType } from '@/src/db/schema'
import React from 'react'

type Props = {
  params: {
    id: string;
  }
}

async function PuzzleRanking({ params: { id }}: Props) {

  const fetchPuzzleInfo = async () => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/puzzle/${id}`)
      .then(r => r.json())
      .then(r => r.row) as PuzzleRowType
  }
  
  const puzzleData = await fetchPuzzleInfo()

  return (
    <div className='flex flex-col self-center h-full w-full'>
      <h1 className='text-center lg:text-4xl text-2xl font-christmas'>{puzzleData.title}</h1>
      <ul className='flex flex-col pb-4'>
      
      </ul>
    </div>
  )
}

export default PuzzleRanking