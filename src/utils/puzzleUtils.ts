/**
 * Compute the number of inverted cells in the puzzle.
 * An inversion is counted for some i < j if state[i] > state[j]
 * @param state The state to count inversions
 * @param n The number of cells per row
 * @returns The number of inversions in the puzzle state
 */
export function countInversions(state: number[]): number
{
  let iv = 0
  for (let i = 0; i < state.length; i++)
  {
    for (let j = i + 1; j < state.length; j++)
    {
      if (state[i] > 0 && state[j] > 0 && state[i] > state[j])
      {
        iv++
      }
    }
  }
  return iv
}

/**
 * Check if the sliding puzzle is solvable. A puzzle is solvable if:
 * - When n is even, 
 * @param state The state to check
 * @param n The number of cells per row
 * @returns Whether the puzzle can be solved
 */
export function isSolvable(state: number[], n: number): boolean
{
  const iv = countInversions(state)
  const blankIndex = state.indexOf(0);
  const blankRowFromBottom = n - Math.floor(blankIndex / n);

  if (n % 2 === 1)
  {
    return (iv + blankRowFromBottom) % 2 === 0;
  }
  else {
    return iv % 2 === 0
  }
}

/**
 * Run Fisher-Yates algorithm to find an equally probable state from the 
 * shuffled initial state
 * @param n 
 */
export function generateShuffleState(n: number)
{
  // initialize default state to solution
  let state = new Array<number>(n * n);
  for (var i = 0; i < n * n - 1; i++) {
    state[i] = i+1
  }
  state[n * n - 1] = 0

  // shuffle array with FY
  for (let i = n * n - 1; i >= 0; i--)
  {
    // choose random between 0 and i-1
    const j = Math.floor(Math.random() * (i + 1));

    // swap with target element
    [state[i], state[j]] = [state[j], state[i]]
  }

  /*
  If not solvable ensure invariant is true by inverting a pair of cells once
  This works because of the modulus 2 of the invariant:
  - If the selected cells are inverted already, this removes an inversion, which
  ensures the invariant is met.
  - If the cells are not inverted, this adds another inversion, which also 
  ensures the invariant is met.
  */
   
  if (!isSolvable(state, n))
  {
    // Swap two non-blank tiles to toggle the inversion count
    let i = 0;
    let j = 1;
    while (state[i] === 0 || state[j] === 0) {
      i = Math.floor(Math.random() * (n * n));
      j = Math.floor(Math.random() * (n * n));
    }
    [state[i], state[j]] = [state[j], state[i]];
  }

  return state
}