package handler

import (
	"net/http"
	"strings"

	"calculator-back/internal/domain"
	"calculator-back/internal/dto"
	"calculator-back/internal/service"
	"github.com/gin-gonic/gin"
)

type CalculatorHandler struct {
	service service.CalculatorService
}

func NewCalculatorHandler(service service.CalculatorService) *CalculatorHandler {
	return &CalculatorHandler{
		service: service,
	}
}

func (h *CalculatorHandler) RegisterRoutes(router gin.IRoutes) {
	router.POST("/calculate", h.Calculate)
}

func (h *CalculatorHandler) Calculate(c *gin.Context) {
	var request dto.CalculateRequest
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, dto.ErrorResponse{Error: err.Error()})
		return
	}

	operation := domain.Operation(strings.ToLower(request.Operation))
	if !operation.IsValid() {
		c.JSON(http.StatusBadRequest, dto.ErrorResponse{Error: service.ErrInvalidOperation.Error()})
		return
	}

	result, err := h.service.Calculate(operation, *request.A, *request.B)
	if err != nil {
		c.JSON(http.StatusBadRequest, dto.ErrorResponse{Error: err.Error()})
		return
	}

	c.JSON(http.StatusOK, dto.CalculateResponse{Result: result})
}
