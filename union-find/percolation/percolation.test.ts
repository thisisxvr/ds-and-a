import { Percolation, ISite } from './percolation'

xdescribe('A Percolation system', () => {
  let system: Percolation
  beforeEach(() => { system = new Percolation(5) })

  it('throws an error for an invalid initializer', () => {
    const initError = () => { system = new Percolation(-1) }
    expect(initError).toThrow(RangeError)
  })

  describe('initializes...', () => {
    it('with a square grid', () => {
      function isSquare(grid: ISite[][]): boolean {
        const gridHeight = grid.length
        for (let i = 0; i < gridHeight; i++) {
          if (grid[i].length !== gridHeight) { return false }
        }
        return true
      }

      expect(isSquare(system.grid)).toBe(true)
    })

    it('with a grid whose elements are named from 0 to (N^2)-1', () => {
      expect(system.grid).toEqual([[{index: 0, isOpen: false}, {index: 1, isOpen: false}, {index: 2, isOpen: false}, {index: 3, isOpen: false}, {index: 4, isOpen: false}], [{index: 5, isOpen: false}, {index: 6, isOpen: false}, {index: 7, isOpen: false}, {index: 8, isOpen: false}, {index: 9, isOpen: false}], [{index: 10, isOpen: false}, {index: 11, isOpen: false}, {index: 12, isOpen: false}, {index: 13, isOpen: false}, {index: 14, isOpen: false}], [{index: 15, isOpen: false}, {index: 16, isOpen: false}, {index: 17, isOpen: false}, {index: 18, isOpen: false}, {index: 19, isOpen: false}], [{index: 20, isOpen: false}, {index: 21, isOpen: false}, {index: 22, isOpen: false}, {index: 23, isOpen: false}, {index: 24, isOpen: false}]])
    })

    it('with a Quick Union algorithm that has a top row connected to a virtual top site, and a bottom row connected to a virtual bottom site', () => {
      expect(system.sites.id).toEqual([26, 26, 26, 26, 26, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 25, 25, 25, 25, 25, 25, 26])
    })

    it('with a Quick Union algorithm that has 2 trees at two virtual sites', () => {
      expect(system.sites.sz).toEqual([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6, 6])
    })
  })

  describe('can tell site vacancy for...', () => {
    let system: Percolation
    beforeEach(() => { system = new Percolation(5) })

    it('a 5 by 5 grid that is fully blocked', () => {
      const gridDimension = system.grid.length
      for (let i = 1; i <= gridDimension; i++) {
        for (let j = 1; j <= gridDimension; j++) {
          expect(system.isOpen(i, j)).toBe(false)
        }
      }
    })

    it('a 5 by 5 grid that is partially blocked', () => {
      system.open(1, 1)
      system.open(1, 2)
      system.open(1, 4)
      system.open(2, 4)
      system.open(3, 2)
      system.open(3, 4)
      system.open(3, 5)

      expect(system.isOpen(1, 1)).toBe(true)
      expect(system.isOpen(1, 2)).toBe(true)
      expect(system.isOpen(1, 4)).toBe(true)
      expect(system.isOpen(2, 4)).toBe(true)
      expect(system.isOpen(3, 2)).toBe(true)
      expect(system.isOpen(3, 4)).toBe(true)
      expect(system.isOpen(3, 5)).toBe(true)
      expect(system.isOpen(1, 3)).toBe(false)
      expect(system.isOpen(1, 5)).toBe(false)
    })

    it('a 5 by 5 grid that is fully open', () => {
      const gridDimension = system.grid.length
      // Open all sites
      for (let i = 1; i <= gridDimension; i++) {
        for (let j = 1; j <= gridDimension; j++) {
          system.open(i, j)
        }
      }

      // Verify sites are open
      for (let i = 1; i <= gridDimension; i++) {
        for (let j = 1; j <= gridDimension; j++) {
          expect(system.isOpen(i, j)).toBe(true)
        }
      }
    })
  })

  describe('can tell when a site is full...', () => {
    let system: Percolation
    beforeEach(() => {
      system = new Percolation(5)
      system.open(1, 1)
      system.open(1, 2)
      system.open(1, 4)
    })

    it('for a small grid', () => {
      expect(system.isFull(1, 1)).toEqual(true)
      expect(system.isFull(1, 2)).toEqual(true)
      expect(system.isFull(1, 4)).toEqual(true)
    })
  })

  describe('returns the number of open sites...', () => {
    let system: Percolation
    beforeEach(() => {
      system = new Percolation(5)
      system.open(1, 1)
      system.open(1, 2)
      system.open(1, 4)
      system.open(2, 4)
      system.open(3, 2)
      system.open(3, 4)
      system.open(3, 5)
    })

    it('for a small grid', () => {
      expect(system.numberOfOpenSites()).toBe(7)
    })

    it('for a fully open grid', () => {
      const gridDimension = system.grid.length
      // Open all sites
      for (let i = 1; i <= gridDimension; i++) {
        for (let j = 1; j <= gridDimension; j++) {
          system.open(i, j)
        }
      }

      expect(system.numberOfOpenSites()).toBe(25)
    })
  })

  describe('correctly asserts percolation...', () => {
    beforeEach(() => {
      system.open(1, 1)
      system.open(1, 2)
      system.open(1, 4)
      system.open(2, 4)
      system.open(3, 2)
      system.open(3, 4)
      system.open(3, 5)
      system.open(4, 1)
      system.open(4, 3)
      system.open(5, 1)
      system.open(5, 2)
      system.open(5, 4)
      system.open(5, 5)
    })

    it('in a system that does not percolate', () => {
      expect(system.percolates()).toBe(false)
    })

    it('and in one that does', () => {
      system.open(4, 4)
      expect(system.percolates()).toBe(true)
    })
  })
})
