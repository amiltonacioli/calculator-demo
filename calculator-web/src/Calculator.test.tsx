import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { Calculator } from './Calculator'

const rootSymbol = '\u221A'

describe('Calculator', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('renders calculator layout', () => {
    render(<Calculator />)

    expect(screen.getByRole('heading', { name: /calculator/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/calculator buttons/i)).toBeInTheDocument()
  })

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

    for (const button of ['+', '-', '*', '/', '^', rootSymbol, '%', '.', '=', 'C', '< del']) {
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

  it('updates result when equals is clicked', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ result: 15 }),
    } as Response)

    render(<Calculator />)

    fireEvent.click(screen.getByRole('button', { name: '7' }))
    fireEvent.click(screen.getByRole('button', { name: '+' }))
    fireEvent.click(screen.getByRole('button', { name: '8' }))
    fireEvent.click(screen.getByRole('button', { name: '=' }))

    await waitFor(() => {
      expect(screen.getByLabelText(/current input/i)).toHaveTextContent('15')
    })

    expect(fetch).toHaveBeenCalledWith('http://localhost:8080/calculate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        operation: 'ADD',
        a: 7,
        b: 8,
      }),
    })
  })

  it('shows loading state while calculating', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ result: 2 }),
    } as Response)

    render(<Calculator />)

    fireEvent.click(screen.getByRole('button', { name: '1' }))
    fireEvent.click(screen.getByRole('button', { name: '+' }))
    fireEvent.click(screen.getByRole('button', { name: '1' }))
    fireEvent.click(screen.getByRole('button', { name: '=' }))

    expect(screen.getByRole('button', { name: '...' })).toBeDisabled()

    await waitFor(() => {
      expect(screen.getByLabelText(/current input/i)).toHaveTextContent('2')
    })
  })

  it('shows API error response', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'backend error' }),
    } as Response)

    render(<Calculator />)

    fireEvent.click(screen.getByRole('button', { name: '7' }))
    fireEvent.click(screen.getByRole('button', { name: '+' }))
    fireEvent.click(screen.getByRole('button', { name: '8' }))
    fireEvent.click(screen.getByRole('button', { name: '=' }))

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('backend error')
    })
  })

  it('shows error for invalid input', () => {
    render(<Calculator />)

    fireEvent.click(screen.getByRole('button', { name: '7' }))
    fireEvent.click(screen.getByRole('button', { name: '+' }))
    fireEvent.click(screen.getByRole('button', { name: '+' }))

    expect(screen.getByRole('alert')).toHaveTextContent('Invalid input')
  })

  it('handles division by zero', () => {
    render(<Calculator />)

    fireEvent.click(screen.getByRole('button', { name: '7' }))
    fireEvent.click(screen.getByRole('button', { name: '/' }))
    fireEvent.click(screen.getByRole('button', { name: '0' }))

    expect(screen.getByRole('alert')).toHaveTextContent('Cannot divide by zero')
  })

  it('disables calculate button when invalid', () => {
    render(<Calculator />)

    fireEvent.click(screen.getByRole('button', { name: '7' }))
    fireEvent.click(screen.getByRole('button', { name: '+' }))
    fireEvent.click(screen.getByRole('button', { name: '+' }))

    expect(screen.getByRole('button', { name: '=' })).toBeDisabled()
  })

  it('does not show error for pending expression before equals is clicked', () => {
    render(<Calculator />)

    fireEvent.click(screen.getByRole('button', { name: '1' }))
    fireEvent.click(screen.getByRole('button', { name: '.' }))
    fireEvent.click(screen.getByRole('button', { name: '2' }))
    fireEvent.click(screen.getByRole('button', { name: '+' }))

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: '=' })).not.toBeDisabled()
  })

  it('shows error for pending expression after equals is clicked', () => {
    render(<Calculator />)

    fireEvent.click(screen.getByRole('button', { name: '1' }))
    fireEvent.click(screen.getByRole('button', { name: '.' }))
    fireEvent.click(screen.getByRole('button', { name: '2' }))
    fireEvent.click(screen.getByRole('button', { name: '+' }))
    fireEvent.click(screen.getByRole('button', { name: '=' }))

    expect(screen.getByRole('alert')).toHaveTextContent('Invalid input')
  })

  it('deletes the last character when delete is clicked', () => {
    render(<Calculator />)

    fireEvent.click(screen.getByRole('button', { name: '1' }))
    fireEvent.click(screen.getByRole('button', { name: '2' }))
    fireEvent.click(screen.getByRole('button', { name: '< del' }))

    expect(screen.getByLabelText(/current input/i)).toHaveTextContent('1')
  })

  it('deletes the last character when backspace is pressed', () => {
    render(<Calculator />)

    fireEvent.keyDown(window, { key: '4' })
    fireEvent.keyDown(window, { key: '5' })
    fireEvent.keyDown(window, { key: 'Backspace' })

    expect(screen.getByLabelText(/current input/i)).toHaveTextContent('4')
  })
})
