
// Symbol table that uses binary search to maintain an ordered array of key-value pairs.
export class OrderedST<Key, Value> {
  private keys: Key[]
  private vals: Value[]

  constructor() { this.keys = new Array<Key>(), this.vals = new Array<Value>() }

  /** Puts key-value pair into the table (remove key from table if value is null). */
  put(key: Key, value: Value) {
    if (value === null) { this.delete(key); return }
    if (this.isEmpty()) { this.keys[0] = key; this.vals[0] = value; return }

    const idx = this.rank(key)

    // Key exists in table.
    if (idx < this.keys.length && this.keys[idx] === key) { this.vals[idx] = value; return }

    // Move larger keys over.
    for (let i = this.keys.length; i > idx; i--) {
      this.keys[i] = this.keys[i - 1]
      this.vals[i] = this.vals[i - 1]
    }

    this.vals[idx] = value
    this.keys[idx] = key
  }

  /** Returns the value paired with key (null if key is absent). */
  get(key: Key): Value | null {
    if (this.isEmpty()) { return null }

    const idx = this.rank(key)
    return (idx < this.keys.length && this.keys[idx] === key) ? this.vals[idx] : null
  }

  /** How many keys smaller than the given key?. */
  private rank(key: Key): number {
    let lo = 0, hi = this.keys.length - 1

    while (lo <= hi) {
      const mid = Math.floor(lo + (hi - lo) / 2)
      if (this.keys[mid] > key) { lo = mid + 1 }
      else if (key > this.keys[mid]) { hi = mid - 1 }
      else { return mid }
    }

    return lo
  }

  /** Removes key (and its value) from table. */
  delete(key: Key) {
    if (this.isEmpty()) { throw new RangeError('Symbol Table is empty.') }

    const idx = this.rank(key)

    // If key not in table.
    if (idx === this.keys.length || this.keys[idx] !== key) { return }

    for (let i = idx; i < this.keys.length - 1; i++)  {
      this.keys[i] = this.keys[i + 1]
      this.vals[i] = this.vals[i + 1]
    }

    this.keys.pop()
    this.vals.pop()
  }

  /** Is there a value paired with key? */
  contains(key: Key): boolean {
    if (this.isEmpty()) { return false }
    return this.get(key) !== null
  }

  /** Is the table empty? */
  isEmpty(): boolean { return this.keys.length === 0 }

  /** Number of key-value pairs in the table */
  size(): number { return this.keys.length }
}
