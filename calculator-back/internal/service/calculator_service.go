package service

import (
	"errors"

	"calculator-back/internal/domain"
)

var (
	ErrDivisionByZero   = errors.New("division by zero")
	ErrInvalidOperation = errors.New("invalid operation")
)

type CalculatorService interface {
	Calculate(op domain.Operation, a float64, b float64) (float64, error)
}

type calculatorService struct{}

func NewCalculatorService() CalculatorService {
	return &calculatorService{}
}

func (s *calculatorService) Calculate(op domain.Operation, a float64, b float64) (float64, error) {
	switch op {
	case domain.ADD:
		return a + b, nil
	case domain.SUBTRACT:
		return a - b, nil
	case domain.MULTIPLY:
		return a * b, nil
	case domain.DIVIDE:
		if b == 0 {
			return 0, ErrDivisionByZero
		}

		return a / b, nil
	default:
		return 0, ErrInvalidOperation
	}
}
