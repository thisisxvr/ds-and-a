import StackArray from './stack-array'

xdescribe('An Array implementation of a Stack should', () => {
  let stack: StackArray<number>

  it('work with any data type', () => {
    expect(new StackArray<string>()).toBeInstanceOf(StackArray)
    expect(new StackArray<number>()).toBeInstanceOf(StackArray)
    expect(new StackArray<boolean>()).toBeInstanceOf(StackArray)
    expect(new StackArray<object>()).toBeInstanceOf(StackArray)
  })

  it('verify that it is empty', () => {
    const stack = new StackArray<string>()
    expect(stack.isEmpty()).toBeTruthy()
  })

  it('accept multiple items in succession', () => {
    stack = new StackArray<number>(3)
    stack.push(9)
    stack.push(8)
    stack.push(7)
  })

  it('double its data structure when full', () => {
    expect(stack.data.length).toBe(3)
    stack.push(6)
    expect(stack.data.length).toBe(6)
  })

  it('pop items in LIFO order', () => {
    expect(stack.pop()).toBe(6)
    expect(stack.pop()).toBe(7)
    expect(stack.pop()).toBe(8)
  })

  it('halve the array size when a quarter empty', () => {
    expect(stack.pop()).toBe(9)
    expect(stack.data.length).toBe(3)
  })

  it('throw an error when empty and popped', () => {
    const error = () => { stack.pop() }
    expect(error).toThrow(RangeError)
  })
})