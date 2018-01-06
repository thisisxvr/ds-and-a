import UnorderedMaxPQ from './pq-unordered-array'

xdescribe('An unordered Priority Queue (max)', () => {
  const pq = new UnorderedMaxPQ<number>(10)

  it('returns the highest element', () => {
    for (let i = 0, j = 5; i <= 10; i++, j += 5) { pq.insert(j) }

    expect(pq.delMax()).toBe(55)
  })

  it('returns true when empty', () => {
    const pq = new UnorderedMaxPQ(1)
    pq.insert(1)
    pq.delMax()
    expect(pq.isEmpty()).toBeTruthy()
  })
})