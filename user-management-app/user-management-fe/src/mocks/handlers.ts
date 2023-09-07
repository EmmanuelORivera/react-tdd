import { rest } from 'msw'

export const mswApi = (path: string) => {
  return `${
    process.env.REACT_APP_BASE_URL_BE || 'http://localhost:8080'
  }${path}`
}

export const handlers = [
  rest.post(mswApi('/login'), (req, res, ctx) =>
    res(ctx.delay(1), ctx.status(200))
  ),
]
