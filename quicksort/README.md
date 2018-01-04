# Quicksort
- One of top 10 algorithms of 20th century in science and engineering.
- Overview:
  - Shuffle the array.
  - Partition so that, for some `j`:
    - Entry `a[j]` is in place.
    - No larger entry to the left of `j`.
    - No smaller entry to the right of `j`.
  - Sort each piece recursively.

### Partitioning
Repeat:
- Scan `i` from left to right so long as (`a[i]` < `a[lo]`).
- Scan `j` from right to left so long as (`a[j]` > `a[lo]`).
- Exchange `a[i]` with `a[j]`.

until `i` and `j` pointers cross.

## Implementation Details
- Partitioning in-place: Using an extra array makes partitioning easier (and stable), but is not worth the cost.
- Terminating the loop: Testing whether the pointers cross is a bit trickier than it might seem.
- Staying in bounds: The `(j == lo)` test is redundant (it'll stop when it hits the partitioning element), but the `(i == hi)` test is not.
- Preserving randomness: Shuffling is needed for performance guarantee.
- Equal keys: When duplicates are present, it is (counter-intuitively) better to stop on keys equal to the partitioning item's key.

## Performance
- Best case: Number of compares is ~ *N* lg *N*.
- Worst case: Number of compares is ~ ½ *N* <sup>2</sup>.
- Average case: The average number of compares C<sub>*N*</sub> to quicksort an array of *N* distinct keys is ~ 2*N* ln*N* (and the number of exchanges is ~ ⅓ *N* ln *N*).

- 39% more compares than mergesort.
- But faster than mergesort in practice because of less data movement.
- Random shuffle: Probabilistic guarantee against worst case.
- **Not** stable.

# Selection
- Problem: Given an array of *N* items, find a *k*th smallest item.
  - Eg: Min (*k* = 0), max (*k* = *N* - 1), median (*k* = *N*/ 2).

## Quick-select
- Partition as in Quicksort.
- Repeat in one subarray, depending on *j*; finished when *j* equals *k*.

## Performance
- Quick-select takes linear time on average.
- Quick-select uses ~ ½ *N*<sup>2</sup> compares in the worst case, but (as with quicksort) the random shuffle provides a probabilistic guarantee.

# Duplicate Keys
- Often, purpose of sort is to bring items with equal keys together.
- Typical characteristics of such applications:
  - Huge array.
  - Small number of key values.

Mistake: Put all items equal to the partitioning item on one side.
Consequence: ~ ½ *N*<sup>2</sup> compares when all keys equal.

Recommended: Stop scans on items equal to the partitioning item.
Consequence: ~ *N* lg *N* compares when all keys equal.

Desirable: Put all items equal to the partitioning item in place.

### 3-Way Partitioning
Goal: Partition array into 3 parts so that:
  - Entries between `lt` and `gt` equal to partition item `v`.
  - No larger entries to left of `lt`.
  - No smaller entries to right of `gt`.

### Dijkstra's 3-Way Quicksort Variant
- Let `v` be partitioning item `a[lo]`.
- Scan `i` from left to right.
  - (`a[i]` < `v`):  exchange `a[lt]` with `a[i]`; increment both `lt` and `i`.
  - (`a[i]` > `v`):  exchange `a[gt]` with `a[i]`; decrement `gt`.
  - (`a[i]` == `v`): increment `i`.

### Performance
Randomized quicksort with 3-way partitioning reduces running time from linearithmic to **linear** in broad class of applications.

# System Sorts
Sorting algorithms are essential in a broad variety of applications.

### Engineering a System Sort
Basic algorithm = quicksort.
- Cutoff to insertion sort for small subarrays.
- Partitioning scheme: Bentley-McIlroy 3-way partitioning.
- Partitioning item:
  - small arrays: middle entry
  - medium arrays: median of 3
  - large arrays: Tukey's ninther (Median of the median of 3 samples, each of 3 entries.)

## Summary
Algorithm | Inplace | Stable | Worst | Average | Best | Remarks
--- | --- | --- | --- | --- | --- | ---
Selection | ✔ | | N<sup>2</sup> / 2 | N<sup>2</sup> / 2 | N<sup>2</sup> / 2 | *N* exchanges
Insertion | ✔ | ✔ | N<sup>2</sup> / 2 | N<sup>2</sup> / 4 | N | Use for small *N* or partially ordered
Shell | ✔ | | ? | ? | N | Tight code, subquadratic
Merge | | ✔ | N lg N | N lg N | N lg N | *N* log *N* guarantee, stable
Quick | ✔ | | N<sup>2</sup> / 2 | 2 N ln N | N lg N | *N* log *N* probabilistic guarantee; fastest in practice
3-Way Quick | ✔ | | N<sup>2</sup> / 2 | 2 N ln N | N | Improves quicksort in presence of duplicate keys
??? | ✔ | ✔ | N lg N | N lg N | N | Holy sorting grail
