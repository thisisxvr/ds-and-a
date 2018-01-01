class Node<T> {
  public previous: Node<T> | null
  public value: T
  public next: Node<T> | null
  constructor(val: T) { this.value = val }
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
  isEmpty(): boolean {
    //
  }

  /** Returns the number of items on the deque.*/
  size(): number {
    //
  }

  /** Add an item to the front. */
  addFirst(item: T) {
    //
  }

  /** Add an item to the end. */
  addLast(item: T) {
    //
  }

  /** Remove and return the item from the front. */
  removeFirst(): T {
    //
  }

  /** Remove and return the item from the end. */
  removeLast(): T {
    //
  }

  // Iterator
}