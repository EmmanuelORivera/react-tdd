// callback
const asyncCallback = (cb) => {
  setTimeout(() => {
    cb(true)
  }, 1000)
}

const asyncPromise = () => new Promise((resolve) => resolve(15))

describe('async code', () => {
  test('example of async with callback', (done) => {
    asyncCallback((result) => {
      expect(result).toBe(true)
      done()
    })
  })

  test('example of async with promises', async () => {
    const response = await asyncPromise()

    expect(response).toBeDefined()
    expect(response).toBe(15)
  })
})
