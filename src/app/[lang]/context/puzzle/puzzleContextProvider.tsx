

import React, { useState } from 'react'

import { createPuzzleContext, PuzzleContext } from './puzzleContext'

type Props = {
  width: number,
  height: number,
  currentState?: Array<number>
}

function PuzzleContextProvider({ children, width, height, currentState }: React.PropsWithChildren<Props>) {
  const [puzzle, setPuzzle] = useState(createPuzzleContext(width, height, currentState))

  // game options
  const [showId, setShowId] = useState(true)
  const [highlightCorrect, setHighlightCorrect] = useState(true)

  return (
    <PuzzleContext.Provider value={{ puzzle, showId, setShowId, highlightCorrect, setHighlightCorrect }}>
      {children}
    </PuzzleContext.Provider>
  )
}

export default PuzzleContextProvider