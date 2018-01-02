# Mergesort
- Divide and Conquer: Solve a problem by dividing it in 2 halves and solving the halves individually.
- Recursively sort each half.
- Merge halves.

### Implementation
- Split array `a[low...hi]` in 2 halves: `a[low...mid]` and `a[mid+1...hi]`.
- Sort them independently (via recursive calls).
- Merge the resulting ordered subarrays.
  - Recursive calls break sub-arrays into smaller sub-arrays until they are N = 2.

## Performance
- Time: At most *N* lg *N* compares and 6 *N* lg *N* array accesses to sort any array of size *N*.
- Space: Extra space proportional to *N*.

## Practical Improvements
- Use insertion sort for small subarrays:
  - Mergesort has too much overhead for tiny subarrays.
  - Cutoff to insertion sort for ≈ 7 items.
- Stop if already sorted:
  - Is biggest item in first half ≤ smallest item in second half?
  - Helps for partially-ordered arrays.
- Eliminate the copy to the auxiliary array: Save time (but not space) by switching the role of the input and auxiliary array in each recursive call.

## Bottom-Up Variant
- Pass through array, merging subarrays of size 1.
- Repeat for subarrays of size 2, 4, 8, 16, etc.

- Simple and non-recursive version of mergesort.
  - But about 10% slower than top-down on typical systems.

---

# Complexity
- Computational complexity: Framework to study efficiency of algorithms for solving a particular problem X.
- Model of computation: Allowable operations.
- Cost model: Operation count(s).
- Upper bound: Cost guarantee provided by *some* algorithm for X.
- Lower bound: Proven limit on cost guarantee of *all* algorithms for X.
- Optimal algorithm. Algorithm with best possible cost guarantee for X.

### Sorting
- Any compare-based sorting algorithm must use at least lg ( *N* ! ) ~ *N* lg *N* compares in the worst-case.
- Optimal algorithm = Mergesort.
  - With respect to number of compares (time). **Not** optimal with respect to space.

### Assignment: [Collinear Points](collinear-points/)
