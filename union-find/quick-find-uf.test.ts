import QuickFindUF from './quick-find-uf'

describe('A Quick Find algorithm', () => {
  let qf: QuickFindUF

  beforeEach( () => qf = new QuickFindUF(10) )

  describe('initiailizes', () => {
    it('with an array sized to the argument', () => {
      expect(qf.id.length).toBe(10)
    })

    it('with an array that has values equal to it\'s index', () => {
      expect(qf.id).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
    })
  })

  describe('connects', () => {
    it('2 elements, and returns true', () => {
      qf.union(5, 7)
      expect(qf.connected(5, 7)).toBe(true)
      expect(qf.connected(5, 6)).toBe(false)
    })

    it('elements by changing the root id', () => {
      qf.union(4, 5)
      qf.union(0, 9)
      expect(qf.id).toEqual([9, 1, 2, 3, 5, 5, 6, 7, 8, 9])
    })

    it('the same element twice', () => {
      qf.union(4, 5)
      expect(qf.id).toEqual([0, 1, 2, 3, 5, 5, 6, 7, 8, 9])
      qf.union(4, 6)
      expect(qf.id).toEqual([0, 1, 2, 3, 6, 6, 6, 7, 8, 9])
    })

    it('many elements', () => {
      qf.union(4, 5)
      qf.union(6, 0)
      qf.union(3, 1)
      qf.union(8, 2)
      qf.union(7, 9)
      expect(qf.id).toEqual([0, 1, 2, 1, 5, 5, 0, 9, 2, 9])
    })
  })
})