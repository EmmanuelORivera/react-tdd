import React from 'react'
import Loader from './Loader'
import { render, screen } from '@testing-library/react'

describe('Loader', () => {
  it('renders the loader component', () => {
    render(<Loader />)

    expect(screen.queryByRole('progressbar')).toBeInTheDocument()
  })

  it('should render with custom className', () => {
    render(<Loader className="custom-class" />)

    expect(screen.getByRole('progressbar')).toHaveClass('custom-class')
  })
})
