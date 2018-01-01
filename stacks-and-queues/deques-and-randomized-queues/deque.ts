class Node<T> {
  public previous: Node<T> | null
  public value: T
  public next: Node<T> | null
  constructor(val: T) { this.value = val, this.previous = null, this.next = null }
}

export default class Deque<T> {
  private head: Node<T> | null
  private tail: Node<T> | null
  private _count: number
  get count() { return this._count }

  constructor() {
    this.head = null, this.tail = null, this._count = 0
  }

  /** Is the deque empty? */
  isEmpty(): boolean { return this.count === 0 }

  /** Returns the number of items on the deque.*/
  size(): number { return this._count }

  /** Add an item to the front. */
  addFirst(item: T) {
    if (item === null || undefined) { throw new TypeError() }

    const newNode = new Node<T>(item)

    if (this.isEmpty()) {
      this.head = newNode
      this.tail = newNode
    } else {
      const oldHead = this.head
      oldHead!.next = newNode
      newNode.previous = oldHead
      this.head = newNode
    }

    this._count++
  }

  /** Add an item to the end. */
  addLast(item: T) {
    if (item === null || undefined) { throw new TypeError() }

    const newNode = new Node<T>(item)

    if (this.isEmpty()) {
      this.tail = newNode
      this.head = newNode
    } else {
      const oldTail = this.tail
      oldTail!.previous = newNode
      newNode.next = oldTail
      this.tail = newNode
    }

    this._count++
  }

  /** Remove and return the item from the front. */
  removeFirst(): T {
    if (this.isEmpty()) { throw new Error('Deque is empty.') }
    const item = this.head!
    const newHead = this.head!.previous

    if (newHead) {
      this.head = newHead
      newHead.next = null
    } else {
      this.tail = null
      this.head = null
    }

    this._count--
    return item.value
  }

  /** Remove and return the item from the end. */
  removeLast(): T {
    if (this.isEmpty()) { throw new Error('Deque is empty.') }
    const item = this.tail!
    const newTail = this.tail!.next

    if (newTail) {
      this.tail = newTail
      newTail.previous = null
    } else {
      this.tail = null
      this.head = null
    }

    this._count--
    return item.value
  }

  // Iterator
  [Symbol.iterator](): IterableIterator<T | null> { return this }

  next(): IteratorResult<T | null> {
    if (this.isEmpty()) {
      return { done: true, value: null }
    } else {
      return { done: false, value: this.removeLast() }
    }
  }
}