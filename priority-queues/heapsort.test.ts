import { Heap } from "./heapsort"

describe('The Heapsort algorithm', () => {
  it('sorts in N log N time', () => {
    let hs = new Heap('SORTEXAMPLE'.split(''))
    expect(hs.sort()).toEqual('AEELMOPRSTX'.split(''))

    hs = new Heap("bed bug dad yes zoo now for tip ilk dim tag jot sob nob sky hut men egg few jay owl joy rap gig wee was wad fee tap tar dug jam all bad yet".split(' '))
    expect(hs.sort()).toEqual(["all", "bad", "bed", "bug", "dad", "dim", "dug", "egg", "fee", "few", "for", "gig", "hut", "ilk", "jam", "jay", "jot", "joy", "men", "nob", "now", "owl", "rap", "sky", "sob", "tag", "tap", "tar", "tip", "wad", "was", "wee", "yes", "yet", "zoo"])
  })
})