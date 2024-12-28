export type PuzzleSaveData = {
  id: number,

  done: boolean

  // The number of hints used to solve the puzzle
  hints: number,

  // Whether this puzzle was solved automatically
  autoSolve: boolean,

  // amount in milliseconds to solve puzzle. Hint penalization is accounted here
  // as well.
  time: number
}

/**
 * Get information for some puzzle.
 * @param id The id of the puzzle
 * @returns The puzzle data stored in local memory. If no data is present, return
 * default information for an unsolved puzzle.
 */
export function getPuzzleData(id: number)
{ 
  // find item in local storage
  const item = localStorage.getItem(id.toString())
  if (!item)
  {
    return { 
      id,
      done: false,
      hints: false,
      autoSolve: false,
      time: Infinity
    }
  }

  // item found
  return JSON.parse(item)
} 

/**
 * Store/override data from a puzzle completion.
 * @param data The new puzzle save data
 */
export function savePuzzleData(data: PuzzleSaveData)
{
  // always override
  localStorage.setItem(data.id.toString(), JSON.stringify(data))
}