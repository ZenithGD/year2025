import { puzzle, PuzzleRowType } from '@/src/db/schema'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  puzzleData: PuzzleRowType
}

function PuzzleCard({ puzzleData }: Props) {
  return (
    <Link
      href={`/puzzle/${puzzleData.id}`}
      className='relative flex flex-col h-full w-72 bg-green-300 rounded-lg filter shadow-lg'>
      <div className='w-full aspect-square'>
        <div className='relative w-full h-full'>
          <Image
            src={`/images/${puzzleData.image}`}
            alt={puzzleData.title}
            layout="fill"
            objectFit="cover"
            className='rounded-t-lg border-green-300'
          />
        </div>
      </div>
      <div className='p-4 text-green-950 bg-green-200 rounded-b-lg'>
        aad
      </div>
      <div className='absolute top-0 left-1/2 -translate-x-[50%] -translate-y-[calc(50%-2px)] rounded-full bg-green-300 p-6 w-8 h-8 flex justify-center items-center'>
        <p className='font-extrabold text-2xl text-green-950'>{puzzleData.id}</p>
      </div>
    </Link>
  )
}

export default PuzzleCard