describe(' mocks', () => {
  test('first example', () => {
    const myMock = jest
      .fn()
      .mockReturnValueOnce(true)
      .mockReturnValueOnce('hello world')
      .mockReturnValueOnce(28)

    const result1 = myMock()
    const result2 = myMock()
    const result3 = myMock()

    expect(myMock).toHaveBeenCalled()
    expect(myMock).toHaveBeenCalledTimes(3)

    expect(result1).toBe(true)
    expect(result2).toBe('hello world')
    expect(result3).toBe(28)
  })
})
