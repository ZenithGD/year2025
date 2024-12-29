"use client"
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { cn, MAX_MOBILE_WIDTH, MAX_TABLET_WIDTH, puzzleWidth } from '@/utils/misc'
import { motion, useAnimate } from 'motion/react'
import Pair from '@/lib/pair'
import { usePuzzleContext } from '@/context/puzzle/puzzleContext'
import toast from 'react-hot-toast'
import { useMediaQuery } from 'react-responsive'

type Props = {
  image: string,
  id: number
  showId: boolean,
  size: number,
  gap: number
}

function PuzzleCell({ image, id, showId, size, gap }: Props) {

  const { puzzle } = usePuzzleContext()
  const [scope, animate] = useAnimate()
  const [pos, setPos] = useState(puzzle.piecePosition(id))

  useEffect(() => {

    const handleResize = () => {
      // detect new resized dimensions
      const isMobile = window.innerWidth < MAX_MOBILE_WIDTH
      const isTablet = window.innerWidth < MAX_TABLET_WIDTH

      const cellSize = puzzleWidth(isMobile, isTablet) / puzzle.width
      const newPos = puzzle.piecePosition(id)
      if ( id === 35 || id === 1 )
        console.log("resize", newPos)
      // since an scope already exists, style setting is not possible
      // and an instant animation is done instead.
      animate(
        scope.current,
        { x: newPos.x * cellSize + gap / 2.0,
          y: newPos.y * cellSize + gap / 2.0 },
        { duration: 0 }
      )
    };

    window.addEventListener("resize", handleResize);
    return () => {
        window.removeEventListener("resize", handleResize);
    };
  }, []);


  const handleMove: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()

    // change puzzle state
    try {
      const solved = puzzle.movePiece(pos.x, pos.y)

      // get new position of this piece and animate
      const newPos = puzzle.piecePosition(id)
      setPos(newPos)

      animate(
        scope.current,
        { x: newPos.x * size + gap / 2.0,
          y: newPos.y * size + gap / 2.0 },
        { duration: 0.2, ease: "easeInOut" }
      )

      if (solved)
      {
        toast.success("Puzzle solved!")
      }
    }
    catch {
      toast.error("Illegal move!")
    }
  }

  return (
    <motion.button
      key={id}
      className={
        cn(
          "absolute h-auto filter drop-shadow-md"
        )
      }
      style={{
        x: pos.x * size + gap / 2.0,
        y: pos.y * size + gap / 2.0
      }}
      ref={scope}
      onClick={handleMove}
    >
      {id > 0 &&
        <Image
          src={`data:image/png;base64,${image}`}
          alt={`cell-${id}`}
          width={size - gap}
          height={size - gap}
          className="rounded-lg"
        />
      }

      {showId && id > 0 &&
        <div className='absolute top-0 left-0 border-2 border-green-300 h-full w-full rounded-lg'>
          <div className='absolute top-0 left-0 bg-green-300 h-8 w-8 p-2 rounded-tl-sm rounded-br-md flex justify-center items-center text-green-950 text-center font-extrabold'>{id}</div>
        </div>
      }
    </motion.button>
  )
}

export default PuzzleCell