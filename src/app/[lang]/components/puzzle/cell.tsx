"use client"
import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { cn, MAX_MOBILE_WIDTH, MAX_TABLET_WIDTH, puzzleWidth } from '@/utils/misc'
import { AnimatePresence, motion, useAnimate } from 'motion/react'
import Pair from '@/lib/pair'
import { usePuzzleContext } from '@/src/app/[lang]/context/puzzle/puzzleContext'
import toast from 'react-hot-toast'
import { useMediaQuery } from 'react-responsive'
import { manhattanHeuristic, solveAStar } from '@/src/lib/solve'
import { useDictionary } from '../../context/i18n/dictionaryProvider'

type Props = {
  image: string,
  id: number
  showId: boolean,
  highlightCorrect: boolean,
  size: number,
  gap: number,
  onSolve: () => void,
  active: boolean
}

function PuzzleCell({ image, id, showId, highlightCorrect, size, gap, onSolve, active }: Props) {

  const { dictionary, locale } = useDictionary()
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

      // since an scope already exists, style setting is not possible
      // and an instant animation is done instead.
      animate(
        scope.current,
        {
          x: newPos.x * cellSize + gap / 2.0,
          y: newPos.y * cellSize + gap / 2.0
        },
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

    if ( !active )
      return

    // change puzzle state
    try {
      const solved = puzzle.movePiece(pos.x, pos.y)

      // get new position of this piece and animate
      const newPos = puzzle.piecePosition(id)
      setPos(newPos)

      animate(
        scope.current,
        {
          x: newPos.x * size + gap / 2.0,
          y: newPos.y * size + gap / 2.0
        },
        { duration: 0.2, ease: "easeInOut" }
      )
      
      // solved, callback from top component
      if (solved) {
        toast.success(dictionary.puzzle.solved)
        onSolve()
      }
    }
    catch {
      toast.error(dictionary.puzzle.illegalMove)
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
      <Image
        src={`data:image/png;base64,${image}`}
        alt={`cell-${id}`}
        width={size - gap}
        height={size - gap}
        className="rounded-lg"
      />

      <AnimatePresence>
        {showId && (
          <motion.div
            className='absolute top-0 left-0 h-full w-full rounded-lg'
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className='absolute top-0 left-0 h-8 w-8 p-2 rounded-tl-md rounded-br-md flex justify-center items-center text-green-950 text-center font-extrabold'
              animate={{
                backgroundColor: !highlightCorrect || puzzle.correctlyPlaced(id)
                  ? 'rgb(134 239 172)'
                  : 'rgb(220 38 38)',
                opacity: 1
              }}
            >
              {id}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {highlightCorrect && (
          <motion.div
            className={cn(
              'absolute top-0 left-0 h-full w-full p-2 rounded-md flex justify-center items-center text-green-950 text-center font-extrabold',
              'border-4'
            )}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{
              borderColor: !highlightCorrect || puzzle.correctlyPlaced(id) ? 'rgb(134 239 172)' : 'rgb(220 38 38)', opacity: 1// Tailwind colors in RGB
            }}
          >
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

export default PuzzleCell