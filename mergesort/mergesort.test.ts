import Mergesort from './mergesort'
import ms = Mergesort.mergesort
import msBU = Mergesort.mergesortBU

describe('Mergesort', () => {

  it('sorts stuff in NlogN time', () => {
    expect(ms(['S', 'O', 'R', 'T', 'E', 'X', 'A', 'M', 'P', 'L', 'E'])).toEqual(["A", "E", "E", "L", "M", "O", "P", "R", "S", "T", "X"])

    const testInput = "bed bug dad yes zoo now for tip ilk dim tag jot sob nob sky hut men egg few jay owl joy rap gig wee was wad fee tap tar dug jam all bad yet".split(' ')

    expect(ms(testInput)).toEqual(["all", "bad", "bed", "bug", "dad", "dim", "dug", "egg", "fee", "few", "for", "gig", "hut", "ilk", "jam", "jay", "jot", "joy", "men", "nob", "now", "owl", "rap", "sky", "sob", "tag", "tap", "tar", "tip", "wad", "was", "wee", "yes", "yet", "zoo"])
  })

  it('has a bottom-up variant', () => {
    expect(msBU(['S', 'O', 'R', 'T', 'E', 'X', 'A', 'M', 'P', 'L', 'E'])).toEqual(["A", "E", "E", "L", "M", "O", "P", "R", "S", "T", "X"])

    const testInput = "bed bug dad yes zoo now for tip ilk dim tag jot sob nob sky hut men egg few jay owl joy rap gig wee was wad fee tap tar dug jam all bad yet".split(' ')

    expect(msBU(testInput)).toEqual(["all", "bad", "bed", "bug", "dad", "dim", "dug", "egg", "fee", "few", "for", "gig", "hut", "ilk", "jam", "jay", "jot", "joy", "men", "nob", "now", "owl", "rap", "sky", "sob", "tag", "tap", "tar", "tip", "wad", "was", "wee", "yes", "yet", "zoo"])
  })

})