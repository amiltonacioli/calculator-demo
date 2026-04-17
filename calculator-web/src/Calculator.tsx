import { useEffect, useState } from 'react'
import './Calculator.css'

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
  '√',
  '1',
  '2',
  '3',
  '-',
  '%',
  '0',
  'C',
  '.',
  '+',
  '=',
]

export function Calculator() {
  const [currentInput, setCurrentInput] = useState('0')

  function handleButtonClick(value: string) {
    if (value === 'C') {
      setCurrentInput('0')
      return
    }

    if (value === '=') {
      return
    }

    setCurrentInput((previous) => (previous === '0' ? value : `${previous}${value}`))
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

      if (event.key === 'Escape' || event.key.toLowerCase() === 'c') {
        handleButtonClick('C')
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <main className="calculator-page">
      <section className="calculator-shell" aria-labelledby="calculator-title">
        <h1 id="calculator-title">Calculator</h1>

        <div className="calculator-display" role="status" aria-label="Current input">
          {currentInput}
        </div>

        <div className="calculator-grid" aria-label="Calculator buttons">
          {buttons.map((button, index) =>
            button ? (
              <button
                className="calculator-button"
                key={button}
                type="button"
                onClick={() => handleButtonClick(button)}
              >
                {button}
              </button>
            ) : (
              <span className="calculator-button-spacer" key={`spacer-${index}`} aria-hidden="true" />
            ),
          )}
        </div>
      </section>
    </main>
  )
}
