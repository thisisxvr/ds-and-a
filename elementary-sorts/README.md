# Elementary Sorts

## Rules of the Game
### Total Order
A total order is a binary relation *≤* that satisfies:
- Antisymmetry: if *v ≤ w* and *w ≤ v*, then *v = w*.
- Transitivity: if *v ≤ w* and *w ≤ x*, then *v ≤ x*.
- Totality: either *v ≤ w* or *w ≤ v* or both.

Examples:
- Standard order for natural and real numbers.
- Chronological order for dates or times.
- Alphabetical order for strings.

- Rock, Paper, Scissors is **not** a total order (intransitive relation).

### Comparable API
Implement `compareTo()` so that `v.compareTo(w)`:
- Is a total order.
- Returns a negative integer, zero, or positive integer if *v* is less than, equal to, or greater than *w*, respectively.
- Throws an exception if incompatible types (or either is `null`).

### Sorting Abstractions
- Helper functions: Refer to data through compares and exchanges:
  - Less: Is item *v* less than *w*?
  - Exchange: Swap item in array `a[]` at index `i` with the one at index `j`.

## Selection Sort
