
export class BST<Key, Value> {
  private root: Node<Key, Value>

  constructor() { this.root = null! }

  put(key: Key, value: Value, x?: Node<Key, Value>): Node<Key, Value> | void {
    if (typeof(x) !== 'undefined') {
      if      (x === null)  { return new Node<Key, Value>(key, value) }
      if      (key < x.key) { x.left = this.put(key, value, x.left!)! }
      else if (key > x.key) { x.right = this.put(key, value, x.right!)! }
      else                  { x.value = value }
      return x
    }

    this.root = this.put(key, value, this.root)!
  }

  /** Returns the value associated with the given key, if found. */
  // Cost: Number of compares: 1 + depth of node.
  get(key: Key): Value | null {
    let x = this.root
    while (x !== null) {
      if      (key < x.key) { x = x.left! }
      else if (key > x.key) { x = x.right! }
      else                  { return x.value }
    }
    return null
  }

  delete(key: Key) {
    //
  }

  // Iterator.
}

class Node<Key, Value> {
  key: Key
  value: Value
  left: Node<Key, Value> | null
  right: Node<Key, Value> | null
  constructor(key: Key, value: Value) { this.key = key, this.value = value, this.left = null, this.right = null }
}
