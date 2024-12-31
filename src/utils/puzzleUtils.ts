/**
 * Compute the number of inverted cells in the puzzle.
 * An inversion is counted for some i < j if state[i] > state[j]
 * @param state The state to count inversions
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

  if (n % 2 === 1) {
    // Odd grid: solvable if inversion count is even
    return iv % 2 === 0;
  } else {
    // Even grid: solvable if (row from bottom is even and inversion count is odd)
    // OR (row from bottom is odd and inversion count is even)
    return (blankRowFromBottom % 2 === 0) || (iv % 2 === 1);
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

  if (n === 2)
  {
    // special case for n == 2
    const cases = [
      [1, 2, 0, 3],
      [1, 0, 3, 2],
      [0, 1, 3, 2],
      [0, 2, 1, 3],
      [2, 0, 1, 3],
      [3, 1, 0, 2]
    ]
    
    const it = Math.floor(Math.random() * cases.length)
    return cases[it]
  }

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
    // swap different tiles to change inversion count
    let i = 0;
    let j = 1;
    while (state[i] === 0 || state[j] === 0 || i === j) {
      i = Math.floor(Math.random() * (n * n));
      j = Math.floor(Math.random() * (n * n));
    }
    [state[i], state[j]] = [state[j], state[i]];
  }

  return state
}