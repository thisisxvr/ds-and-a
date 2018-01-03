// import ElementarySorts from "./elementary-sorts"

xdescribe('Algorithms that sort data are', () => {
  const selection = ElementarySorts.selection
  const insertion = ElementarySorts.insertion
  const shellsort = ElementarySorts.shellsort
  const knuth = ElementarySorts.knuthShuffle

  it('Selection sort', () => {
    expect(selection([0, -5, 23, -2, 19, 3, 7])).toEqual([-5, -2, 0, 3, 7, 19, 23])
    expect(selection(['d', 'aa', 'ba', 'ab', 'da', 'a'])).toEqual(['a', 'aa', 'ab', 'ba', 'd', 'da'])
  })

  it('Insertion sort', () => {
    expect(insertion([0, -5, 23, -2, 19, 3, 7])).toEqual([-5, -2, 0, 3, 7, 19, 23])
    expect(insertion(['d', 'aa', 'ba', 'ab', 'da', 'a'])).toEqual(['a', 'aa', 'ab', 'ba', 'd', 'da'])
  })

  it('Shellsort', () => {
    expect(shellsort([0, -5, 23, -2, 19, 3, 7])).toEqual([-5, -2, 0, 3, 7, 19, 23])
    expect(shellsort(['d', 'aa', 'ba', 'ab', 'da', 'a'])).toEqual(['a', 'aa', 'ab', 'ba', 'd', 'da'])
  })

  it('Knuth Shuffle', () => {
    expect(knuth([0, -5, 23, -2, 19, 3, 7])).not.toEqual([0, -5, 23, -2, 19, 3, 7])
    expect(knuth(['d', 'aa', 'ba', 'ab', 'da', 'a'])).not.toEqual(['d', 'aa', 'ba', 'ab', 'da', 'a'])
  })
})