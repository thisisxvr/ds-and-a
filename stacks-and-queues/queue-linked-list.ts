export default class QueueLinkedList<T> {
  private first: Node<T> | null
  private last: Node<T> | null

  constructor() {
    this.first = null
    this.last = null
  }

  isEmpty(): boolean { return this.first === null }

  enqueue(item: T) {
    const oldlast = this.last
    this.last = new Node(item)
    this.last.next = null
    if (this.isEmpty()) { this.first = this.last }
    else { oldlast!.next = this.last }
  }

  dequeue(): T | null {
    if (this.isEmpty()) { return this.last = null }
    const item = this.first!.item
    this.first = this.first!.next
    return item
  }
}

class Node<T> {
  public item: T
  public next: Node<T> | null
  constructor(newItem: T) { this.item = newItem }
}