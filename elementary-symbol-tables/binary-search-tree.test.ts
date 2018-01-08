import { BST } from "./binary-search-tree"

describe('A Binary Search Tree', () => {
  const bst = new BST<string, number>()

  it('place and retrieve values', () => {
    bst.put('to', 2)
    expect(bst.get('to')).toBe(2)
    bst.put('be', -1)
    expect(bst.get('be')).toBe(-1)
    bst.put('to', 123)
    expect(bst.get('to')).toBe(123)
    bst.put('not', 88)
    expect(bst.get('not')).toBe(88)
  })
})