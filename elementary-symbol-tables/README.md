# Elementary Symbol Tables
Key-value pair abstraction:
- *Insert* a value with specified key.
- Given a key, *search* for the corresponding value.

### Conventions
- Values are not `null`.
- Method `get()` returns `null` if key not present.
- Method `put()` overwrites old value with new value.

## Implementations
### Linked List
- Data structure: Maintain an (unordered) linked list of key-value pairs.
- *Search*: Scan through all keys until find a match.
- *Insert*: Scan through all keys until find a match; if no match add to front.

#### Performance
- Worst-case cost: Search: N, Insert: N
- Avergage case cost: Search: N / 2, Insert: N

### Binary Search
- Data structure. Maintain an ordered array of key-value pairs.
- Rank helper function. How many keys < *k* ?
- Problem: To insert, need to shift all greater keys over.

#### Performance
- Worst-case cost: Search: log N, Insert: N
- Avergage case cost: Search: log N, Insert: N / 2

