package handler

import (
	"reflect"

	"calculator-back/internal/domain"
	"go.uber.org/mock/gomock"
)

type MockCalculatorService struct {
	ctrl     *gomock.Controller
	recorder *MockCalculatorServiceMockRecorder
}

type MockCalculatorServiceMockRecorder struct {
	mock *MockCalculatorService
}

func NewMockCalculatorService(ctrl *gomock.Controller) *MockCalculatorService {
	mock := &MockCalculatorService{ctrl: ctrl}
	mock.recorder = &MockCalculatorServiceMockRecorder{mock}
	return mock
}

func (m *MockCalculatorService) EXPECT() *MockCalculatorServiceMockRecorder {
	return m.recorder
}

func (m *MockCalculatorService) Calculate(op domain.Operation, a float64, b float64) (float64, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "Calculate", op, a, b)
	ret0, _ := ret[0].(float64)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

func (mr *MockCalculatorServiceMockRecorder) Calculate(op, a, b any) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "Calculate", reflect.TypeOf((*MockCalculatorService)(nil).Calculate), op, a, b)
}
