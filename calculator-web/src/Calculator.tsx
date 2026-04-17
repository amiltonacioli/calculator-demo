import { useEffect, useState } from 'react'
import './Calculator.css'
import { calculate } from './calculatorApi'
import { buildCalculateRequest, validateExpression } from './calculatorLogic'

const rootSymbol = '\u221A'

const buttons = [
  '7',
  '8',
  '9',
  '/',
  '^',
  '4',
  '5',
  '6',
  '*',
  rootSymbol,
  '1',
  '2',
  '3',
  '-',
  '%',
  'C',
  '0',
  '.',
  '+',
  '=',
]

export function Calculator() {
  const [currentInput, setCurrentInput] = useState('0')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const validationError = validateExpression(currentInput)
  const isPendingInput = isPendingExpression(currentInput)
  const visibleError = error || (!isPendingInput ? validationError : '')
  const isCalculateDisabled = isLoading || Boolean(validationError && !isPendingInput)

  async function handleButtonClick(value: string) {
    if (value === 'C') {
      setCurrentInput('0')
      setError('')
      return
    }

    if (value === '<') {
      setError('')
      setCurrentInput((previous) => (previous.length <= 1 ? '0' : previous.slice(0, -1)))
      return
    }

    if (value === '=') {
      const nextError = validateExpression(currentInput)

      if (nextError) {
        setError(nextError)
        return
      }

      try {
        setIsLoading(true)
        setError('')

        const result = await calculate(buildCalculateRequest(currentInput))

        setCurrentInput(String(result))
      } catch (nextError) {
        setError(nextError instanceof Error ? nextError.message : 'Failed to calculate')
      } finally {
        setIsLoading(false)
      }

      return
    }

    if (value === rootSymbol) {
      setError('')
      setCurrentInput((previous) => {
        if (previous === '0' || previous === 'Error') {
          return rootSymbol
        }

        if (previous === rootSymbol) {
          return previous
        }

        if (/^[0-9]+(?:\.[0-9]*)?$/.test(previous)) {
          return `${rootSymbol}${previous}`
        }

        return `${previous}${rootSymbol}`
      })
      return
    }

    setError('')
    setCurrentInput((previous) => {
      if (previous === '0' || previous === 'Error') {
        return value
      }

      return `${previous}${value}`
    })
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (/^[0-9]$/.test(event.key)) {
        handleButtonClick(event.key)
        return
      }

      if (['+', '-', '*', '/', '%', '=', '.'].includes(event.key)) {
        handleButtonClick(event.key)
        return
      }

      if (event.key === '^') {
        handleButtonClick('^')
        return
      }

      if (event.key === 'Enter') {
        handleButtonClick('=')
        return
      }

      if (event.key === 'Backspace') {
        handleButtonClick('<')
        return
      }

      if (event.key === 'Escape' || event.key.toLowerCase() === 'c') {
        handleButtonClick('C')
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [currentInput])

  return (
    <main className="calculator-page">
      <section className="calculator-shell" aria-labelledby="calculator-title">
        <h1 id="calculator-title">Calculator</h1>

        <div className="calculator-display" role="status" aria-label="Current input">
          {currentInput}
        </div>

        <div className="calculator-feedback">
          {visibleError && currentInput !== '0' ? (
            <p className="calculator-error" role="alert">
              {visibleError}
            </p>
          ) : (
            <span className="calculator-error-placeholder" aria-hidden="true" />
          )}

          <button
            className="calculator-delete-button"
            type="button"
            onClick={() => handleButtonClick('<')}
          >
            {'< del'}
          </button>
        </div>

        <div className="calculator-grid" aria-label="Calculator buttons">
          {buttons.map((button) => (
            <button
              className="calculator-button"
              disabled={button === '=' && isCalculateDisabled}
              key={button}
              type="button"
              onClick={() => handleButtonClick(button)}
            >
              {button === '=' && isLoading ? '...' : button}
            </button>
          ))}
        </div>
      </section>
    </main>
  )
}

function isPendingExpression(value: string) {
  return (
    /^-?(?:\d+\.?\d*|\.\d+)[+\-*/^%]$/.test(value) ||
    value === rootSymbol
  )
}
