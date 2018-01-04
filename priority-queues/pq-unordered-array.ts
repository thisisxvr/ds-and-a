
export default class UnorderedMaxPQ<T> {
  private data: T[]
  private size: number

  constructor(capacity: number) {
    this.data = new Array<T>(capacity)
    this.size = 0
  }

  isEmpty(): boolean { return this.size === 0 }

  insert(item: T) { this.data[this.size++] = item }

  delMax(): T {
    let max = 0
    // tslint:disable-next-line:prefer-for-of
    for (let i = 1; i < this.size; i++) {
      if (this.data[i] > this.data[max]) { max = i }
    }

    [this.data[max], this.data[--this.size]] = [this.data[this.size], this.data[max]]
    return this.data.pop()!
  }
}