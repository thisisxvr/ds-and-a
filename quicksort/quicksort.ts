import ElementarySorts from "../elementary-sorts/elementary-sorts"

/* tslint:disable:no-namespace curly */
namespace Quick {

  function partition<type>(array: type[], lo: number, hi: number): number {
    let i = lo, j = hi + 1

    while (true) {
      while (array[++i] <= array[lo]) { if (i === hi) break }  // Find item on left to swap.
      while (array[lo] <= array[--j]) { if (j === lo) break }  // Find item on right to swap.

      // Until pointers cross.
      if (i >= j) { break }
      [array[i], array[j]] = [array[j], array[i]]  // Exchange a[i] with a[j].
    }

    // Exchange pivot with a[j]
    // and return index of item now known to be in place.
    [array[lo], array[j]] = [array[j], array[lo]]
    return j
  }

  export function sort<type>(array: type[], lo?: number, hi?: number): type[] {
    if (typeof(lo) === 'undefined' || typeof(hi) === 'undefined') {
      const a = ElementarySorts.knuthShuffle(array)
      sort(a, 0, a.length - 1)
      return a
    }

    if (hi! <= lo!) { return array }
    const j = partition(array, lo!, hi!)
    sort(array, lo, j - 1)
    sort(array, j + 1, hi)
    return array
  }

  /** Given an array of *N* items, find a *k*th smallest item. */
  export function select<type>(a: type[], k: number): type {
    const array = ElementarySorts.knuthShuffle(a)

    let lo = 0, hi = array.length - 1
    while (hi > lo) {
      const j = partition(array, lo, hi)
      if      (j < k)   lo = j + 1
      else if (j > k)   hi = j - 1
      else return array[k]
    }

    return array[k]
  }

  export function threeWaySort<type>(array: type[], lo = 0, hi = array.length - 1): type[] {
    if (hi <= lo) { return array }
    let lt = lo, gt = hi, i = lo
    const v = array[lo]

    while (i <= gt) {
      if      (array[i] < v)  [array[lt++], array[i++]] = [array[i], array[lt]]
      else if (array[i] > v)  [array[gt--], array[i]]   = [array[i], array[gt]]
      else i++
    }

    threeWaySort(array, lo, lt - 1)
    threeWaySort(array, gt + 1, hi)
    return array
  }

}

export default Quick