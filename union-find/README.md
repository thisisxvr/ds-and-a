# Union Find

#### Problem: Dynamic Connectivity
Given a set of *N* objects
- `Union` command: connects two object.
- `Find` / `Connected` query: is there a path between two objects?

---
## Quick Find (eager approach)
#### Data structure
- Integer array `id[]` of length *N*.
- Interpretation: *p* and *q* are connected if and only if they have the same id.
#### Find
Check if p and q have the same id. 
#### Union
To merge components containing *p* and *q*, change all entries whose id equals `id[p]` to `id[q]`.

####  Cost: O(N<sup>2</sup>)
Union is too expensive. Quadratic, does not scale.

---
## Quick Union (lazy approach)
Uses a tree like structure to represent connections.

#### Data structure
- Integer array `id[]` of length *N*.
- Interpretation: `id[i]` is parent of `i`.
- Root of `i` is `id[id[id[...id[i]...]]]` (Keep going until it doesn't change; algorithm ensures no cycles).
#### Find
Check if p and q have the same root.
#### Union
To merge components containing p and q,
set the id of p's root to the id of q's root

####  Cost
- Trees can get tall.
- Find too expensive (could be N array accesses).

---
## Weighted Quick Union
- Modify quick-union to avoid tall trees.
- Keep track of size of each tree (number of objects).
- Balance by linking root of smaller tree to root of larger tree.
#### Data structure
Same as quick-union, but maintain extra array `sz[i]`
to count number of objects in the tree rooted at `i`.
#### Find
Identical to quick-union.
#### Union
Modify quick-union to:
- Link root of smaller tree to root of larger tree.
- Update the `sz[]` array.

#### Cost
- Find: takes time proportional to depth of p and q.
- Union: takes constant time, given roots.
- Proposition. Depth of any node x is at most *lg N*.
---
## Weighted Quick Union with Path Compression
An improvement on WQU:  Just after computing the root of p, set the id of each examined node to point to that root. Keeps trees almost completely flat.

#### Two-pass implementation
Add second loop to `root()` to set the `id[]` of each examined node to the root.
#### Simpler one-pass variant 
Make every other node in path point to its grandparent (thereby halving path length). One extra line of code keeps trees almost completely flat.

#### Cost: O(n) <sup>(almost)</sup>
In theory not quite linear. In practice, it is. WQUPC makes it possible to solve problems that could not otherwise be addressed.

---
## Summary
algorithm | worst-case time 
---|---
quick-find| M N
quick-union| M N
weighted QU| N + M log N
QU + path compression| N + M log N
weighted QU + path compression| N + M lg* N
M union-find operations on a set of N objects

### Assignment: [Percolation](percolation/)