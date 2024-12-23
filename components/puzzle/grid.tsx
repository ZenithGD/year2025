'use client';

import { ProcessImageRequest } from '@/app/api/generate/route';
import { cn } from '@/utils/misc';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import PuzzleCell from './cell';
import { usePuzzleContext } from '@/context/puzzle/puzzleContext';

interface PuzzleGridProps {
  cells: string[],
  puzzleWidth: number,
  cellGap: number
}

export default function PuzzleGrid({ cells, puzzleWidth, cellGap }: PuzzleGridProps) {

  const puzzle = usePuzzleContext();
  const pieceSize = puzzleWidth / puzzle.width;

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
            gap={cellGap}
          />
        ))}
      </div>
    </div>
  );
}
