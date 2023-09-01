import { storage } from '../lib/storage'
import { getUsername, saveUsername } from '../user'
jest.mock('../lib/storage')

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

  test('second example', () => {
    const userName = 'John Doe'
    saveUsername(userName)
    expect(storage.save).toHaveBeenCalledTimes(1)
    expect(storage.save).toHaveBeenCalledWith({
      key: 'username',
      value: userName,
    })
  })

  test('third example', () => {
    const userName = 'John Doe'
    storage.get.mockReturnValueOnce(userName)

    const result = getUsername()

    expect(result).toBe(userName)
    expect(storage.get).toHaveBeenCalledTimes(1)
    expect(storage.get).toHaveBeenCalledWith({ key: 'username' })
  })
})
