import { fireEvent, render, screen } from '@testing-library/react'
import Counter from './Counter'

describe('Counter', () => {
  beforeEach(() => {
    render(<Counter />)
  })
  it('displays zero as initial counts', () => {
    const result = screen.getByText(/clicked times: 0/i)

    expect(result).toBeInTheDocument()
  })

  it('increases the counter by 1 after clicking the button', () => {
    const button = screen.getByRole('button')
    const counterText = screen.getByText(/clicked times: 0/i)

    fireEvent.click(button)

    expect(counterText).toHaveTextContent('Clicked times: 1')
  })
})
