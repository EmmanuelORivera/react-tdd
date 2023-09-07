import React from 'react'
import { screen, render, act, fireEvent } from '@testing-library/react'
import Form from './Form'
import userEvent from '@testing-library/user-event'

describe('when the form is mounted', () => {
  beforeEach(() => {
    render(<Form />)
  })
  it('there must be a create product form page', () => {
    expect(
      screen.queryByRole('heading', { name: /create product/i })
    ).toBeInTheDocument()
  })

  it('should contain the fields: name, size, type (electronic, furniture, clothing)', () => {
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/size/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/type/i)).toBeInTheDocument()

    expect(screen.queryByText(/electronic/i)).toBeInTheDocument()
    expect(screen.queryByText(/furniture/i)).toBeInTheDocument()
    expect(screen.queryByText(/clothing/i)).toBeInTheDocument()
  })

  it('should exists the submit button', () => {
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument()
  })
})

describe('when the form inputs are changed', () => {
  it('should update the name field value on change', () => {
    render(<Form />)

    const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement

    act(() => {
      userEvent.type(nameInput, 'New product name')
    })

    expect(nameInput.value).toBe('New product name')
  })

  it('should update the size field value on change', () => {
    render(<Form />)

    const sizeInput = screen.getByLabelText(/size/i) as HTMLInputElement

    act(() => {
      userEvent.type(sizeInput, 'Small')
    })

    expect(sizeInput.value).toBe('Small')
  })

  it('should update the type field value on change', () => {
    render(<Form />)

    const typeInput = screen.getByLabelText(/type/i) as HTMLSelectElement

    act(() => {
      userEvent.selectOptions(typeInput, 'furniture')
    })

    expect(typeInput.value).toBe('furniture')
  })
})

describe('when the user submits the form without values', () => {
  it('should display validation messages', () => {
    render(<Form />)

    expect(screen.queryByText(/the name is required/i)).not.toBeInTheDocument()

    act(() => {
      userEvent.click(screen.getByRole('button', { name: /submit/i }))
    })

    expect(screen.queryByText(/the name is required/i)).toBeInTheDocument()
    expect(screen.queryByText(/the size is required/i)).toBeInTheDocument()
    expect(screen.queryByText(/the type is required/i)).toBeInTheDocument()
  })
})
