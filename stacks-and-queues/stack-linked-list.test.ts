import StackLinkedList from './stack-linked-list'

describe('A Linked List implementation of a Stack', () => {
  let stack: StackLinkedList<number>

  it('should work with any data type', () => {
    expect(new StackLinkedList<string>()).toBeInstanceOf(StackLinkedList)
    expect(new StackLinkedList<number>()).toBeInstanceOf(StackLinkedList)
    expect(new StackLinkedList<boolean>()).toBeInstanceOf(StackLinkedList)
    expect(new StackLinkedList<object>()).toBeInstanceOf(StackLinkedList)
  })

  it('should verify that it is empty', () => {
    const stack = new StackLinkedList<string>()
    expect(stack.isEmpty()).toBeTruthy()
  })

  it('should accept multiple items in succession', () => {
    stack = new StackLinkedList<number>()
    stack.push(9)
    stack.push(8)
    stack.push(7)
  })

  it('...pop them in LIFO order', () => {
    expect(stack.pop()).toBe(7)
    expect(stack.pop()).toBe(8)
    expect(stack.pop()).toBe(9)
  })

  it('...and return null when empty', () => {
    expect(stack.pop()).toBeNull()
  })
})