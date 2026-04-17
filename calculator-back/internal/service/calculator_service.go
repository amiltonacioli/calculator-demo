package service

import (
	"errors"
	"math"

	"calculator-back/internal/domain"
)

var (
	ErrDivisionByZero   = errors.New("division by zero")
	ErrInvalidOperation = errors.New("invalid operation")
)

//go:generate mockgen -destination=../mocks/mock_calculator.go -package=mocks calculator-back/internal/service CalculatorService
type CalculatorService interface {
	Calculate(op domain.Operation, a float64, b float64) (float64, error)
}

type Request struct {
	Operation domain.Operation
	A         float64
	B         float64
}

type calculatorService struct {
	strategies map[domain.Operation]func(request Request) (float64, error)
}

func NewCalculatorService() CalculatorService {
	return &calculatorService{
		strategies: map[domain.Operation]func(request Request) (float64, error){
			domain.ADD:        add,
			domain.SUBTRACT:   subtract,
			domain.MULTIPLY:   multiply,
			domain.DIVIDE:     divide,
			domain.EXPONENT:   exponent,
			domain.SQRT:       squareRoot,
			domain.PERCENTAGE: percentage,
		},
	}
}

func (s *calculatorService) Calculate(op domain.Operation, a float64, b float64) (float64, error) {
	request := Request{
		Operation: op,
		A:         a,
		B:         b,
	}

	strategy, ok := s.strategies[request.Operation]
	if !ok {
		return 0, ErrInvalidOperation
	}

	return strategy(request)
}

func add(request Request) (float64, error) {
	return request.A + request.B, nil
}

func subtract(request Request) (float64, error) {
	return request.A - request.B, nil
}

func multiply(request Request) (float64, error) {
	return request.A * request.B, nil
}

func divide(request Request) (float64, error) {
	if request.B == 0 {
		return 0, ErrDivisionByZero
	}

	return request.A / request.B, nil
}

func exponent(request Request) (float64, error) {
	return math.Pow(request.A, request.B), nil
}

func squareRoot(request Request) (float64, error) {
	return math.Sqrt(request.A), nil
}

func percentage(request Request) (float64, error) {
	return (request.A * request.B) / 100, nil
}
