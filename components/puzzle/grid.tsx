'use client';

import { ProcessImageRequest } from '@/app/api/generate/route';
import { cn } from '@/utils/misc';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { useEffect, useState } from 'react';

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
          gridTemplateColumns: `repeat(${gridSize.x}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${gridSize.y}, minmax(0, 1fr))`,
        }}
      >
        {cells.map((cell, index) => (
          <div key={index} className="w-full h-auto">
            <Image
              src={`data:image/png;base64,${cell}`}
              alt="cell"
              layout="responsive"
              width={1}
              height={1} // 1:1 aspect ratio
              objectFit="cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
