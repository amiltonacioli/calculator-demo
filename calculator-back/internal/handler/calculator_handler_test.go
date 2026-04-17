package handler

import (
	"bytes"
	"net/http"
	"net/http/httptest"
	"testing"

	"calculator-back/internal/domain"
	"calculator-back/internal/mocks"
	"calculator-back/internal/service"
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
	"go.uber.org/mock/gomock"
)

func TestCalculatorHandler_Calculate_Success(t *testing.T) {
	gin.SetMode(gin.TestMode)

	ctrl := gomock.NewController(t)
	mockService := mocks.NewMockCalculatorService(ctrl)
	mockService.EXPECT().
		Calculate(domain.ADD, 10.0, 5.0).
		Return(15.0, nil)

	router := gin.New()
	NewCalculatorHandler(mockService).RegisterRoutes(router)

	request := httptest.NewRequest(http.MethodPost, "/calculate", bytes.NewBufferString(`{"operation":"ADD","a":10,"b":5}`))
	request.Header.Set("Content-Type", "application/json")
	response := httptest.NewRecorder()

	router.ServeHTTP(response, request)

	assert.Equal(t, http.StatusOK, response.Code)
	assert.JSONEq(t, `{"result":15}`, response.Body.String())
}

func TestCalculatorHandler_Calculate_InvalidOperation(t *testing.T) {
	gin.SetMode(gin.TestMode)

	ctrl := gomock.NewController(t)
	mockService := mocks.NewMockCalculatorService(ctrl)

	router := gin.New()
	NewCalculatorHandler(mockService).RegisterRoutes(router)

	request := httptest.NewRequest(http.MethodPost, "/calculate", bytes.NewBufferString(`{"operation":"INVALID","a":10,"b":5}`))
	request.Header.Set("Content-Type", "application/json")
	response := httptest.NewRecorder()

	router.ServeHTTP(response, request)

	assert.Equal(t, http.StatusBadRequest, response.Code)
	assert.JSONEq(t, `{"error":"invalid operation"}`, response.Body.String())
}

func TestCalculatorHandler_Calculate_ServiceError(t *testing.T) {
	gin.SetMode(gin.TestMode)

	ctrl := gomock.NewController(t)
	mockService := mocks.NewMockCalculatorService(ctrl)
	mockService.EXPECT().
		Calculate(domain.DIVIDE, 10.0, 0.0).
		Return(0.0, service.ErrDivisionByZero)

	router := gin.New()
	NewCalculatorHandler(mockService).RegisterRoutes(router)

	request := httptest.NewRequest(http.MethodPost, "/calculate", bytes.NewBufferString(`{"operation":"DIVIDE","a":10,"b":0}`))
	request.Header.Set("Content-Type", "application/json")
	response := httptest.NewRecorder()

	router.ServeHTTP(response, request)

	assert.Equal(t, http.StatusBadRequest, response.Code)
	assert.JSONEq(t, `{"error":"division by zero"}`, response.Body.String())
}
