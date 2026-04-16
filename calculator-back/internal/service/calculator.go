package service

import "context"

type Request struct {
	Operator string
	OperandA *float64
	OperandB *float64
}

type CalculatorService interface {
	Calculate(ctx context.Context, req Request) (float64, error)
}

type calculatorService struct{}

func NewCalculatorService() CalculatorService {
	return &calculatorService{}
}

func (s *calculatorService) Calculate(_ context.Context, _ Request) (float64, error) {
	return 0, nil
}
