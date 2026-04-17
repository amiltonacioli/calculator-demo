const binaryOperators = ['+', '-', '*', '/', '^', '%']

export function calculateExpression(expression: string): string {
  const input = expression.trim()

  if (!input) {
    return '0'
  }

  if (input.startsWith('√')) {
    return formatResult(squareRoot(input.slice(1)))
  }

  if (input.endsWith('√')) {
    return formatResult(squareRoot(input.slice(0, -1)))
  }

  if (input.endsWith('%')) {
    return formatResult(parseNumber(input.slice(0, -1)) / 100)
  }

  const operatorIndex = findOperatorIndex(input)
  if (operatorIndex === -1) {
    return formatResult(parseNumber(input))
  }

  const operator = input[operatorIndex]
  const left = parseNumber(input.slice(0, operatorIndex))
  const right = parseNumber(input.slice(operatorIndex + 1))

  if (Number.isNaN(left) || Number.isNaN(right)) {
    return 'Error'
  }

  switch (operator) {
    case '+':
      return formatResult(left + right)
    case '-':
      return formatResult(left - right)
    case '*':
      return formatResult(left * right)
    case '/':
      return right === 0 ? 'Error' : formatResult(left / right)
    case '^':
      return formatResult(Math.pow(left, right))
    case '%':
      return formatResult((left * right) / 100)
    default:
      return 'Error'
  }
}

function findOperatorIndex(input: string) {
  for (let index = 1; index < input.length; index += 1) {
    if (binaryOperators.includes(input[index])) {
      return index
    }
  }

  return -1
}

function squareRoot(value: string) {
  const number = parseNumber(value)

  if (Number.isNaN(number) || number < 0) {
    return Number.NaN
  }

  return Math.sqrt(number)
}

function parseNumber(value: string) {
  return Number(value)
}

function formatResult(value: number) {
  if (!Number.isFinite(value) || Number.isNaN(value)) {
    return 'Error'
  }

  return Number.isInteger(value) ? String(value) : String(Number(value.toFixed(10)))
}
