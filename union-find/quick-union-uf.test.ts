import QuickUnion from "./quick-union-uf"

xdescribe('A Quick Find algorithm', () => {
  let qu: QuickUnion

  beforeEach(() => qu = new QuickUnion(10))

  describe('initializes...', () => {
    it('with an array sized to the argument', () => {
      expect(qu.id.length).toBe(10)
    })

    it('with an array that has values equal to it\'s index', () => {
      expect(qu.id).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
    })
  })

  describe('uses a tree structure to...', () => {
    beforeEach(() => {
      qu.union(3, 4)
      qu.union(4, 9)
      qu.union(2, 9)
      qu.union(5, 6)
    })

    it('find the root on a simple tree', () => {
      expect(qu.connected(3, 9)).toEqual(true)
    })

    it('represent connections', () => {
      expect(qu.id).toEqual([0, 1, 9, 4, 9, 6, 6, 7, 8, 9])
    })

    it('return true when two elements are in the same component'), () => {
      expect(qu.connected(3, 9)).toEqual(true)
    }

    it('...and false when they\'re not', () => {
      expect(qu.connected(3, 5)).toEqual(false)
    })

    it('merge components', () => {
      qu.union(3, 5)
      expect(qu.id).toEqual([0, 1, 9, 4, 9, 6, 6, 7, 8, 6])
    })

    it('connect 10 components into one large tree', () => {
      const qu = new QuickUnion(10)
      qu.union(6, 5)
      qu.union(5, 0)
      qu.union(2, 1)
      qu.union(7, 1)
      qu.union(1, 0)
      qu.union(4, 3)
      qu.union(6, 9)
      qu.union(8, 3)
      qu.union(8, 1)

      expect(qu.id).toEqual([9, 0, 1, 9, 3, 0, 5, 1, 3, 9])
    })
  })
})
