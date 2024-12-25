

import React from 'react'

import { createPuzzleContext, PuzzleContext } from './puzzleContext'

type Props = {
  width: number,
  height: number,
  currentState?: Array<number>
}

function PuzzleContextProvider({ children, width, height, currentState }: React.PropsWithChildren<Props>) {
  return (
    <PuzzleContext.Provider value={createPuzzleContext(width, height, currentState)}>
      {children}
    </PuzzleContext.Provider>
  )
}

export default PuzzleContextProvider