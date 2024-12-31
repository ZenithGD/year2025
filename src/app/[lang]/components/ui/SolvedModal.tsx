"use client"
import { useAnimate } from 'motion/react'
import React, { useState } from 'react'
import Switch from './switch'
import { usePuzzleContext } from '@/src/app/[lang]/context/puzzle/puzzleContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faClose } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { useDictionary } from '../../context/i18n/dictionaryProvider'
import Image from 'next/image'
import { formatMsTime } from '@/src/utils/misc'

// Utility function to make a POST request
async function postRanking(id: number, uname: string, solveTS: number) {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/puzzle/${id}/ranking`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uname, solveTS }),
    });
  } catch (error) {
    console.error('Error posting ranking:', error);
  }
}

type Props = { 
  id: number,
  solveTS: number,
  cropped: string,
  closeModal: () => void 
}

function SolvedModal({ id, solveTS, cropped, closeModal }: Props) {
  const dictionary = useDictionary()

  // State to manage user input
  const [name, setName] = useState("");

  const handleClick = () => {
    postRanking(id, name.trim(), solveTS);
  };

  return (
    <div className='relative lg:w-96 w-72 flex flex-col items-center gap-4 rounded-lg bg-gradient-to-t from-green-600 to-green-500 p-4'>
      <div className='absolute top-4 left-4'>
        <button
          onClick={closeModal}
        >
          <FontAwesomeIcon icon={faClose} />
        </button>
      </div>
      <h2 className='font-bold'>You solved the puzzle in {formatMsTime(solveTS)} ms!</h2>
      <div className='relative h-48 w-48'>
        <Image
          src={`data:image/png;base64,${cropped}`}
          alt="cropped"
          layout="fill"
          className="rounded-lg"
        />
      </div>

      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className='w-full text-black px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500'
      />

      <div className='flex justify-center gap-2'>
        <Link
          href={`/puzzle`}
          onClick={handleClick}
          className={`flex self-stretch flex-1 flex-grow filter drop-shadow-md bg-gradient-to-t from-green-700 to-green-600 divide-x justify-between items-center p-1 bg-green-600 hover:from-green-600 hover:to-green-500 rounded-md ${name.trim() ? '' : 'opacity-50 pointer-events-none'}`}
        >
          <p className='self-center w-full text-green-100 font-bold flex-grow px-2'>{dictionary.puzzles}</p>
          <FontAwesomeIcon className='text-green-100 aspect-square pl-3 p-2' icon={faArrowRight} />
        </Link>
        <Link
          href={`/puzzle/${id}/ranking`}
          onClick={handleClick}
          className={`flex self-stretch flex-1 flex-grow filter drop-shadow-md bg-gradient-to-t from-green-700 to-green-600 divide-x justify-between items-center p-1 bg-green-600 hover:from-green-600 hover:to-green-500 rounded-md ${name.trim() ? '' : 'opacity-50 pointer-events-none'}`}
        >
          <p className='self-center w-full text-green-100 font-bold flex-grow px-2'>{dictionary.goToRanking}</p>
          <FontAwesomeIcon className='text-green-100 aspect-square pl-3 p-2' icon={faArrowRight} />
        </Link>
      </div>
      
    </div>
  )
}

export default SolvedModal
