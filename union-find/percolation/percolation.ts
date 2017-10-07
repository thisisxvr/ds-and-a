import * as UnionFind from '../weighted-quick-union-path-compressed'

export default class Percolation {

  private _grid: number[]
  get grid() { return this._grid }

  // Creates an n-by-n grid, with all sites blocked
  constructor(n: number) {}

  // Open site if not already open
  open(row: number, column: number): void {}

  // Is site open?
  isOpen(row: number, column: number): boolean {}

  // Is site full?
  isFull(row: number, column: number): boolean {}

  // Returns the number of open sites
  numberOfOpenSites(): number {}

  // Does the system percolate?
  percolates(): boolean {}

}