describe('matchers', () => {
  test('toBe', () => {
    expect(4).toBe(4)
  })

  test('toEqual', () => {
    const obj = { a: 1 }
    expect(obj).toEqual({ a: 1 })
  })

  test('not', () => {
    const a = 11
    expect(a).not.toBe(12)
  })
})
