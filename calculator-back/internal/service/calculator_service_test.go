package service

import (
	"testing"

	"calculator-back/internal/domain"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestCalculatorService_Calculate_Add(t *testing.T) {
	service := NewCalculatorService()

	result, err := service.Calculate(domain.ADD, 2, 3)

	require.NoError(t, err)
	assert.Equal(t, 5.0, result)
}

func TestCalculatorService_Calculate_Subtract(t *testing.T) {
	service := NewCalculatorService()

	result, err := service.Calculate(domain.SUBTRACT, 5, 3)

	require.NoError(t, err)
	assert.Equal(t, 2.0, result)
}

func TestCalculatorService_Calculate_Multiply(t *testing.T) {
	service := NewCalculatorService()

	result, err := service.Calculate(domain.MULTIPLY, 4, 3)

	require.NoError(t, err)
	assert.Equal(t, 12.0, result)
}

func TestCalculatorService_Calculate_Divide(t *testing.T) {
	service := NewCalculatorService()

	result, err := service.Calculate(domain.DIVIDE, 10, 2)

	require.NoError(t, err)
	assert.Equal(t, 5.0, result)
}

func TestCalculatorService_Calculate_DivisionByZero(t *testing.T) {
	service := NewCalculatorService()

	result, err := service.Calculate(domain.DIVIDE, 10, 0)

	require.Error(t, err)
	assert.ErrorIs(t, err, ErrDivisionByZero)
	assert.Equal(t, 0.0, result)
}

func TestCalculatorService_Calculate_InvalidOperation(t *testing.T) {
	service := NewCalculatorService()

	result, err := service.Calculate(domain.Operation("invalid"), 10, 2)

	require.Error(t, err)
	assert.ErrorIs(t, err, ErrInvalidOperation)
	assert.Equal(t, 0.0, result)
}
