import { render, screen } from '@testing-library/react'

import HelloWorld from './HelloWorld'

describe('HelloWorld', () => {
  it('renders HelloWorld', () => {
    render(<HelloWorld />)

    screen.debug()
    const title = screen.getByText(/hello world/i)

    screen.debug(title)
  })
})
