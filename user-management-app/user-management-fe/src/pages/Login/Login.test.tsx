import { screen, render } from '@testing-library/react'
import Login from './Login'
import userEvent from '@testing-library/user-event'

describe('Login Component', () => {
  beforeEach(() => {
    render(<Login />)
  })

  const getSubmitButton = () => screen.getByRole('button', { name: /submit/i })

  it('should render the login title', () => {
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument()
  })

  it('should render the form', () => {
    const form = screen.getByTestId('login-form')
    expect(form).toBeInTheDocument()
  })
  it('should render a label with the text of Email, with a control associated to that label', () => {
    const emailInput = screen.getByLabelText(/email/i)
    expect(emailInput).toBeInTheDocument()
    expect(emailInput).toHaveAttribute('type', 'email')
  })

  it('should render the email input as required', () => {
    const emailInput = screen.getByLabelText(/email/i)
    expect(emailInput).toHaveAttribute('required')
  })

  it('should render a label with the text of Password, with a control associated to that label', () => {
    const passwordInput = screen.getByLabelText(/password/i)
    expect(passwordInput).toBeInTheDocument()
    expect(passwordInput).toHaveAttribute('type', 'password')
  })

  it('should render the password input as required', () => {
    const passwordInput = screen.getByLabelText(/password/i)
    expect(passwordInput).toHaveAttribute('required')
  })

  it('should render a button with the Submit text', () => {
    const submitButton = getSubmitButton()

    expect(submitButton).toBeInTheDocument()
    expect(submitButton).toHaveAttribute('type', 'submit')
  })

  it('should validate the inputs as required', async () => {
    userEvent.click(getSubmitButton())

    expect(
      await screen.findByText(/The email is required/i)
    ).toBeInTheDocument()
    expect(
      await screen.findByText(/The password is required/i)
    ).toBeInTheDocument()
  })
})
