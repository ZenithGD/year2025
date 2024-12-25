import { ProcessImageRequest } from '@/src/app/api/generate/route';
import { usePuzzleContext } from '@/context/puzzle/puzzleContext';
import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react'
import PuzzleGrid from '../puzzle/grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

interface Props {
  imagePath: string,
  puzzleWidth: number,
  cellGap: number
}

function PuzzleGame({ imagePath, puzzleWidth, cellGap }: Props) {

  // the array of images
  const [cells, setCells] = useState<string[]>([]);

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
    processImageMutation.mutate({ imagePath, gridSize: puzzle.getSize() });
  }, [imagePath]);

  useEffect(() => {
    console.log(puzzle.state)
  }, [puzzle.state])
  
  if (processImageMutation.isIdle || processImageMutation.isPending)
  {
    return (
      <p>Processing image...</p>
    )
  }

  if (processImageMutation.isError)
  {
    return (
      <p>Error: {processImageMutation.error?.message}</p>
    )
  }

  return (
    <div className='flex w-full h-full justify-center items-center'>
      <div className='flex flex-col gap-4'>
        <div className='border-2 border-green-200 bg-green-600 backdrop-blur rounded-lg filter shadow-lg p-4'>
          <PuzzleGrid
            cells={cells}
            puzzleWidth={puzzleWidth}
            cellGap={cellGap}
          />
        </div>
        <div className='flex gap-4'>
          <button
            className='divide-x border-2 border-green-200 flex justify-between items-center gap-4 w-full p-1 bg-green-600 hover:bg-green-500 rounded-md'
          >
            <p className='self-center w-full text-green-100 font-bold flex-grow'>Hint</p> 
            <FontAwesomeIcon className='text-green-100  aspect-square pl-3 p-2' icon={faMagnifyingGlass} />
          </button>
          <button
            className='divide-x border-2 border-green-200 flex justify-between items-center gap-4 w-full p-1 bg-green-600 hover:bg-green-500 rounded-md'
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