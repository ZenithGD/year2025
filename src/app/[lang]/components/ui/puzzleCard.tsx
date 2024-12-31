"use client"
import { puzzle, PuzzleRowType } from '@/src/db/schema'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faCross, faStar, faStopwatch, faTrophy, faX } from '@fortawesome/free-solid-svg-icons'
import { PuzzleSaveData } from '@/src/services/storageService'
import { useDictionary } from '../../context/i18n/dictionaryProvider'
import { formatMsTime } from '@/src/utils/misc'
import { useRouter } from 'next/navigation'
import { motion } from 'motion/react'

type Props = {
  puzzleData: PuzzleRowType & { saveData: PuzzleSaveData }
}

function PuzzleCard({ puzzleData }: Props) {

  const dictionary = useDictionary()
  const router = useRouter()

  const nr = Array.from(new Array(puzzleData.difficulty).keys())
  console.log(puzzleData)
  return (
    <div
      onClick={() => router.push(`/puzzle/${puzzleData.id}`)}
      className='cursor-pointer relative flex flex-col h-full lg:w-64 md:w-48 w-32 bg-green-300 rounded-lg filter shadow-lg hover:scale-105 transition duration-100'>
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
        <div className="bg-red-400 rounded-b-lg p-4 flex flex-col gap-2 items-center">
          <p className='text-red-900 font-bold lg:text-xl text-lg line-clamp-2 text-pretty break-all'>{puzzleData.title}</p>
          <div className='flex justify-between items-center text-lg gap-2'>
            <FontAwesomeIcon icon={faStopwatch} />
            <p className='md:block hidden'>{dictionary.bestTime}</p>
            <p className='text-red-800'>
              {formatMsTime(puzzleData.saveData.time)}
            </p>
          </div>
        </div>
      </div>
      <motion.div
        animate
        style={{ background: puzzleData.saveData.done ? "rgb(134, 239, 172)" : "rgb(248, 113, 113)"}}
        className='absolute top-0 left-1/2 -translate-x-[50%] -translate-y-[calc(50%-2px)] rounded-full h-12 w-12 flex justify-center items-center'>
        <p className='font-extrabold text-2xl text-green-950'>{puzzleData.id}</p>
      </motion.div>
    </div>
  )
}

export default PuzzleCard