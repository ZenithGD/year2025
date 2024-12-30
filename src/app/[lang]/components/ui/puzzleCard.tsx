import { puzzle, PuzzleRowType } from '@/src/db/schema'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

type Props = {
  puzzleData: PuzzleRowType
}

function PuzzleCard({ puzzleData }: Props) {

  const nr = Array.from(new Array(puzzleData.difficulty).keys())

  return (
    <Link
      href={`/puzzle/${puzzleData.id}`}
      className='relative flex flex-col h-full lg:w-64 md:w-48 w-32 bg-green-300 rounded-lg filter shadow-lg hover:scale-105 transition duration-100'>
      <div className='w-full aspect-square'>
        <div className='relative w-full h-full'>
          <Image
            src={`/images/${puzzleData.image}`}
            alt={puzzleData.title}
            layout="fill"
            className='rounded-t-lg border-green-300 object-cover'
          />
        </div>
      </div>
      <div className='text-green-950 rounded-b-lg flex flex-col'>
        <div className="flex justify-center gap-1 p-2 bg-gradient-to-r from-red-50 to-red-200 text-red-600 h-8 filter shadow-md" >
          { puzzleData.difficulty > 5
            ? (
              <div className='flex gap-2 items-center'>
                <span>
                  {puzzleData.difficulty}
                </span> 
                <FontAwesomeIcon icon={faStar} />
              </div>
            )
            : (nr.map((e, key) => <FontAwesomeIcon key={key} icon={faStar} />))  }
        </div>
        <div className="bg-red-400 rounded-b-lg p-2 flex flex-col items-center">
          <p className='text-red-900 font-bold'>{puzzleData.title}</p>
        </div>
      </div>
      <div className='absolute w-3/4 top-0 left-1/2 -translate-x-[50%] -translate-y-[calc(50%-2px)] rounded-full bg-green-300 p-6 h-8 flex justify-center items-center'>
        <p className='font-extrabold text-2xl text-green-950'>{puzzleData.id}</p>
      </div>
    </Link>
  )
}

export default PuzzleCard