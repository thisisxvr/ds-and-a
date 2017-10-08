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
      expect(system.connectivity.id).toBe([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24])
    })

    it('with a Quick Union algorithm that has no trees', () => {
      expect(system.connectivity.sz).toBe([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
    })
  })

  describe('can tell site vacancy for...', () => {
    it('a 5 by 5 grid that is fully blocked', () => {
      const gridDimension = system.grid.length
      for (let i = 0; i < gridDimension; i++) {
        for (let j = 0; j < gridDimension; j++) {
          expect(system.isOpen(i, j)).toBe(false)
        }
      }
    })

    it('a 5 by 5 grid that is partially blocked', () => {
      system.open(0, 0)
      system.open(0, 1)
      system.open(0, 3)
      system.open(1, 3)
      system.open(2, 1)
      system.open(2, 3)
      system.open(2, 4)

      expect(system.isOpen(0, 0)).toBe(true)
      expect(system.isOpen(0, 1)).toBe(true)
      expect(system.isOpen(0, 2)).toBe(false)
      expect(system.isOpen(0, 3)).toBe(true)
      expect(system.isOpen(0, 4)).toBe(false)
      expect(system.isOpen(1, 1)).toBe(true)
      expect(system.isOpen(2, 1)).toBe(true)
      expect(system.isOpen(2, 3)).toBe(true)
      expect(system.isOpen(2, 4)).toBe(true)
    })

    it('a 5 by 5 grid that is fully open', () => {
      const gridDimension = system.grid.length
      // Open all sites
      for (let i = 0; i < gridDimension; i++) {
        for (let j = 0; j < gridDimension; j++) {
          system.open(i, j)
        }
      }

      // Verify sites are open
      for (let i = 0; i < gridDimension; i++) {
        for (let j = 0; j < gridDimension; j++) {
          expect(system.isOpen(i, j)).toBe(true)
        }
      }
    })
  })

  describe('can tell when a site is full...', () => {
    let system: Percolation
    beforeEach(() => {
      system = new Percolation(5)
      system.open(0, 0)
      system.open(0, 1)
      system.open(0, 3)
    })

    it('for a small grid', () => {
      expect(system.isFull(0, 0)).toEqual(true)
      expect(system.isFull(0, 1)).toEqual(true)
      expect(system.isFull(0, 3)).toEqual(true)
    })
  })

  describe('returns the number of open sites...', () => {
    let system: Percolation
    beforeEach(() => {
      system = new Percolation(5)
      system.open(0, 0)
      system.open(0, 1)
      system.open(0, 3)
      system.open(1, 3)
      system.open(2, 1)
      system.open(2, 3)
      system.open(2, 4)
    })

    it('for a small grid', () => {
      expect(system.numberOfOpenSites()).toBe(7)
    })

    it('for a fully open grid', () => {
      const gridDimension = system.grid.length
      // Open all sites
      for (let i = 0; i < gridDimension; i++) {
        for (let j = 0; j < gridDimension; j++) {
          system.open(i, j)
        }
      }

      expect(system.numberOfOpenSites()).toBe(25)
    })
  })

  describe('check for percolation', () => {
    beforeEach(() => {
      system.open(0, 0)
      system.open(0, 1)
      system.open(0, 3)
      system.open(1, 3)
      system.open(2, 1)
      system.open(2, 3)
      system.open(2, 4)
      system.open(3, 0)
      system.open(3, 2)
      system.open(4, 0)
      system.open(4, 1)
      system.open(4, 3)
      system.open(4, 4)
    })

    it('in a system that does not percolate', () => {
      expect(system.percolates).toBe(false)
    })

    it('... and when it does percolate', () => {
      system.open(3, 3)
      expect(system.percolates).toBe(true)
    })
  })
})
