// import WeightedQuickUnionPathCompressed from './weighted-quick-union-path-compressed'

xdescribe('A Weighted Quick Union algorithm with Path Compression', () => {
  let wqupc: WeightedQuickUnionPathCompressed
  beforeEach(() => { wqupc = new WeightedQuickUnionPathCompressed(10) })

  describe('initializes...', () => {
    it('with an array sized to the argument', () => {
      expect(wqupc.id.length).toBe(10)
    })

    it('with an id array that has values equal to it\'s index', () => {
      expect(wqupc.id).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
    })

    it('with a sz array that lists the count of elements at that node', () => {
      expect(wqupc.sz).toEqual([1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
    })
  })

  describe('uses a tree structure to...', () => {
    beforeEach(() => {
      wqupc.union(3, 4)
      wqupc.union(4, 9)
      wqupc.union(2, 9)
      wqupc.union(5, 6)
    })

    it('find the root on a simple tree', () => {
      expect(wqupc.connected(3, 9)).toEqual(true)
    })

    it('represent connections', () => {
      expect(wqupc.id).toEqual([0, 1, 3, 3, 3, 5, 5, 7, 8, 3])
    })

    it('return true when two elements are in the same component', () => {
      expect(wqupc.connected(3, 9)).toEqual(true)
    })

    it('...and false when they\'re not', () => {
      expect(wqupc.connected(3, 5)).toEqual(false)
    })

    it('merge components', () => {
      wqupc.union(3, 5)
      expect(wqupc.connected(3, 5)).toEqual(true)
    })

    it('connect 10 components into one large tree', () => {
      const wqupc = new WeightedQuickUnionPathCompressed(10)
      wqupc.union(6, 5)
      wqupc.union(5, 0)
      wqupc.union(2, 1)
      wqupc.union(7, 1)
      wqupc.union(1, 0)
      wqupc.union(4, 3)
      wqupc.union(6, 9)
      wqupc.union(8, 3)
      wqupc.union(8, 1)

      expect(wqupc.id).toEqual([6, 2, 2, 4, 2, 6, 2, 2, 4, 2])
    })
  })

  describe('uses weights + path compression to...', () => {
    let wqupc: WeightedQuickUnionPathCompressed

    beforeEach(() => {
      wqupc = new WeightedQuickUnionPathCompressed(10)
      // Smaller tree with 4 elements
      wqupc.union(1, 2)
      wqupc.union(2, 3)
      wqupc.union(3, 0)
      // Larger tree with 6 elements
      wqupc.union(4, 6)
      wqupc.union(5, 7)
      wqupc.union(6, 5)
      wqupc.union(8, 9)
      wqupc.union(4, 8)
    })

    it('avoid tall trees', () => {
      expect(wqupc.id).toEqual([1, 1, 1, 1, 4, 4, 4, 5, 4, 8])
    })

    it('keep track of the size of trees', () => {
      expect(wqupc.sz).toEqual([1, 4, 1, 1, 6, 2, 1, 1, 2, 1])
    })
  })
})