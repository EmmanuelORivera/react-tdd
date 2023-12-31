import { screen, waitFor } from '@testing-library/react'
import Login from './Login'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../../mocks/renderWithProviders'
import { server } from '../../mocks/server'
import { rest } from 'msw'
import { mswApi } from '../../mocks/handlers'

describe('Login Component', () => {
  beforeEach(() => {
    renderWithProviders(<Login />)
  })

  const getSubmitButton = () => screen.getByRole('button', { name: /submit/i })
  const mockServerWithError = (statusCode: number) =>
    server.use(
      rest.post(mswApi('/login'), (req, res, ctx) =>
        res(ctx.delay(1), ctx.status(statusCode))
      )
    )

  const fillAndSendLoginForm = () => {
    userEvent.type(screen.getByLabelText(/email/i), 'test@test.com')
    userEvent.type(screen.getByLabelText(/password/i), 'p')

    userEvent.click(getSubmitButton())
  }

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

    fillAndSendLoginForm()

    await waitFor(() => expect(getSubmitButton()).toBeDisabled())
  })

  it('should display a loading indicator while is fetching the login', async () => {
    expect(
      screen.queryByRole('progressbar', { name: /loading/i })
    ).not.toBeInTheDocument()

    fillAndSendLoginForm()

    expect(await screen.findByRole('progressbar', { name: /loading/i }))
  })

  it('should not be disabled when the fetching data is done', async () => {
    expect(getSubmitButton()).not.toBeDisabled()

    fillAndSendLoginForm()

    await waitFor(() => expect(getSubmitButton()).toBeDisabled())
    await waitFor(() => expect(getSubmitButton()).not.toBeDisabled())
  })

  it('should display "Unexpected error, please try again" when there is an error from the api login', async () => {
    mockServerWithError(500)

    fillAndSendLoginForm()

    expect(
      await screen.findByText('Unexpected error, please try again')
    ).toBeInTheDocument()
  })

  it('should display "The email or password are not correct" when the credentials are invalid', async () => {
    mockServerWithError(401)

    fillAndSendLoginForm()

    expect(
      await screen.findByText('The email or password are not correct')
    ).toBeInTheDocument()
  })
})
