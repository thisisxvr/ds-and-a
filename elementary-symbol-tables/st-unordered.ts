
// Symbol table that uses a linked list to maintain an unordered array of key, value pairs.
export class STUnordered<Key, Value> {
  private first: INode<Key, Value>
  private n: number
  private pointer = this.first

  constructor() { this.n = 0, this.first = null! }

  /** Puts key-value pair into the table (remove key from table if value is null). */
  put(key: Key, value: Value) {
    if (value === null) { this.delete(key); return }

    if (this.first === null) {
      this.first = new INode(key, value)
      this.n++
      return
    }

    let node = this.first
    while (true) {
      if (node.key === key) {
        node.value = value
        break
      }

      if (node.next === null) {
        const newFirst = new INode<Key, Value>(key, value)
        newFirst.next = this.first
        this.first = newFirst
        this.n++
        break
      }

      node = node.next!
    }
  }

  /** Returns the value paired with key (null if key is absent). */
  get(key: Key): Value | null {
    if (this.isEmpty()) { throw new RangeError('Symbol Table is empty.') }

    let node = this.first
    while (true) {
      if (node.key === key) { return node.value }
      if (node.next === null) { return null }
      node = node.next
    }
  }

  /** Removes key (and its value) from table. */
  delete(key: Key) {
    if (this.isEmpty()) { throw new RangeError('Symbol Table is empty.') }

    let node = this.first, previousNode = null
    while (true) {
      if (node.key === key) {
        const nextNode = node.next
        if (node === this.first && nextNode !== null) { this.first = nextNode }  // First node matches.
        else if (previousNode !== null && nextNode !== null) { previousNode.next = nextNode }  // Any other node matches.
        else if (nextNode === null && previousNode !== null) { previousNode.next = null! }  // Last node matches.
        else { this.first = null! }  // Only one node.
        this.n--
      }
      if (node.next === null) { break }
      previousNode = node
      node = node.next
    }
  }

  /** Is there a value paired with key? */
  contains(key: Key): boolean {
    if (this.isEmpty()) { return false }

    let node = this.first
    while (true) {
      if (node.key === key) { return true }
      if (node.next === null) { return false }
      node = node.next
    }
  }

  /** Is the table empty? */
  isEmpty(): boolean { return this.n === 0 }

  /** Number of key-value pairs in the table */
  size(): number { return this.n }
}

class INode<Key, Value> {
  key: Key
  value: Value
  next: INode<Key, Value> | null
  constructor(key: Key, value: Value) { this.key = key, this.value = value, this.next = null }
}
