import { screen } from '@testing-library/react'
import { renderWithProviders } from './mocks/renderWithProviders'
import App from './App'

describe('App', () => {
  it('should render the login page', () => {
    renderWithProviders(<App />)

    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument()
  })
})
