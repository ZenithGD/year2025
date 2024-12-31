import {beforeEach, describe, expect, it} from '@jest/globals';

import PuzzleState from '@/lib/puzzle'; // Adjust the path as necessary
import { IllegalMoveError, GridPosError, GridIndexError } from '@/lib/errors';
import Pair from '@/lib/pair';
import { generateShuffleState, isSolvable } from '@/src/utils/puzzleUtils';

describe('PuzzleState', () => {

  // Test 1: Check constructor initializes correctly with default state
  it('should initialize with default solved state', () => {
    const puzzle = new PuzzleState(3, 3);  // 3x3 puzzle

    expect(puzzle.state).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 0]); // Default solved state
    expect(puzzle.blankIndex).toBe(8); // Blank at the last position (bottom-right)
  });

  // Test 2: Check constructor with a custom state
  it('should initialize with a custom state', () => {
    const customState = [1, 2, 3, 4, 5, 6, 7, 0, 8];
    const puzzle = new PuzzleState(3, 3, customState);

    expect(puzzle.state).toEqual(customState);
    expect(puzzle.blankIndex).toBe(7); // Blank at position 7
  });

  // Test 3: Test the isSolved() method
  it('should correctly detect if the puzzle is solved', () => {
    const solvedState = [1, 2, 3, 4, 5, 6, 7, 8, 0];
    const puzzle = new PuzzleState(3, 3, solvedState);
    expect(puzzle.isSolved()).toBe(true);

    const unsolvedState = [1, 2, 3, 4, 5, 6, 7, 0, 8];
    const unsolvedPuzzle = new PuzzleState(3, 3, unsolvedState);
    expect(unsolvedPuzzle.isSolved()).toBe(false);
  });

  // Test 4: Test movePiece() with legal move
  it('should move a piece and update the puzzle state', () => {
    const puzzle = new PuzzleState(3, 3);
    const initialState = [...puzzle.state];
    const blankPos = puzzle.blankSquarePos();

    // new blank position
    const newPos = new Pair(1, 2);
    puzzle.movePiece(newPos.x, newPos.y);

    expect(puzzle.state).not.toEqual(initialState); // State should change
    expect(puzzle.blankSquarePos()).not.toEqual(blankPos); // Blank should move
    expect(puzzle.state[puzzle.gridToIndex(newPos.x, newPos.y)]).toBe(0); // 8 should now be at the new position
  });

  // Test 5: Test movePiece() with illegal move (non-adjacent)
  it('should throw an IllegalMoveError when moving a non-adjacent piece', () => {
    const puzzle = new PuzzleState(3, 3);

    // Try to move a non-adjacent piece
    expect(() => puzzle.movePiece(0, 0)).toThrowError(IllegalMoveError);
  });

  // Test 6: Test getPossibleMoves() for a specific state
  it('should return possible moves for a given state', () => {
    const puzzle = new PuzzleState(3, 3);
    const possibleMoves = puzzle.getPossibleMoves();

    console.log(possibleMoves)
    expect(possibleMoves.length).toBe(2); // There should be 2 possible moves
    expect(possibleMoves.some(move => move.x === 1 && move.y === 2)).toBe(true); // cell 6
    expect(possibleMoves.some(move => move.x === 1 && move.y === 2)).toBe(true); // cell 8
  });

  // Test 7: Test gridToIndex() and indexToGrid() methods
  it('should correctly convert between grid position and index', () => {
    const puzzle = new PuzzleState(3, 3);
    const gridPos = new Pair(1, 1);
    const idx = puzzle.gridToIndex(gridPos.x, gridPos.y);
    const convertedGridPos = puzzle.indexToGrid(idx);

    expect(convertedGridPos.x).toBe(gridPos.x);
    expect(convertedGridPos.y).toBe(gridPos.y);
  });

  // Test 8: Check if pieces are correctly placed in default puzzle
  it('should correctly check if a piece is correctly placed', () => {
    const puzzle = new PuzzleState(3, 3);
    for (let i = 0; i < 9; i++)
    {
      expect(puzzle.correctlyPlaced(i)).toBe(true)
    }
  });

  // Test 9: Test edge case when given invalid state (non-solvable)
  it('should throw an error for invalid grid position (GridPosError)', () => {
    const puzzle = new PuzzleState(3, 3);

    expect(() => puzzle.gridToIndex(3, 3)).toThrowError(GridPosError);  // Invalid position (out of bounds)
    expect(() => puzzle.indexToGrid(10)).toThrowError(GridIndexError);  // Invalid index (out of bounds)
  });

  // Test 10: Test solvability of randomly generated puzzles
  it('should always generate a solvable configuration for even number of rows in puzzle', () => {
    for (let i = 0; i < 1000; i++)
    {
      const n = 4
      const rs = generateShuffleState(n);

      expect(isSolvable(rs, n)).toBe(true);
    }
    
  });

   // Test 10: Test solvability of randomly generated puzzles
   it('should always generate a solvable configuration for odd number of rows in puzzle', () => {
    for (let i = 0; i < 1000; i++)
    {
      const n = 5
      const rs = generateShuffleState(n);

      expect(isSolvable(rs, n)).toBe(true);
    }
    
  });


});

