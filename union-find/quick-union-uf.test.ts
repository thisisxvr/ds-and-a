import QuickUnion from "./quick-union-uf"

describe('A Quick Find algorithm', () => {
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
    })

    it('find the root on a simple tree', () => {
      expect(qu.connected(3, 4)).toEqual(true)
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
  })
})
