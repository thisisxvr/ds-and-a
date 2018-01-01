export default class QueueArray<T> {
  private head: number
  private tail: number
  private _data: T[]
  get data() { return this._data }

  constructor() {
    this.head = 0, this.tail = 0
    this._data = new Array<T>(2)
  }

  isEmpty(): boolean { return this.head === this.tail }

  enqueue(item: T) {
    if (this.tail === this.data.length) { this.resize(this.data.length * 2) } // Double the size of array when full.
    this.data[this.tail++] = item
  }

  dequeue(): T {
    if (this.isEmpty()) { throw new RangeError("Queue empty") }
    const item = this.data[this.head]
    this.data[this.head++] = undefined!
    // Halve the array size when one-quarter full.
    if ((this.data.length / (this.tail - this.head) % 4) === 0) { this.resize(this.data.length / 2) }
    return item
  }

  private resize(newSize: number) {
    this.tail -= this.head  // Set the tail to be the number of items in array.
    const copy = new Array<T>(newSize)
    for (let i = 0; i < this.tail; i++) { copy[i] = this.data[this.head++] }  // Copy over existing items into new array.
    this._data = copy
    this.head = 0
  }
}