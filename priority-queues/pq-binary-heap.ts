
export class BinaryHeapPQ<T> {
  private data: T[]

  constructor() {
    this.data = new Array<T>()
    this.data[0] = null!
  }

  /** Inserts an item. */
  // At most 1 + lg *N* compares.
  insert(item: T) {
    const k = this.data.push(item)
    this.swim(k - 1)
  }

  /** Removes and returns the highest element. */
  // At most 2 lg *N* compares.
  delMax(): T {
    [this.data[1], this.data[this.data.length - 1]] = [this.data[this.data.length - 1], this.data[1]]
    const item = this.data.pop()!
    this.sink(1)
    return item
  }

  /** Moves a node upstream. */
  private swim(k: number) {
    while (k > 1 && this.data[Math.floor(k / 2)] < this.data[k]) {
      [this.data[k], this.data[Math.floor(k / 2)]] = [this.data[Math.floor(k / 2)], this.data[k]]  // Swap parent and child.
      k = Math.floor(k / 2)
    }
  }

  /** Moves a node downstream. */
  private sink(k: number) {
    // Repeat while Parent's key is smaller than one (or both) of its children's.
    while (2 * k <= this.data.length) {
      // Swap larger child with parent.
      let j = 2 * k
      if (j < this.data.length && this.data[j] < this.data[j + 1]) { j++ }
      if (!(this.data[k] < this.data[j])) { break }
      [this.data[k], this.data[j]] = [this.data[j], this.data[k]]
      k = j
    }
  }
}