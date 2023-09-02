import { screen, render } from '@testing-library/react'
import Login from './Login'

it('should render the login title', () => {
  render(<Login />)

  expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument()
})
