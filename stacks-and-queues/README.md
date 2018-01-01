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
