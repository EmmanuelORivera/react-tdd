import { rest } from 'msw'
import server from '../mocks/handlers'
import ProductService from './ProductService'

describe('ProductService', () => {
  it('should send a POST request with the provided product data', async () => {
    const productData = {
      name: 'New Product',
      size: 'Small',
      type: 'Furniture',
    }

    const response = await ProductService.saveProduct(productData)

    const responseData = await response.json()
    expect(responseData.message).toBe('Mocked response')
  })

  it('should return the fetch promise', async () => {
    const productData = {
      name: 'New Product',
      size: 'Small',
      type: 'Furniture',
    }

    server.use(
      rest.post('/product', (req, res, ctx) =>
        res(ctx.delay(1), ctx.status(500))
      )
    )

    const fetchPromise = ProductService.saveProduct(productData)

    expect(fetchPromise).toBeInstanceOf(Promise)

    try {
      const response = await fetchPromise
      expect(response.status).toBe(500)
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
    }
  })
})
