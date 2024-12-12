import Puzzle from "./puzzle"

export class GridPosError extends Error {
  x: number
  y: number
  width: number
  height: number
  
  constructor(x : number, y : number, width : number, height : number) {
    super("Invalid position on the grid")
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }
}

export class GridIndexError extends Error {
  idx: number
  width: number
  height: number
  
  constructor(idx: number, width : number, height : number) {
    super("Index cannot fit on the grid")
    this.idx = idx
    this.width = width
    this.height = height
  }
}

export class InvalidStateError extends Error {
  badState: Array<number>
  
  constructor(badState: Array<number>) {
    super("Invalid puzzle state")
    this.badState = badState
  }
}

export class PuzzleError extends Error {
  puzzleState: Puzzle
  
  constructor(msg: string, state: Puzzle)
  {
    super(msg)
    this.puzzleState = state
  }
}

export class IllegalMoveError extends PuzzleError {
  idx: number
  
  constructor(state: Puzzle, idx: number) {
    super("Illegal move", state)
    this.idx = idx
  }
}