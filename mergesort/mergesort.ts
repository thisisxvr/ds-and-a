// tslint:disable-next-line:no-namespace
namespace Mergesort {

  function merge<T>(arr: T[], lo: number, mid: number, hi: number) {
    const aux = new Array<T>(hi)
    for (let i = lo; i <= hi; i++) { aux[i] = arr[i] }

    // i = current entry in left half, j = current entry in right half, k = pointer for result array.
    let i = lo, j = mid + 1
    for (let k = lo; k <= hi; k++) {
      // Left half exhausted; move element from right half.
      if      (i > mid)         { arr[k] = aux[j++] }
      // Right half exhausted; move element from left half.
      else if (j > hi)          { arr[k] = aux[i++] }
      // Left element smaller than right element; move element from left.
      else if (aux[i] <= aux[j]) { arr[k] = aux[i++] }
      // Left element greater or equal to right element, move element from right.
      else                      { arr[k] = aux[j++] }
    }
  }

  export function mergesort<T>(arr: T[], lo = 0, hi = arr.length - 1): T[] | undefined {
    if (hi <= lo) { return }  // Already sorted; return.

    const mid = Math.floor(lo + (hi - lo) / 2)
    mergesort(arr, lo, mid)  // Sort the left half.
    mergesort(arr, mid + 1, hi)  // Sort the right half.

    if (arr[mid] < arr[mid + 1]) { return }  // Are the two arrays sorted?
    merge(arr, lo, mid, hi)  // If not, merge them.

    return arr
  }

  /** Bottom-up variant of Mergesort */
  export function mergesortBU<T>(arr: T[]): T[] {
    const n = arr.length

    for (let sz = 1; sz < n; sz = sz + sz) {
      // log N number of passes because we double size each time.
      for (let lo = 0; lo < n - sz; lo += sz + sz) {
        merge(arr, lo, lo + sz - 1, Math.min(lo + sz + sz - 1, n - 1))
      }
    }

    return arr
  }

}

export default Mergesort