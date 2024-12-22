import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { cn } from '@/utils/misc'
import { motion, useAnimate } from 'motion/react'
import Pair from '@/lib/pair'
import { usePuzzleContext } from '@/context/puzzle/puzzleContext'
import toast from 'react-hot-toast'

type Props = {
  image: string,
  id: number
  showId: boolean,
  size: number,
}

function PuzzleCell({ image, id, showId, size }: Props) {

  const puzzle = usePuzzleContext()
  const ref = useRef(null)
  const [scope, animate] = useAnimate()
  const [pos, setPos] = useState(puzzle.piecePosition(id))

  const handleMove : React.MouseEventHandler<HTMLButtonElement> = (e) => {
    // change puzzle state
    try {
      const solved = puzzle.movePiece(pos.x, pos.y)

      // get new position of this piece and animate
      const newPos = puzzle.piecePosition(id)
      setPos(newPos)

      animate(
        scope.current,
        { x: newPos.x * size, y: newPos.y * size },
        { duration: 0.3, delay: 0.1, ease: "easeInOut" }
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
          "absolute h-auto",
          { "shadow-lg": id > 0 } 
        )
      }
      style={{
        x: pos.x * size,
        y: pos.y * size
      }}
      ref={scope}
      
      transition={{ duration: 0.3, delay: 1, ease: "linear" }}
      onClick={handleMove}
    >
      {id > 0 &&
        <Image
          src={`data:image/png;base64,${image}`}
          alt={`cell-${id}`}
          width={size}
          height={size}
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