import RandomizedQueue from './randomized-queue'

xdescribe('A Randomized Queue should', () => {
  const rqItems = ['the', 'quick', 'brown', 'fox', 'jumps', 'over', 'the', 'lazy', 'dog']
  const rq = new RandomizedQueue<string>()

  it('work with any data type', () => {
    expect(new RandomizedQueue<number>()).toBeInstanceOf(RandomizedQueue)
    expect(new RandomizedQueue<boolean>()).toBeInstanceOf(RandomizedQueue)
    expect(new RandomizedQueue<object>()).toBeInstanceOf(RandomizedQueue)
  })

  it('verify that it is empty', () => {
    expect(rq.size()).toBe(0)
    expect(rq.isEmpty()).toBeTruthy()
  })

  it('enqueue multiple items in succession', () => {
    rq.enqueue('the')
    rq.enqueue('quick')
    rq.enqueue('brown')
    rq.enqueue('fox')
    rq.enqueue('lazy')
    rq.enqueue('dog')
    expect(rq.size()).toBe(6)
  })

  it('remove an item at random and return it', () => {
    expect(rqItems).toContain(rq.dequeue())
    expect(rq.size()).toBe(5)
    expect(rq.isEmpty()).toBeFalsy()
  })

  it('provide a sample without removing it', () => {
    expect(rqItems).toContain(rq.sample())
    expect(rq.size()).toBe(5)
  })

  it('throw when passed a null argument', () => {
    expect(() => { rq.enqueue(null!) }).toThrow(TypeError)
  })

  it('iterate over its contents until empty', () => {
    for (const item of rq) {
      expect(rqItems).toContain(item)
    }
  })

  it('throw when dequeud or sampled and empty', () => {
    expect(rq.size()).toBe(0)
    expect(rq.isEmpty()).toBeTruthy()

    expect(() => { rq.dequeue() }).toThrow()
    expect(() => { rq.sample() }).toThrow()
  })
})