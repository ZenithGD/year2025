class Pair {
  x: number
  y: number
  constructor(x: number, y: number)
  {
    this.x = x
    this.y = y
  }

  static eq(p1: Pair, p2: Pair)
  {
    return p1.x === p2.x && p1.y === p2.y
  }

  static distL1(p1: Pair, p2: Pair)
  {
    return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y)
  }
}

export default Pair