import { rest } from 'msw'
import { setupServer } from 'msw/node'

const server = setupServer(
  rest.post('/products', (req, res, ctx) => {
    return res(ctx.status(201), ctx.json({ message: 'Mocked response' }))
  })
)

export default server
