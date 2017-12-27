export default class StackLinkedList<T> {
  private first: Node<T> | null

  constructor() {
    // tslint:disable-next-line:no-null-keyword
    this.first = null
  }

  isEmpty(): boolean { return this.first === null }

  push(newItem: T) {
    const oldFirst = this.first
    const first = new Node<T>(newItem)
    first.next = oldFirst
    this.first = first
  }

  pop(): T | null {
    // tslint:disable-next-line:no-null-keyword
    if (this.isEmpty()) { return null }

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