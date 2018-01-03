class WeightedQuickUnionPathCompressed {
  private _id: number[]
  private _sz: number[] // Maintains a count of the number of objects rooted in a tree

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

  connected(p: number, q: number): boolean {
    return this.root(p) === this.root(q)
  }

  // One-pass variant of path compression:
  // Make every other node in path point to its grandparent (thereby halving path length)
  private root(i: number): number {
    while (i !== this._id[i]) {
      this._id[i] = this._id[this._id[i]]
      i = this._id[i]
    }
    return i
  }
}