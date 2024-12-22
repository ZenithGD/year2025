'use client';

import { ProcessImageRequest } from '@/app/api/generate/route';
import { cn } from '@/utils/misc';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import PuzzleCell from './cell';
import { usePuzzleContext } from '@/context/puzzle/puzzleContext';

interface PuzzleGridProps {
  imagePath: string,
  puzzleWidth: number,
  gridSize: { x: number, y: number }
}

export default function PuzzleGrid({ imagePath, gridSize, puzzleWidth }: PuzzleGridProps) {
  
  // the array of references used to track each individual cell and
  // animate them via motion
  const cellsRef = useRef<Array<HTMLDivElement | null>>([])

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
    processImageMutation.mutate({ imagePath, gridSize });
  }, [imagePath, gridSize]);

  useEffect(() => {
    console.log(puzzle.state)
  }, [puzzle.state])

  const pieceSize = puzzleWidth / puzzle.width;
  
  if (processImageMutation.isPending)
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
    <div className='flex justify-center'>
      <div
        style={{
          width: puzzleWidth,
          height: pieceSize * puzzle.height
        }}
      >
        {cells.map((cell, index) => (
          <PuzzleCell 
            image={cell}
            id={Math.floor(index + 1)}
            showId
            key={Math.floor(index + 1)}
            size={pieceSize}
          />
        ))}
      </div>
    </div>
  );
}
