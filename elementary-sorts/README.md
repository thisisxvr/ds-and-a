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
- In the `i`th iteration, find the smallest element `min` to the right, and swap that with `i`.
- Algorithm: ↑ scans from left to right.
- Invariants:
  - Entries the left of ↑ (including ↑) fixed and in ascending order.
  - No entry to right of ↑ is smaller than any entry to the left of ↑.

### Performance
- Uses ~*N*<sup>2</sup>/2 compares and *N* exchanges.
- Runtime insensitive to input. Quadratic time, even if input is sorted.
- Data movement is minimal. Every item is placed in it's final position with one exchange.

## Insertion Sort
- In iteration `i`, swap `a[i]` with each larger entry to its left.
- Algorithm: ↑ scans from left to right.
- Invariants:
  - Entries to the left of ↑ (including ↑) are in ascending order.
  - Entries to the right of ↑ have not yet been seen.

### Performance
- To sort a randomly-ordered array with distinct keys, insertion sort uses ~ ¼ *N*<sup>2</sup> compares and ~ ¼ *N*<sup>2</sup> exchanges on average: Expect each entry to move halfway back.
- **Best case**: If the array is in ascending order, insertion sort makes *N-1* compares and 0 exchanges.
- **Worst case**: If the array is in descending order (and no duplicates), insertion sort makes ~ ½ *N*<sup>2</sup> compares and ~ ½ *N*<sup>2</sup> exchanges.
- For partially-sorted arrays, insertion sort runs in linear time: Number of exchanges equals the number of inversions.
- Roughly twice as fast as selection sort in practice; Efficient method of sorting partially sorted arrays.

## Shellsort
- Variation on Insertion Sort [Shell 1959].
- Move entries more than one position at a time by *h*-sorting the array. (Where *h* in Insertion Sort equals 1).
- *h*-sort array for decreasing sequence of values of *h*.
- Increment sequence: 3*x* + 1 => [1, 4, 13, 40, 121, 364].

### Performance
- The worst-case number of compares used by shellsort with the 3*x*+1 increments is O(*N*<sup>3/2</sup>).
- Number of compares used by shellsort with the 3*x*+1 increments is at most by a small multiple of *N* times the # of increments used. 

- Simple idea leading to substantial performance gains.
- Fast unless array size is huge (used for small subarrays).
- Tiny, fixed footprint for code (used in some embedded systems).

## Shuffling
- Goal: Rearrange array so that result is a uniformly random permutation.
- Generate a random real number `r` for each array entry.
- Sort the array.
- Knuth Shuffle: 
  - In iteration `i`, pick integer `r` between `0` and `i` uniformly at random.
  - Swap `a[i]` and `a[r]`.

### Performance
- Produces a uniformly random permutation of the input array in linear time.
