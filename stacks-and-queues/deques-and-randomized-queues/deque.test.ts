import Deque from './deque'

xdescribe('A Deque should', () => {
  let deque: Deque<string>

  it('work with any data type', () => {
    expect(new Deque<number>()).toBeInstanceOf(Deque)
    expect(new Deque<boolean>()).toBeInstanceOf(Deque)
    expect(new Deque<object>()).toBeInstanceOf(Deque)
  })

  it('verify that it is empty', () => {
    deque = new Deque<string>()
    expect(deque.isEmpty()).toBeTruthy()
  })

  it('add items to the front', () => {
    deque.addFirst('to')
    deque.addFirst('be')
    deque.addFirst('or')
    deque.addFirst('not')
    deque.addFirst('to')
    deque.addFirst('be')
  })

  it('add items to the back', () => {
    deque.addLast('that')
    deque.addLast('is')
    deque.addLast('the')
    deque.addLast('question')
  })

  it('remove and return the items from the front', () => {
    expect(deque.removeFirst()).toBe('be')
    expect(deque.removeFirst()).toBe('to')
    expect(deque.removeFirst()).toBe('not')
  })

  it('remove and return the item from the end', () => {
    expect(deque.removeLast()).toBe('question')
    expect(deque.removeLast()).toBe('the')
    expect(deque.removeLast()).toBe('is')
  })

  it('return the number of items on the deque', () => {
    expect(deque.size()).toBe(4)
  })

  it('empty completely', () => {
    expect(deque.removeFirst()).toBe('or')
    expect(deque.removeLast()).toBe('that')
    expect(deque.removeFirst()).toBe('be')
    expect(deque.removeLast()).toBe('to')
    expect(deque.size()).toBe(0)
  })

  it('throw when passed a null argument', () => {
    const addFirstError = () => { deque.addFirst(null!) }
    expect(addFirstError).toThrow(TypeError)
    const addLastError = () => { deque.addLast(null!) }
    expect(addLastError).toThrow(TypeError)
  })

  it('throw when a remove is attempted on an empty deque', () => {
    const removeFirstError = () => { deque.removeFirst() }
    expect(removeFirstError).toThrow('Deque is empty.')
    const removeLastError = () => { deque.removeLast() }
    expect(removeLastError).toThrow('Deque is empty.')
  })

  it('continue to operate as expected', () => {
    deque.addFirst('the')
    deque.addLast('was')
    deque.addFirst('question')
    deque.addLast('what')
    deque.addFirst('again')
    deque.addFirst('?')

    expect(deque.size()).toBe(6)

    expect(deque.removeLast()).toBe('what')
    expect(deque.removeLast()).toBe('was')
    expect(deque.removeLast()).toBe('the')
    expect(deque.removeLast()).toBe('question')
    expect(deque.removeFirst()).toBe('?')
    expect(deque.removeLast()).toBe('again')

    expect(deque.isEmpty()).toBeTruthy()
  })

  it('has an iterator that returns the next value', () => {
    const dequeItems = ['what', 'was', 'the', 'question', 'again', '?']

    deque.addLast('the')
    deque.addLast('was')
    deque.addFirst('question')
    deque.addFirst('what')
    deque.addFirst('again')
    deque.addLast('?')

    for (const item of deque) {
      expect(dequeItems).toContain(item)
    }

    expect(deque.size()).toBe(0)
    expect(deque.isEmpty()).toBeTruthy()
  })
})