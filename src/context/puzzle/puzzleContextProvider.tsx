

import React, { useState } from 'react'

import { createPuzzleContext, PuzzleContext } from './puzzleContext'

type Props = {
  width: number,
  height: number,
  currentState?: Array<number>
}

function PuzzleContextProvider({ children, width, height, currentState }: React.PropsWithChildren<Props>) {
  const [puzzle, setPuzzle] = useState(createPuzzleContext(width, height, currentState))

  return (
    <PuzzleContext.Provider value={puzzle}>
      {children}
    </PuzzleContext.Provider>
  )
}

export default PuzzleContextProvider