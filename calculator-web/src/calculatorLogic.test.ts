import { describe, expect, it } from 'vitest'

import { calculateExpression, validateExpression } from './calculatorLogic'

const rootSymbol = '\u221A'

describe('calculateExpression', () => {
  it('adds numbers', () => {
    expect(calculateExpression('10+5')).toBe('15')
  })

  it('subtracts numbers', () => {
    expect(calculateExpression('10-5')).toBe('5')
  })

  it('multiplies numbers', () => {
    expect(calculateExpression('10*5')).toBe('50')
  })

  it('divides numbers', () => {
    expect(calculateExpression('10/5')).toBe('2')
  })

  it('handles division by zero', () => {
    expect(calculateExpression('10/0')).toBe('Error')
  })

  it('calculates exponentiation', () => {
    expect(calculateExpression('2^3')).toBe('8')
  })

  it('calculates square root', () => {
    expect(calculateExpression(`${rootSymbol}25`)).toBe('5')
  })

  it('calculates percentage of a number', () => {
    expect(calculateExpression('200%10')).toBe('20')
  })

  it('supports float numbers', () => {
    expect(calculateExpression('1.5+2.25')).toBe('3.75')
  })

  it('validates invalid input', () => {
    expect(validateExpression('10++5')).toBe('Invalid input')
  })

  it('validates division by zero', () => {
    expect(validateExpression('10/0')).toBe('Cannot divide by zero')
  })

  it('validates square root of a negative number', () => {
    expect(validateExpression(`${rootSymbol}-9`)).toBe(
      'Cannot calculate square root of a negative number',
    )
  })
})
