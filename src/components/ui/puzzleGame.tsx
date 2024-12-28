import { ProcessImageRequest } from '@/src/app/api/generate/route';
import { usePuzzleContext } from '@/context/puzzle/puzzleContext';
import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import PuzzleGrid from '../puzzle/grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faCog, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { PuzzleRowType } from '@/src/db/schema';

interface Props {
  puzzleInfo: PuzzleRowType,
  puzzleWidth: number,
  cellGap: number
}

function PuzzleGame({ puzzleInfo, puzzleWidth, cellGap }: Props) {

  // the array of images
  const [cells, setCells] = useState<string[]>([]);
  
  // Show id of each cell
  const [showId, setShowId] = useState<boolean>(false)

  // the puzzle state context
  const puzzle = usePuzzleContext()

  /**
   * Mutation to check for changes in the state of the puzzle images
   */
  const processImageMutation = useMutation({
    mutationFn: async ({ imagePath, gridSize }: ProcessImageRequest) => {

      return fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imagePath, gridSize }),
      }).then(r => r.json());
    },
    onSuccess: (data: { cells: string[] }) => {
      setCells(data.cells.slice(0, -1));
    },
  });

  // Trigger image processing when the component mounts
  useEffect(() => {
    processImageMutation.mutate({ imagePath: puzzleInfo.image, gridSize: puzzle.getSize() });
  }, [puzzleInfo.image]);

  if (processImageMutation.isError)
    {
      return (
        <p>Error: {processImageMutation.error?.message}</p>
      )
    }

  if (processImageMutation.isIdle || processImageMutation.isPending)
  {
    return (
      <p>Processing image...</p>
    )
  }

  return (
    <div className='flex w-full h-full justify-center items-center'>
      <div className='flex flex-col gap-4'>
        <div className='bg-gradient-to-t from-green-700 to-green-500 backdrop-blur rounded-lg filter shadow-lg p-4'>
          <PuzzleGrid
            cells={cells}
            puzzleWidth={puzzleWidth}
            cellGap={cellGap}
          />
        </div>
        <button
          className='bg-gradient-to-t from-green-700 to-green-600 flex justify-center items-center w-full p-1 bg-green-600 hover:from-green-600 hover:to-green-500 rounded-md'
        >
          <p className='self-center text-green-100 font-bold'>Settings</p> 
          <FontAwesomeIcon className='text-green-100 aspect-square pl-2 p-2' icon={faCog} />
        </button>
        <div className='flex gap-4'>
          <button
            className='bg-gradient-to-t from-green-700 to-green-600 divide-x flex justify-between items-center w-full p-1 bg-green-600 hover:from-green-600 hover:to-green-500 rounded-md'
          >
            <p className='self-center w-full text-green-100 font-bold flex-grow'>Hint</p> 
            <FontAwesomeIcon className='text-green-100  aspect-square pl-3 p-2' icon={faMagnifyingGlass} />
          </button>
          <button
            className='bg-gradient-to-t from-green-700 to-green-600 divide-x flex justify-between items-center w-full p-1 bg-green-600 hover:from-green-600 hover:to-green-500 rounded-md'
          >
            <p className='self-center w-full text-green-100 font-bold flex-grow'>Solution</p> 
            <FontAwesomeIcon className='text-green-100 aspect-square pl-3 p-2' icon={faCheck} />
          </button>
        </div>
        
      </div>
    </div>
  )
}

export default PuzzleGame
