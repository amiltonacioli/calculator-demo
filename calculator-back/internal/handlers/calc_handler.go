package handlers

import (
	"net/http"

	"calculator-back/internal/service"
	"github.com/gin-gonic/gin"
	"github.com/go-logr/logr"
)

type CalcHandler struct {
	service service.CalculatorService
	logger  logr.Logger
}

func NewCalcHandler(service service.CalculatorService, logger logr.Logger) *CalcHandler {
	return &CalcHandler{
		service: service,
		logger:  logger,
	}
}

func (h *CalcHandler) Handle(c *gin.Context) {
	c.JSON(http.StatusNotImplemented, gin.H{
		"message": "calculator API scaffold: operation logic not implemented yet",
	})
}
