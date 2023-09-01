describe('setup and teardown examples', () => {
  beforeAll(() => {
    console.log('before all tests')
  })
  beforeEach(() => {
    console.log('before each test')
  })
  afterAll(() => {
    console.log('after all the tests')
  })

  afterEach(() => {
    console.log('after each test')
  })

  test('example 1', () => {
    expect(true).toBe(true)
  })

  test('example 2', () => {
    expect(true).toBe(true)
  })
})
