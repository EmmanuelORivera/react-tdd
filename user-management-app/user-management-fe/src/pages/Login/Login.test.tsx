import { screen, waitFor } from '@testing-library/react'
import Login from './Login'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../../mocks/renderWithProviders'

describe('Login Component', () => {
  beforeEach(() => {
    renderWithProviders(<Login />)
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

  it('should validate the input email format when form it is submitted', async () => {
    userEvent.type(screen.getByLabelText(/email/i), 'invalid email')

    userEvent.click(getSubmitButton())

    expect(
      await screen.findByText(/The email is not valid/i)
    ).toBeInTheDocument()
  })

  it('should disable the submit button while is fetching', async () => {
    expect(getSubmitButton()).not.toBeDisabled()

    userEvent.type(screen.getByLabelText(/email/i), 'test@test.com')
    userEvent.type(screen.getByLabelText(/password/i), 'p')

    userEvent.click(getSubmitButton())

    await waitFor(() => expect(getSubmitButton()).toBeDisabled())
  })

  it('should display a loading indicator while is fetching the login', async () => {
    expect(
      screen.queryByRole('progressbar', { name: /loading/i })
    ).not.toBeInTheDocument()

    userEvent.type(screen.getByLabelText(/email/i), 'test@test.com')
    userEvent.type(screen.getByLabelText(/password/i), 'p')

    userEvent.click(getSubmitButton())

    expect(await screen.findByRole('progressbar', { name: /loading/i }))
    // await waitFor(() => expect(getSubmitButton()).toBeDisabled())
  })

  it('should not be disabled when the fetching data is done', async () => {
    expect(getSubmitButton()).not.toBeDisabled()

    userEvent.type(screen.getByLabelText(/email/i), 'test@test.com')
    userEvent.type(screen.getByLabelText(/password/i), 'p')

    userEvent.click(getSubmitButton())

    await waitFor(() => expect(getSubmitButton()).toBeDisabled())
    await waitFor(() => expect(getSubmitButton()).not.toBeDisabled())
  })
})
