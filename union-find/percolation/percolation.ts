import UnionFind from '../weighted-quick-union-path-compressed'

interface ISite {
  index: number
  isOpen: boolean
}

export default class Percolation {
  private _sites: UnionFind
  private _grid: ISite[][]
  get grid() { return this._grid }
  get sites() { return this._sites }

  // Creates an n-by-n grid, with all sites blocked
  constructor(n: number) {
    if (n <= 0) { throw new RangeError('A percolation system must be sized to a positive integer.') }

    let name = 0
    this._grid = []
    for (let i = 0; i < n; i++) {
      while (name < (n ** 2)) {
        const row = []
        for (let j = 0; j < n; j++) {
          row[j] = { index: name, isOpen: false }
          name++
        }
        this._grid[i] = row
      }
    }

    this._sites = new UnionFind(n ** 2)
  }

  // Open site if not already open
  open(row: number, column: number): void {
    if (this.indexOutsideRange(row, column)) {
      throw new RangeError(`Row and column indicies must be between 1 and ${this._grid.length}`)
    }

    if (this.isOpen(row, column)) { return }

    this.meetTheNeighbours(row, column)
    const site = this._grid[row--][column--]
    site.isOpen = true
  }

  // Is site open?
  isOpen(row: number, column: number): boolean {
    if (this.indexOutsideRange(row, column)) {
      throw new RangeError(`Row and column indicies must be between 1 and ${this._grid.length}`)
    }

    const site = this._grid[row--][column--]
    return site.isOpen
  }

  // Is site full?
  isFull(row: number, column: number): boolean {
    if (this.indexOutsideRange(row, column)) {
      throw new RangeError(`Row and column indicies must be between 1 and ${this._grid.length}`)
    }

    const site = this._grid[row--][column--]

    return false
  }

  // Returns the number of open sites
  numberOfOpenSites(): number {}

  // Does the system percolate?
  percolates(): boolean {}

  private meetTheNeighbours(row: number, column: number): void {
    const siteRow = row - 1
    const siteColumn = column - 1
    const site = this._grid[siteRow][siteColumn]

    let topSite: ISite
    let rightSite: ISite
    let bottomSite: ISite
    let leftSite: ISite

    // Get the neighbours and connect them
    if (row > 1) {
      topSite = this._grid[siteRow - 1][siteColumn]
      if (topSite.isOpen) { this._sites.union(site.index, topSite.index) }
    }
    if (row < this._grid.length) {
      bottomSite = this._grid[siteRow + 1][siteColumn]
      if (bottomSite.isOpen) { this._sites.union(site.index, bottomSite.index) }
    }
    if (column > 1) {
      leftSite = this._grid[siteRow][siteColumn - 1]
      if (leftSite.isOpen) { this._sites.union(site.index, leftSite.index) }
    }
    if (column < this._grid.length) {
      rightSite = this._grid[siteRow][siteColumn + 1]
      if (rightSite.isOpen) { this._sites.union(site.index, rightSite.index) }
    }
  }

  private indexOutsideRange(row: number, column: number): boolean {
    return row < 1 || row > this._grid.length || column < 1 || column > this._grid.length
  }
}