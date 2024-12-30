import PuzzleState from "@/lib/puzzle";
import React from "react";
import { createContext } from "react";

type PuzzleStateContextType = {
  puzzle: PuzzleState,

  // game options
  showId: boolean,
  setShowId: (sid: boolean) => void
  highlightCorrect: boolean,
  setHighlightCorrect: (shc: boolean) => void
}

/**
 * The context to store a puzzle
 */
export const PuzzleContext = createContext<PuzzleStateContextType>(undefined!)

/**
 * Create a new puzzle context with some configuration
 * @param width The width in cells of the grid
 * @param height The height in cells of the grid
 * @param currentState The current state of the puzzle, if specified.
 * @returns 
 */
export const createPuzzleContext = (width : number, height : number, currentState?: Array<number>) => {
  return new PuzzleState(width, height, currentState)
}

/**
 * Use the puzzle context. Requires a provider wrapping the caller component.
 * @returns The puzzle context
 */
export function usePuzzleContext() {

  const context = React.useContext(PuzzleContext)

  if (context === undefined) {
    throw new Error('usePuzzleContext must be used within a PuzzleProvider')
  }

  return context

}