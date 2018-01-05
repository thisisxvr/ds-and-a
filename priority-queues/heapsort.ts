
export class Heap<T> {
  private data: T[]
  constructor(data: T[]) { this.data = data }

  sort(): T[] {
    let n = this.data.length
    // Starting from the bottom, get the first parent (k = n /2)
    for (let k = Math.floor(n / 2); k >= 0; k--) {
      this.sink(k, n)
    }

    n--
    // Take the largest element (at index 0) "off" the array by swapping it with the value at the end
    // then sink the swapped value, bringing the max value to the root, and repeat.
    while (n >= 0) {
      [this.data[0], this.data[n]] = [this.data[n], this.data[0]]
      this.sink(0, --n)
    }

    return this.data
  }

  private sink(k: number, n: number) {
    // Repeat while Parent's key is smaller than one (or both) of its children's.
    while (2 * k <= n) {
      // Swap larger child with parent.
      let j = 2 * k
      if (j < n && this.data[j] < this.data[j + 1]) { j++ }
      if (!(this.data[k] < this.data[j])) { break }
      [this.data[k], this.data[j]] = [this.data[j], this.data[k]]
      k = j
    }
  }
}
