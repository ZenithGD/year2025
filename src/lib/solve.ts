import Pair from "./pair";
import PuzzleState from "./puzzle";
import { PriorityQueue, QueueNode } from "./queue";

/**
 * A* search solver for the sliding puzzle
 * @param puzzle Initial puzzle state
 * @param heuristic Heuristic function to estimate the cost to the goal
 * @returns Solution path or undefined if no solution
 */
export function solveAStar(puzzle: PuzzleState, heuristic: (puzzle: PuzzleState) => number) {
  const openList = new PriorityQueue<AStarNode>()
  const closedList = new Set<string>() // Set of visited states
  const cameFrom = new Map<string, AStarNode>()

  // Helper to serialize the state for comparison in closedList and cameFrom
  const serializeState = (state: PuzzleState) => state.state.join(',')

  // A* node representation
  interface AStarNode {
    state: PuzzleState
    g: number // Actual cost from the start
    h: number // Heuristic cost to goal
    f: number // Total cost (f = g + h)
    parent?: AStarNode
  }

  // Create the start node
  const startState: AStarNode = {
    state: puzzle,
    g: 0,
    h: heuristic(puzzle),
    f: heuristic(puzzle),
    parent: undefined
  }

  // Add the start node to the open list
  openList.push(startState, startState.f)

  while (openList.queue.length > 0) {
    // Get the node with the lowest f-value
    const currentNode = openList.pop()?.element

    if (currentNode?.state.isSolved()) {
      // Reached the goal, reconstruct the solution path
      const path = []
      let node: AStarNode | undefined = currentNode
      while (node) {
        path.push(node.state)
        node = node.parent
      }
      return path.reverse() // Return the path from start to goal
    }

    // Add current state to closedList
    closedList.add(serializeState(currentNode!.state))

    // Generate neighbors (possible moves)
    const possibleMoves = currentNode!.state.getPossibleMoves()

    for (const move of possibleMoves) {
      const newState = new PuzzleState(puzzle.getSize().x, puzzle.getSize().y, [...currentNode!.state.state])
      newState.movePiece(move.x, move.y) // Move the piece in the new state

      const serializedState = serializeState(newState)

      if (closedList.has(serializedState)) {
        continue // Skip if already visited
      }

      // Calculate the cost values
      const g = currentNode!.g + 1 // Assume each move has a cost of 1
      const h = heuristic(newState)
      const f = g + h

      // If the new state is not in the open list or has a better f value, add/update it
      const existingNode = cameFrom.get(serializedState)
      if (!existingNode || f < existingNode.f) {
        const neighborNode: AStarNode = {
          state: newState,
          g,
          h,
          f,
          parent: currentNode
        }

        cameFrom.set(serializedState, neighborNode)
        openList.push(neighborNode, f) // Add the neighbor to the open list
      }
    }
  }

  return undefined // No solution found
}

/**
 * Manhattan distance heuristic for the sliding puzzle.
 * @param puzzle Current puzzle state
 * @returns The total Manhattan distance for all pieces
 */
export function manhattanHeuristic(puzzle: PuzzleState): number {
  let distance = 0;
  const goalState = new PuzzleState(puzzle.width, puzzle.height);

  // For each piece in the puzzle, calculate the Manhattan distance to its goal position
  for (let i = 0; i < puzzle.state.length; i++) {
    const piece = puzzle.state[i];
    if (piece === 0) continue; // Ignore the blank square (0)

    // Get the current position of the piece
    const currentPos = puzzle.indexToGrid(i);
    // Get the goal position of the piece
    const goalPos = goalState.piecePosition(piece);

    // Add the Manhattan distance of the piece
    distance += Pair.distL1(currentPos, goalPos);
  }

  return distance;
}