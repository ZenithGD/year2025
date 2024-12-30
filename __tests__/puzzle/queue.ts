import {beforeEach, describe, expect, it} from '@jest/globals';

import { PriorityQueue } from "@/lib/queue"

describe('PriorityQueue', () => {
  let pq: PriorityQueue<number>;

  beforeEach(() => {
    pq = new PriorityQueue<number>();
  });

  it('should initialize an empty queue', () => {
    expect(pq.peek()).toBeUndefined();
    expect(pq.pop()).toBeUndefined();
  });

  it('should insert elements in order based on their priority', () => {
    pq.push(5, 5);
    pq.push(1, 1);
    pq.push(3, 3);

    expect(pq.peek()?.element).toBe(1);
  });

  it('should pop elements in ascending order based on their priority', () => {
    pq.push(5, 5);
    pq.push(1, 1);
    pq.push(3, 3);

    expect(pq.pop()?.element).toBe(1);
    expect(pq.pop()?.element).toBe(3);
    expect(pq.pop()?.element).toBe(5);
    expect(pq.pop()).toBeUndefined(); 
  });

  it('should peek the top element without removing it', () => {
    pq.push(5, 5);
    pq.push(1, 1);
    pq.push(3, 3);

    expect(pq.peek()?.element).toBe(1);
    expect(pq.pop()?.element).toBe(1);
  });

  it('should handle multiple elements with the same priority', () => {
    pq.push(5, 3);
    pq.push(3, 3);
    pq.push(1, 3);

    // Since all elements have the same priority, they should be popped in the order they were inserted
    expect(pq.pop()?.element).toBe(5);
    expect(pq.pop()?.element).toBe(3);
    expect(pq.pop()?.element).toBe(1);
    expect(pq.pop()).toBeUndefined();
  });

  it('should handle an empty queue gracefully', () => {
    expect(pq.peek()).toBeUndefined();
    expect(pq.pop()).toBeUndefined();
  });
});
