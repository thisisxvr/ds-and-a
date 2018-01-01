import QueueArray from './queue-array'

describe('An Array implementation of a Queue should', () => {
  let queue: QueueArray<number>

  it('work with any data type', () => {
    expect(new QueueArray<string>()).toBeInstanceOf(QueueArray)
    expect(new QueueArray<number>()).toBeInstanceOf(QueueArray)
    expect(new QueueArray<boolean>()).toBeInstanceOf(QueueArray)
    expect(new QueueArray<object>()).toBeInstanceOf(QueueArray)
  })

  it('verify that it is empty', () => {
    const stack = new QueueArray<string>()
    expect(stack.isEmpty()).toBeTruthy()
  })

  it('accept multiple items in succession', () => {
    queue = new QueueArray<number>(3)
    queue.enqueue(9)
    queue.enqueue(8)
    queue.enqueue(7)
  })

  it('double its data structure when full', () => {
    expect(queue.data.length).toBe(3)
    queue.enqueue(6)
    expect(queue.data.length).toBe(6)
  })

  it('halve the array size when a quarter full', () => {
    expect(queue.dequeue()).toBe(9)
    expect(queue.data.length).toBe(3)
  })

  it('dequeue items in FIFO order', () => {
    expect(queue.dequeue()).toBe(8)
    expect(queue.dequeue()).toBe(7)
    expect(queue.dequeue()).toBe(6)
  })

  it('throw an error when empty and dequeued', () => {
    const error = () => { queue.dequeue() }
    expect(error).toThrow(RangeError)
  })

  it('continue to operate as expected', () => {
    queue.enqueue(1)
    queue.enqueue(2)
    queue.enqueue(3)
    expect(queue.dequeue()).toBe(1)
    expect(queue.dequeue()).toBe(2)
    expect(queue.dequeue()).toBe(3)
    const error = () => { queue.dequeue() }
    expect(error).toThrow(RangeError)
  })
})