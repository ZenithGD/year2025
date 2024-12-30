'use client';

import { ProcessImageRequest } from '@/src/app/[lang]/api/generate/route';
import { cn } from '@/utils/misc';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import PuzzleCell from './cell';
import { usePuzzleContext } from '@/src/app/[lang]/context/puzzle/puzzleContext';

interface PuzzleGridProps {
  cells: string[],
  puzzleWidth: number,
  cellGap: number
}

export default function PuzzleGrid({ cells, puzzleWidth, cellGap }: PuzzleGridProps) {

  const { puzzle, showId, highlightCorrect } = usePuzzleContext();
  const pieceSize = puzzleWidth / puzzle.width;

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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
            showId={showId}
            highlightCorrect={highlightCorrect}
            key={Math.floor(index + 1)}
            size={pieceSize}
            gap={cellGap}
            interactable={() => !puzzle.isSolved()}
          />
        ))}
      </div>
    </div>
  );
}
