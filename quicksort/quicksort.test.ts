import Quick from "./quicksort"

describe('Quick', () => {
  it('sort sorts stuff quick', () => {
    expect(Quick.sort(['S', 'O', 'R', 'T', 'E', 'X', 'A', 'M', 'P', 'L', 'E'])).toEqual(["A", "E", "E", "L", "M", "O", "P", "R", "S", "T", "X"])

    const testInput = "bed bug dad yes zoo now for tip ilk dim tag jot sob nob sky hut men egg few jay owl joy rap gig wee was wad fee tap tar dug jam all bad yet".split(' ')

    expect(Quick.sort(testInput)).toEqual(["all", "bad", "bed", "bug", "dad", "dim", "dug", "egg", "fee", "few", "for", "gig", "hut", "ilk", "jam", "jay", "jot", "joy", "men", "nob", "now", "owl", "rap", "sky", "sob", "tag", "tap", "tar", "tip", "wad", "was", "wee", "yes", "yet", "zoo"])
  })

  it('select can select stuff', () => {
    const testInput = 'QUICKEXAMPLE'.split('')

    // Min (k = 0)
    expect(Quick.select(testInput, 0)).toBe('A')

    // Median (k = N / 2)
    expect(Quick.select(testInput, testInput.length / 2)).toBe('L')

    // Max (k = N - 1)
    expect(Quick.select(testInput, testInput.length - 1)).toBe('X')
  })

  it('sort has a 3-way variant optimized for duplicate keys', () => {
    expect(Quick.threeWaySort(['S', 'O', 'R', 'T', 'E', 'X', 'A', 'M', 'P', 'L', 'E'])).toEqual(["A", "E", "E", "L", "M", "O", "P", "R", "S", "T", "X"])

    const testInput = 'RBWWRWBRRWBR'.split('')

    expect(Quick.threeWaySort(testInput)).toEqual('BBBRRRRRWWWW'.split(''))
  })
})