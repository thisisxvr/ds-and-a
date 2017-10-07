export default class QuickUnion {
  private _id: number[]

  get id() { return this._id }

  constructor(size: number) {
    if (size < 0) { throw new RangeError("Size must be a positive integer.") }
    this._id = new Array(Math.round(size))

    // Set id of each object to itself (N array accesses)
    for (let i = 0; i < size; i++) { this._id[i] = i }
  }

  // Change root of p to point to root of q (depth of p and q array accesses)
  union(p: number, q: number): void {
    const pRoot = this.root(p)
    const qRoot = this.root(q)
    this._id[pRoot] = qRoot
  }

  // Check if p and q have same root (depth of p and q array accesses)
  connected(p: number, q: number): boolean {
    return this.root(p) === this.root(q)
  }

  // Chase parent pointers until reach root (depth of i array accesses)
  private root(i: number): number {
    while (i !== this.id[i]) { i = this.id[i] }
    return i
  }
}