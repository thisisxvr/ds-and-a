import WeightedQuickUnion from './weighted-quick-union'

xdescribe('A Weighted Quick Union algorithm', () => {
  let wqu: WeightedQuickUnion
  beforeEach(() => { wqu = new WeightedQuickUnion(10) })

  describe('initializes...', () => {
    it('with an array sized to the argument', () => {
      expect(wqu.id.length).toBe(10)
    })

    it('with an id array that has values equal to it\'s index', () => {
      expect(wqu.id).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
    })

    it('with a sz array that lists the count of elements at that node', () => {
      expect(wqu.sz).toEqual([1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
    })
  })

  describe('uses a tree structure to...', () => {
    beforeEach(() => {
      wqu.union(3, 4)
      wqu.union(4, 9)
      wqu.union(2, 9)
      wqu.union(5, 6)
    })

    it('find the root on a simple tree', () => {
      expect(wqu.connected(3, 9)).toEqual(true)
    })

    it('represent connections', () => {
      expect(wqu.id).toEqual([0, 1, 3, 3, 3, 5, 5, 7, 8, 3])
    })

    it('return true when two elements are in the same component', () => {
      expect(wqu.connected(3, 9)).toEqual(true)
    })

    it('...and false when they\'re not', () => {
      expect(wqu.connected(3, 5)).toEqual(false)
    })

    it('merge components', () => {
      wqu.union(3, 5)
      expect(wqu.connected(3, 5)).toEqual(true)
    })

    it('connect 10 components into one large tree', () => {
      const wqu = new WeightedQuickUnion(10)
      wqu.union(6, 5)
      wqu.union(5, 0)
      wqu.union(2, 1)
      wqu.union(7, 1)
      wqu.union(1, 0)
      wqu.union(4, 3)
      wqu.union(6, 9)
      wqu.union(8, 3)
      wqu.union(8, 1)

      expect(wqu.id).toEqual([6, 2, 2, 4, 2, 6, 2, 2, 4, 2])
    })
  })

  describe('uses weights to...', () => {
    let wqu: WeightedQuickUnion

    beforeEach(() => {
      wqu = new WeightedQuickUnion(10)
      // Smaller tree with 4 elements
      wqu.union(1, 2)
      wqu.union(2, 3)
      wqu.union(3, 0)
      // Larger tree with 6 elements
      wqu.union(4, 6)
      wqu.union(5, 7)
      wqu.union(6, 7)
      wqu.union(8, 9)
      wqu.union(4, 9)
    })

    it('avoid tall trees', () => {
      expect(wqu.id).toEqual([1, 1, 1, 1, 4, 4, 4, 5, 4, 8])
    })

    it('keep track of the size of trees', () => {
      expect(wqu.sz).toEqual([1, 4, 1, 1, 6, 2, 1, 1, 2, 1])
    })
  })
})