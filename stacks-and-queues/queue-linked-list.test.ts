import QueueLinkedList from './queue-linked-list'

xdescribe('A Linked List implementation of a Queue should', () => {
  let queue: QueueLinkedList<number>

  it('work with any data type', () => {
    expect(new QueueLinkedList<string>()).toBeInstanceOf(QueueLinkedList)
    expect(new QueueLinkedList<number>()).toBeInstanceOf(QueueLinkedList)
    expect(new QueueLinkedList<boolean>()).toBeInstanceOf(QueueLinkedList)
    expect(new QueueLinkedList<object>()).toBeInstanceOf(QueueLinkedList)
  })

  it('verify that it is empty', () => {
    const queue = new QueueLinkedList<string>()
    expect(queue.isEmpty()).toBeTruthy()
  })

  it('accept multiple items in succession', () => {
    queue = new QueueLinkedList<number>()
    queue.enqueue(9)
    queue.enqueue(8)
    queue.enqueue(7)
  })

  it('dequeue them in FIFO order', () => {
    expect(queue.dequeue()).toBe(9)
    expect(queue.dequeue()).toBe(8)
    expect(queue.dequeue()).toBe(7)
  })

  it('return null when empty', () => {
    expect(queue.dequeue()).toBeNull()
  })

  it('and continue to operate as expected', () => {
    queue.enqueue(1)
    queue.enqueue(2)
    queue.enqueue(3)
    expect(queue.dequeue()).toBe(1)
    expect(queue.dequeue()).toBe(2)
    expect(queue.dequeue()).toBe(3)
    expect(queue.dequeue()).toBeNull()
  })
})