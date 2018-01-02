// tslint:disable-next-line:no-namespace
namespace ElementarySorts {

  function less<T>(j: T, i: T): boolean {
    return j < i
  }

  /** Swaps the position of two elements in a given array. */
  function exchange<T>(a: T[], i: number, j: number): T[] {
    return [a[i], a[j]] = [a[j], a[i]]
  }

  export function selection<T>(array: T[]): T[] {
    for (let i = 0; i < array.length; i++) {
      let min = i
      for (let j = i + 1; j < array.length; j++) { if (less(array[j], array[min])) { min = j } }
      exchange(array, i, min)
    }
    return array
  }

  export function insertion<T>(array: T[]): T[] {
    for (let i = 0; i < array.length; i++) {
      for (let j = i; j > 0; j--) {
        if (less(array[j], array[j - 1])) { exchange(array, j, j - 1) }
          else { break }
      }
    }
    return array
  }

  export function shellsort<T>(array: T[]): T[] {
    const n = array.length
    let h = 1
    while (h < n / 3) { h = 3 * h + 1 }

    while (h >= 1) {
      for (let i = h; i < n; i++) {
        for (let j = i; j >= h && less(array[j], array[j - h]); j -= h) {
          exchange(array, j, j - h)
        }
      }
      h = Math.floor(h / 3)
    }

    return array
  }

  export function knuthShuffle<T>(array: T[]): T[] {
    for (let i = 0; i < array.length; i++) {
      const r = Math.floor(Math.random() * i + 1)  // Generate a random number between 0 and i.
      exchange(array, i, r)  // Swap elements at i and r.
    }
    return array
  }
}

export default ElementarySorts