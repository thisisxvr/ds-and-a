class QuickFindUF {
  private _id: number[]

  get id(): number[] { return this._id }

  constructor(size: number) {
    if (size < 0) { throw new RangeError("Size must be a positive integer.") }
    this._id = new Array(Math.round(size))

    // Initializes with value === index (N array accesses)
    for (let i = 0; i < size; i++) {
      this._id[i] = i
    }
  }

  // Check whether p and q are in the same component (2 array accesses)
  connected(p: number, q: number): boolean {
    return this._id[p] === this._id[q]
  }

  union(p: number, q: number): void {
    const pID = this._id[p]
    const qID = this._id[q]

    // Change all entries with id[p] to id[q] (at most 2N + 2 array accesses)
    for (let i = 0; i < this._id.length; i++) {
      if (this._id[i] === pID) { this._id[i] = qID }
    }
  }
}

export default QuickFindUF
