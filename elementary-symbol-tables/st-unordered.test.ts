import { UnorderedST } from "./st-unordered"

xdescribe('An Unordered Symbol Table uses a Linked List to', () => {
  const st = new UnorderedST<string, number>()

  it('put values', () => {
    st.put('to', 1)
    st.put('be', 1)
    st.put('or', 1)
    st.put('not', 1)
    expect(st.size()).toBe(4)
  })

  it('get values', () => {
    st.put('to', 2)
    st.put('be', -1)
    expect(st.size()).toBe(4)
    expect(st.get('to')).toBe(2)
    expect(st.get('be')).toBe(-1)
  })

  it('deletes keys', () => {
    st.delete('or')
    expect(st.size()).toBe(3)
    expect(st.isEmpty()).toBeFalsy()
  })

  it('verify that a key exists', () => {
    expect(st.contains('not')).toBeTruthy()
  })

  it('count its contents', () => {
    st.delete('not')
    st.delete('to')
    st.delete('be')
    expect(st.isEmpty()).toBeTruthy()
  })
})