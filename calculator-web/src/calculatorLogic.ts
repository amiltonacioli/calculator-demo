const binaryOperators = ['+', '-', '*', '/', '^', '%']
const rootOperator = '\u221A'

export function calculateExpression(expression: string): string {
  const error = validateExpression(expression)

  if (error) {
    return 'Error'
  }

  const input = expression.trim()

  if (input.startsWith(rootOperator)) {
    return formatResult(Math.sqrt(parseNumber(input.slice(1))))
  }

  const operatorIndex = findOperatorIndex(input)
  if (operatorIndex === -1) {
    return formatResult(parseNumber(input))
  }

  const operator = input[operatorIndex]
  const left = parseNumber(input.slice(0, operatorIndex))
  const right = parseNumber(input.slice(operatorIndex + 1))

  switch (operator) {
    case '+':
      return formatResult(left + right)
    case '-':
      return formatResult(left - right)
    case '*':
      return formatResult(left * right)
    case '/':
      return formatResult(left / right)
    case '^':
      return formatResult(Math.pow(left, right))
    case '%':
      return formatResult((left * right) / 100)
    default:
      return 'Error'
  }
}

export function validateExpression(expression: string): string | null {
  const input = expression.trim()

  if (!input || input === 'Error') {
    return 'Invalid input'
  }

  if (input.startsWith(rootOperator)) {
    const value = parseNumber(input.slice(1))

    if (Number.isNaN(value)) {
      return 'Invalid input'
    }

    if (value < 0) {
      return 'Cannot calculate square root of a negative number'
    }

    return null
  }

  const operatorIndex = findOperatorIndex(input)
  if (operatorIndex === -1) {
    return isValidNumber(input) ? null : 'Invalid input'
  }

  const operator = input[operatorIndex]
  const leftValue = input.slice(0, operatorIndex)
  const rightValue = input.slice(operatorIndex + 1)

  if (!isValidNumber(leftValue) || !isValidNumber(rightValue)) {
    return 'Invalid input'
  }

  const right = parseNumber(rightValue)

  if (operator === '/' && right === 0) {
    return 'Cannot divide by zero'
  }

  return null
}

function findOperatorIndex(input: string) {
  for (let index = 1; index < input.length; index += 1) {
    if (binaryOperators.includes(input[index])) {
      return index
    }
  }

  return -1
}

function parseNumber(value: string) {
  return value === '' ? Number.NaN : Number(value)
}

function isValidNumber(value: string) {
  return /^-?(?:\d+\.?\d*|\.\d+)$/.test(value)
}

function formatResult(value: number) {
  if (!Number.isFinite(value) || Number.isNaN(value)) {
    return 'Error'
  }

  return Number.isInteger(value) ? String(value) : String(Number(value.toFixed(10)))
}
