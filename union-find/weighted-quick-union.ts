export default class WeightedQuickUnion {
  private _id: number[]
  private _sz: number[]

  get id() { return this._id }
  get sz() { return this._sz }

  constructor(size: number) {
    this._id = new Array(size)
    this._sz = new Array(size)
    for (let i = 0; i < size; i++) {
      this._id[i] = i
      this._sz[i] = 1
    }
  }

  // Modifies quick-union to:
  // - Link root of small tree to larger tree
  // - Update the size array
  union(p: number, q: number): void {
    const pRoot = this.root(p)
    const qRoot = this.root(q)
    if (pRoot === qRoot) { return }
    if (this._sz[pRoot] < this._sz[qRoot]) {
      this._id[pRoot] = qRoot
      this._sz[qRoot] += this._sz[pRoot]
    } else {
      this._id[qRoot] = pRoot
      this._sz[pRoot] += this._sz[qRoot]
    }
  }

  // Identical to quick-union
  connected(p: number, q: number): boolean {
    return this.root(p) === this.root(q)
  }

  private root(i: number): number {
    while (i !== this._id[i]) { i = this._id[i] }
    return i
  }
}