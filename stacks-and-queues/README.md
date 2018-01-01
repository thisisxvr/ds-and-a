# Stacks and Queues

- Value: collection of objects.
- Operations: *Insert*, *Remove*, *Iterate*, Test *if empty*.
- Insertion intent is clear, but which item to be removed?
  - Stack: LIFO — Examine item most recently added.
  - Queue: FIFO — Examine item least recently added.

## Stacks
#### Linked List Implementation: O(1)
- Every operation takes constant time in the worst case.

#### Array Implementation: O(N)
Considerations:
1. Underflow: throw exception if pop from an empty stack.
2. Overflow: use resizing array for array implementation.
3. Null items: We allow null items to be inserted.
4. Loitering: Holding a reference to an object when it is no longer needed. 

Solutions:
- push(): *double* size of array when full.
- pop(): *halve* size of array when *one-quarter* full.
  - Invariant: Array is always between 25% and 100% full.

Performance: Amortized time is constant. Worst case proportional to N.

#### Linked List vs. Resizing Array
Linked list implementation:
- Every operation takes constant time in the *worst case*.
- Uses extra time and space to deal with the links.

Resizing array implementation:
- Every operation takes constant *amortized* time.
- Less wasted space.

## Queues
Same as stack, only differs in terminology and semantics:
- `enqueue` for insertion, `dequeue` for removal.
- `dequeue` returns the item least recently added (like waiting in line at a ticket counter).

#### Linked list implemenation
- Maintain pointers to first and last nodes.
- Insertion and removal happen at opposite ends.

#### Array implementation
- Grow the array when tail exceeds capacity.
- Shrink the array when head hits 1/4 capacity.
- Update head and tail when resizing.

## Bags
Collection of items, allows for iterating. But does not care for order.
- Implementation: Stack (without pop) or queue (without dequeue).
  - `add(Item x)`: insert a new item onto bag.
  - `int size()`: number of items in bag.
  - `Iterable<Item> iterator()`: iterator for all items in bag.

## Applications
- Many languages come with these data structures in a library / natively.
- So why implement ourselves?
  - Bloated and poorly designed API (design-by-committee phenomenon).
  - Best practice to use our own implementation.
  - Don't use a library until you understand its API!

#### Stack applications
- Parsing in a compiler.
- Java virtual machine.
- Undo in a word processor.
- Back button in a Web browser... and more.

### Assignment: [Deques and Randomized Queues](deques-and-randomized-queues/)