import Pair from "./pair";
import { GridIndexError, GridPosError, IllegalMoveError } from "@/lib/errors"

export default class PuzzleState {
  state: Array<number>
  width: number
  height: number
  blankIndex: number

  /**
   * Create a puzzle object. The blank square is marked as 0, and every number 
   * greater than 0 is a filled cell. The objective is to solve the puzzle, 
   * achieving the state [1,..., n-1, 0]
   * @param width width of the grid
   * @param height Height of the grid
   * @param currentState The current state, if provided
   */
  constructor(width: number, height: number, currentState?: Array<number>)
  {
    if (currentState != undefined) {
      this.state = currentState;

      // find the blank index
      this.blankIndex = currentState.indexOf(0)

      if (this.blankIndex < 0)
      {
        throw new Error("Invalid initial state")
      }
    }
    else {
      // initialize default state to solution
      this.state = new Array<number>(width * height);
      for (var i = 0; i < width * height - 1; i++) {
        this.state[i] = i+1
      }
      this.state[width * height - 1] = 0
      this.blankIndex = width * height - 1
    }
    this.width = width;
    this.height = height;
  }

  getPossibleMoves() : Pair[]
  { 
    // get 2D position of blank square
    let blankPos = this.blankSquarePos()

    // find possible moves
    let sol = []

    if (blankPos.x - 1 >= 0) {
      sol.push(new Pair(blankPos.x - 1, blankPos.y))
    }

    if (blankPos.x + 1 < this.width) {
      sol.push(new Pair(blankPos.x + 1, blankPos.y))
    }

    if (blankPos.y - 1 >= 0) {
      sol.push(new Pair(blankPos.x, blankPos.y - 1))
    }

    if (blankPos.y + 1 < this.height) {
      sol.push(new Pair(blankPos.x, blankPos.y + 1))
    }

    return sol
  }

  /**
   * Move a piece to the blank square, if possible. If move is illegal,
   * throw an exception
   * @param x The position in the X axis (horizontal)
   * @param y The position in the Y axis (vertical)
   */
  public movePiece(x: number, y: number) : boolean
  {
    // get index
    let idx = this.gridToIndex(x, y)

    // subtract from grid position of blank square
    let blankPos = this.blankSquarePos()

    // move is legal if L1(blank, (x, y)) == 1
    const dt = Pair.distL1(new Pair(x, y), blankPos)
    
    if (dt !== 1)
    {
      throw new IllegalMoveError(this, idx)
    }

    // swap blank and selected
    [this.state[idx], this.state[this.blankIndex]] = [this.state[this.blankIndex], this.state[idx]]
    this.blankIndex = idx

    return this.isSolved()
  }

  /**
   * Get the index corresponding to the position in the 2D grid
   * @param x The position in the X axis (horizontal)
   * @param y The position in the Y axis (vertical)
   * @returns 
   */
  gridToIndex(x: number, y: number) {

    // check bounds before returning
    if ( x < 0 || y < 0 || x >= this.width || y >= this.height )
      throw new GridPosError(x, this.width, y, this.height)

    return y * this.width + x;
  }

  /**
   * Get the position in the 2D grid corresponding to the index in the state array
   * @param idx The index in the state array
   * @returns 
   */
  indexToGrid(idx: number) {
    if (idx < 0 || idx >= this.width * this.height)
      throw new GridIndexError(idx, this.width, this.height)

    // compute grid 2d pos
    return new Pair(idx % this.width, Math.floor(idx / this.width))
  }

  /**
   * Return the position of the blank square in the 2D grid
   * @returns The position of the blank square in the 2D grid
   */
  blankSquarePos() : Pair {
    return this.indexToGrid(this.blankIndex)
  }

  /**
   * Return whether the puzzle has been already solved. The puzzle is solved if the 
   * state is equal to [1,..., n-1, 0], or in other words, the blank square is 
   * in the lower right corner
   * @returns true if the puzzle is solved, false otherwise
   */
  isSolved() : boolean
  {
    let solved: boolean = true
    for (var i = 0; i < this.width * this.height - 1 && solved; i++)
    {
      solved &&= this.state[i] === i + 1
    }
    solved &&= this.state[this.width * this.height - 1] === 0

    return solved
  }

  /**
   * Return the position of the piece in the 2D grid
   * @param idx 
   */
  public piecePosition(idx: number): Pair
  {
    const pos = this.state.indexOf(idx)
    
    if (pos < 0)
    {
      throw new GridIndexError(idx, this.width, this.height)
    }

    return this.indexToGrid(pos)
  }

  public getSize(): Pair
  {
    return new Pair(this.width, this.height)
  }

  public correctlyPlaced(idx: number): boolean
  {
    if (idx === 0) return this.state.at(-1) === 0
    
    return idx === this.state[idx - 1]
  }
}