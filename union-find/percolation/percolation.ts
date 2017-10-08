import UnionFind from '../weighted-quick-union-path-compressed'

export interface ISite {
  index: number
  isOpen: boolean
}

export class Percolation {
  private _virtualTop: number
  private _virtualBtm: number
  private _sites: UnionFind
  private _grid: ISite[][]
  get grid() { return this._grid }
  get sites() { return this._sites }

  // Creates an n-by-n grid, with all sites blocked
  constructor(n: number) {
    if (n <= 0) { throw new RangeError('A percolation system must be sized to a positive integer.') }

    let name = 0
    this._grid = []
    while (name < (n ** 2)) {
      for (let i = 0; i < n; i++) {
        const row = []
        for (let j = 0; j < n; j++) {
          row[j] = { index: name, isOpen: false }
          name++
        }
        this._grid[i] = row
      }
    }

    // Intialize the algorithm with N^2 objects plus two for the virtual sites
    this._sites = new UnionFind((n ** 2) + 2)

    // Arbitrarily set virtual top site to be the last element and virtualbottom second to last
    this._virtualTop = this._sites.id.length - 1
    this._virtualBtm = this._sites.id.length - 2

    // Connect virtual top site to the top row and virtual bottom site to bottom row
    const topRow = this._grid[0]
    const btmRow = this._grid[this._grid.length - 1]

    for (let i = 0, len = topRow.length; i < len; i++) {
      this._sites.union(this._virtualTop, topRow[i].index)
    }

    for (let i = 0, len = btmRow.length; i < len; i++) {
      this._sites.union(this._virtualBtm, btmRow[i].index)
    }
  }

  // Open site if not already open
  open(row: number, column: number): void {
    if (this.indexOutsideRange(row, column)) {
      throw new RangeError(`Row and column indicies must be between 1 and ${this._grid.length}`)
    }

    const site = this._grid[row - 1][column - 1]
    if (site.isOpen) { return }
    site.isOpen = true

    this.meetTheNeighbours(row, column)
  }

  // Is site open?
  isOpen(row: number, column: number): boolean {
    if (this.indexOutsideRange(row, column)) {
      throw new RangeError(`Row and column indicies must be between 1 and ${this._grid.length}`)
    }

    const site = this._grid[--row][--column]
    return site.isOpen
  }

  // Is site full?
  isFull(row: number, column: number): boolean {
    if (this.indexOutsideRange(row, column)) {
      throw new RangeError(`Row and column indicies must be between 1 and ${this._grid.length}`)
    }

    const site = this._grid[--row][--column]
    if (!site.isOpen) { return false }
    if (this._sites.connected(site.index, this._virtualTop)) { return true }
    return false
  }

  // Returns the number of open sites
  numberOfOpenSites(): number {
    let count = 0
    for (let i = 0, len = this._grid.length; i < len; i++) {
      for (let j = 0; j < len; j++) {
        if (this._grid[i][j].isOpen) { count++ }
      }
    }
    return count
  }

  // Does the system percolate?
  percolates(): boolean {
    return this._sites.connected(this._virtualTop, this._virtualBtm)
  }

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