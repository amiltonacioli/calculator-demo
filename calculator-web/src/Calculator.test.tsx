import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Calculator } from './Calculator'

describe('Calculator', () => {
  it('renders display', () => {
    render(<Calculator />)

    expect(screen.getByLabelText(/current input/i)).toHaveTextContent('0')
  })

  it('renders number buttons', () => {
    render(<Calculator />)

    for (const number of ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']) {
      expect(screen.getByRole('button', { name: number })).toBeInTheDocument()
    }
  })

  it('renders operator and action buttons', () => {
    render(<Calculator />)

    for (const button of ['+', '-', '*', '/', '^', '√', '%', '.', '=', 'C']) {
      expect(screen.getByRole('button', { name: button })).toBeInTheDocument()
    }
  })

  it('shows current input when buttons are pressed', () => {
    render(<Calculator />)

    fireEvent.click(screen.getByRole('button', { name: '7' }))
    fireEvent.click(screen.getByRole('button', { name: '+' }))
    fireEvent.click(screen.getByRole('button', { name: '8' }))

    expect(screen.getByLabelText(/current input/i)).toHaveTextContent('7+8')
  })

  it('shows current input when number keys are pressed', () => {
    render(<Calculator />)

    fireEvent.keyDown(window, { key: '1' })
    fireEvent.keyDown(window, { key: '.' })
    fireEvent.keyDown(window, { key: '2' })
    fireEvent.keyDown(window, { key: '3' })

    expect(screen.getByLabelText(/current input/i)).toHaveTextContent('1.23')
  })

  it('supports keyboard operators and clear', () => {
    render(<Calculator />)

    fireEvent.keyDown(window, { key: '9' })
    fireEvent.keyDown(window, { key: '^' })
    fireEvent.keyDown(window, { key: '2' })

    expect(screen.getByLabelText(/current input/i)).toHaveTextContent('9^2')

    fireEvent.keyDown(window, { key: 'Escape' })

    expect(screen.getByLabelText(/current input/i)).toHaveTextContent('0')
  })
})
