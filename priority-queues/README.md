# Priority Queues
Collections: Insert and delete items. Which item to delete?
- Stack: Remove the item most recently added.
- Queue: Remove the item least recently added.
- Randomized queue: Remove a random item.
- Priority queue: Remove the *largest* (or *smallest*) item.

### Performance
Implementation | Insert | Del Max | Max
--- | --- | --- | ---
Unordered array | 1 | N | N
Ordered array | N | 1 | 1
Goal | log N | log N | log N

# Binary Heap
- Based on binary trees.
- Binary tree: Empty or node with links to left and right binary trees.
- *Complete* binary tree: Perfectly balanced, except for bottom level.
  - Height of complete tree with *N* nodes is ⎣lg N⎦: Height only increases when *N* is a power of 2.

**Binary Heap**: Array representation of a heap-ordered complete binary tree.

Heap-ordered binary tree:
- Keys in nodes.
- Parent's key no smaller than children's keys.

Array representation:
- Indices start at 1.
- Take nodes in level order (root goes in first at `a[1]`, then all nodes in level 2 etc.).
- No explicit links needed!

### Properties
- Largest key is `a[1]`, which is root of binary tree.
- Parent of node at `k` is at `k/2`.
- Children of node at `k` are at `2k` and `2k+1`.

## Promotion
Scenario: Child's key becomes larger key than its parent's key.
- Exchange key in child with key in parent.
- Repeat until heap order restored.
  - Peter principle: Node promoted to level of incompetence (where it is no better than superiors).

## Insertion
- Insert: Add node at end, then swim it up.
- Cost: At most 1 + lg *N* compares.

## Demotion
Scenario: Parent's key becomes smaller than one (or both) of its children's.
- Exchange key in parent with key in larger child.
- Repeat until heap order restored.
  - Power struggle: New boss comes in, power struggle between subs, better subordinate promoted.

## Deletion
- Delete max: Exchange root with node at end, then sink it down.
- Cost: At most 2 lg *N* compares.

### Considerations
Immutability of keys.
- Assumption: client does not change keys while they're on the PQ.
- Best practice: use immutable keys.

Underflow and overflow.
- Underflow: throw exception if deleting from empty PQ.
- Overflow: add no-arg constructor and use resizing array.

Minimum-oriented priority queue.
- Replace `less()` with `greater()`.

Other operations.
- Remove an arbitrary item.
- Change the priority of an item.
  - Can implement both with `sink()` and `swim()`.

### Performance
Implementation | Insert | Del Max | Max
--- | --- | --- | ---
Unordered array | 1 | N | N
Ordered array | N | 1 | 1
**Binary heap** | log N | log N | 1

# Heapsort


