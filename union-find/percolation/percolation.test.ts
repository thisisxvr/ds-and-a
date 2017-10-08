import Percolation from './percolation'

describe('A percolation system', () => {
  let system: Percolation
  beforeEach(() => { system = new Percolation(5) })

  describe('initializes...', () => {
    it('with a square grid', () => {
      function isSquare(grid: number[][]): boolean {
        const gridHeight = grid.length
        for (let i = 0; i < gridHeight; i++) {
          if (grid[i].length !== gridHeight) { return false }
        }
        return true
      }

      expect(isSquare(system.grid)).toBe(true)
    })

    it('with a grid whose elements are named from 0 to (N^2)-1', () => {
      expect(system.grid).toEqual([[0, 1, 2, 3, 4],
      [5, 6, 7, 8, 9],
      [10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19],
      [20, 21, 22, 23, 24]])
    })

    it('with a Quick Union algorithm that has no connections', () => {
      expect(system.sites.id).toBe([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24])
    })

    it('with a Quick Union algorithm that has no trees', () => {
      expect(system.sites.sz).toBe([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
    })
  })

  describe('can tell site vacancy for...', () => {
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
      expect(system.isOpen(0, 2)).toBe(false)
      expect(system.isOpen(0, 4)).toBe(false)
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
      expect(system.percolates).toBe(false)
    })

    it('and in one that does', () => {
      system.open(4, 4)
      expect(system.percolates).toBe(true)
    })
  })
})
