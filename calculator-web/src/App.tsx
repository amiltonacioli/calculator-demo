import './App.css'

const operators = ['add', 'subtract', 'multiply', 'divide', 'power', 'sqrt', 'percentage']

function App() {
  return (
    <div className="app-shell">
      <section className="calculator-card">
        <h1>Calculator Demo Scaffold</h1>
        <p className="hint">
          This is the React scaffold for the calculator demo. The backend API and business logic are being wired next.
        </p>

        <div className="field-row">
          <label htmlFor="operandA">Operand A</label>
          <input id="operandA" type="text" placeholder="First value" disabled />
        </div>

        <div className="field-row">
          <label htmlFor="operandB">Operand B</label>
          <input id="operandB" type="text" placeholder="Second value" disabled />
        </div>

        <div className="operator-grid">
          {operators.map((operator) => (
            <button key={operator} type="button" className="operator" disabled>
              {operator}
            </button>
          ))}
        </div>

        <div className="actions">
          <button type="button" disabled>
            Calculate
          </button>
        </div>

        <div className="output-panel">
          <p className="hint">UI scaffold ready. Backend wiring and calculation logic will be added next.</p>
        </div>
      </section>
    </div>
  )
}

export default App
