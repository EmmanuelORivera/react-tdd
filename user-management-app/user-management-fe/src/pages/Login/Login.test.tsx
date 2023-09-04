import { screen, render } from '@testing-library/react'
import Login from './Login'

it('should render the login title', () => {
  render(<Login />)

  expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument()
})

it('should render a label with the text of Email, with a control associated to that label', () => {
  render(<Login />)

  expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
})
