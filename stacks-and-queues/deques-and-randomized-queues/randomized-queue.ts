export default class RandomizedQueue<T> {
  private data: T[]
  private count: number

  constructor() {
    this.data = new Array<T>(2)
    this.count = 0
  }

  /** Is the randomized queue empty? */
  isEmpty(): boolean { return this.count === 0 }

  /** Returns the number of items in the randomized queue. */
  size(): number { return this.count }

  /** Adds an item. */
  enqueue(item: T) {
    if (item === null || undefined) { throw new TypeError() }
    this.data[this.count++] = item
    if (this.count === this.data.length) { this.resize(this.data.length * 2) } // Double the size of array when full.
  }

  /** Removes and returns a random item. */
  dequeue(): T {
    if (this.isEmpty()) { throw new RangeError('Queue is empty.') }

    const idx = Math.floor(Math.random() * this.count)

    if (idx !== 0) {
      // Swap item with the first element in array to maintain constant time deletion.
      [this.data[idx], this.data[0]] = [this.data[0], this.data[idx]]
    }

    this.count--
    // Halve the array size when one-quarter full.
    if (this.count === Math.floor(this.data.length / 4)) { this.resize(Math.round(this.data.length / 2)) }
    return this.data.shift()!
  }

  /** Returns a random item (but does not remove it). */
  sample(): T {
    if (this.isEmpty()) { throw new RangeError('Queue is empty.') }

    return this.data[Math.floor(Math.random() * this.count)]
  }

  /** Resizes the array. */
  private resize(newSize: number) {
    const copy = new Array<T>(newSize)
    for (let i = 0; i <= newSize; i++) { copy[i] = this.data[i] }
    this.data = copy
  }

  // Iterator.
  [Symbol.iterator](): IterableIterator<T | null> { return this }

  next(): IteratorResult<T | null> {
    if (this.isEmpty()) {
      return { done: true, value: null }
    } else {
      return { done: false, value: this.dequeue() }
    }
  }
}