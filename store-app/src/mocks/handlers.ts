import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { CREATED_STATUS } from '../consts/httpStatus'

const server = setupServer(
  rest.post('/products', (req, res, ctx) => {
    return res(
      ctx.status(CREATED_STATUS),
      ctx.json({ message: 'Mocked response' })
    )
  })
)

export default server
