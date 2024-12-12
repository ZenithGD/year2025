'use client';

import { ProcessImageRequest } from '@/app/api/generate/route';
import { cn } from '@/utils/misc';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import PuzzleCell from './cell';

interface PuzzleGridProps {
  imagePath: string;
  gridSize: { x: number, y: number }
}

export default function PuzzleGrid({ imagePath, gridSize }: PuzzleGridProps) {
  const [cells, setCells] = useState<string[]>([]);

  const processImageMutation = useMutation({
    mutationFn: async ({ imagePath, gridSize }: ProcessImageRequest) => {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imagePath, gridSize }),
      });

      if (!response.ok) {
        throw new Error('Failed to process image');
      }

      return response.json();
    },
    onSuccess: (data: { cells: string[] }) => {
      setCells(data.cells);
    },
  });

  // Trigger image processing when the component mounts
  useEffect(() => {
    processImageMutation.mutate({ imagePath, gridSize });
  }, [imagePath, gridSize]);

  return (
    <div className='flex justify-center w-full h-full'>
      {processImageMutation.isPending && <p>Processing image...</p>}
      {processImageMutation.isError && <p>Error: {processImageMutation.error?.message}</p>}
      <div
        className="grid gap-1"
        style={{
          gridTemplateColumns: `repeat(${gridSize.x}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize.y}, 1fr)`,
        }}
      >
        {cells.map((cell, index) => (
          <PuzzleCell 
            image={cell} 
            id={Math.floor(index + 1) % (gridSize.x * gridSize.y)}
            showId
          />
        ))}
      </div>
    </div>
  );
}
