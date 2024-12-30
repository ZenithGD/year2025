export type QueueNode<T> = { element: T, value: number }

/**
 * Min-heap data structure
 */
export class PriorityQueue<T>
{
  queue: QueueNode<T>[]
  constructor()
  {
    this.queue = []
  }

  public pop(): QueueNode<T> | undefined
  {
    return this.queue.shift()
  }

  public push(e: T, val: number)
  {
    // search index
    let i = 0
    let foundInsert = false

    while (i < this.queue.length && !foundInsert)
    {
      if (this.queue[i].value > val)
      {
        foundInsert = true
        break
      }
      i++
    }

    // insert new element
    this.queue.splice(i, 0, { element: e, value: val })
  }

  public peek(): QueueNode<T> | undefined
  {
    return this.queue.at(0)
  }
}