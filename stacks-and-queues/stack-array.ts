export default class StackArray<T> {
  private pointer: number
  private _data: T[]
  get data() { return this._data }

  constructor(size = 1) {
    this.pointer = 0
    this._data = new Array<T>(size)
  }

  isEmpty(): boolean { return this.pointer === 0 }

  push(item: T) {
    if (this.pointer === this.data.length) { this.resize(this.data.length * 2) } // Double the size of array when full.
    this.data[this.pointer++] = item
  }

  pop(): T {
    if (this.isEmpty()) { throw new RangeError("Stack empty") }
    const item = this.data[--this.pointer]
    // tslint:disable-next-line:no-null-keyword
    this.data[this.pointer] = null!
     // Halve the array size when one-quarter full.
    if (this.pointer > 0 && this.pointer === Math.floor(this.data.length / 4)) { this.resize(this.data.length / 2) }
    return item
  }

  private resize(newSize: number) {
    const copy = new Array<T>(newSize)
    for (let i = 0; i < this.pointer; i++) { copy[i] = this.data[i] }
    this._data = copy
  }
}