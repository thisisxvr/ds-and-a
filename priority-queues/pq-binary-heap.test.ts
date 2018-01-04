import { BinaryHeapPQ } from "./pq-binary-heap"

describe('A Priority Queue using a Binary Heap', () => {
  const bh = new BinaryHeapPQ<string>()

  it('stores items using a heap', () => {
    const inputData = 'BINARYHEAP'.split('')
    for (const input of inputData) { bh.insert(input) }
    expect(bh.delMax()).toBe('Y')

    const inputData2 = 'QUICKBROWNFOX'.split('')
    for (const input of inputData2) { bh.insert(input) }
    expect(bh.delMax()).toBe('X')

    const bhn = new BinaryHeapPQ<number>()
    const inputData3 = [100, 212, 23, 4, 67, 898, 194]
    for (const input of inputData3) { bhn.insert(input) }
    expect(bhn.delMax()).toBe(898)
  })
})