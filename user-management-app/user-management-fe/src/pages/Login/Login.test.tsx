import { screen, render } from '@testing-library/react'
import Login from './Login'

describe('Login Component', () => {
  it('should render the login title', () => {
    render(<Login />)

    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument()
  })

  it('should render a label with the text of Email, with a control associated to that label', () => {
    render(<Login />)

    const emailInput = screen.getByLabelText(/email/i)
    expect(emailInput).toBeInTheDocument()
    expect(emailInput).toHaveAttribute('type', 'email')
  })

  it('should render a label with the text of Password, with a control associated to that label', () => {
    render(<Login />)

    const passwordInput = screen.getByLabelText(/password/i)
    expect(passwordInput).toBeInTheDocument()
    expect(passwordInput).toHaveAttribute('type', 'password')
  })

  it('should render a button with the Submit text', () => {
    render(<Login />)

    const passwordInput = screen.getByRole('button', { name: /submit/i })

    expect(passwordInput).toBeInTheDocument()
    expect(passwordInput).toHaveAttribute('type', 'submit')
  })
})
