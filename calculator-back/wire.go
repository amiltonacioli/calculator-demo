//go:build wireinject
// +build wireinject

package main

import (
	"context"
	"time"

	"calculator-back/internal/handlers"
	"calculator-back/internal/log"
	"calculator-back/internal/service"
	"calculator-back/internal/telemetry"

	"github.com/gin-gonic/gin"
	"github.com/go-logr/logr"
	"github.com/google/wire"
	"go.opentelemetry.io/otel/sdk/trace"
)

func InitializeApp(ctx context.Context) (*gin.Engine, logr.Logger, func(context.Context) error, error) {
	wire.Build(
		log.NewStdLogger,
		telemetry.NewTracerProvider,
		service.NewCalculatorService,
		handlers.NewCalcHandler,
		newRouter,
		wire.Value("calculator-back"),
	)
	return nil, logr.Logger{}, nil, nil
}

func newRouter(handler *handlers.CalcHandler, logger logr.Logger, tracerProvider *trace.TracerProvider) *gin.Engine {
	r := gin.New()
	r.Use(gin.Recovery(), corsMiddleware(), requestLogger(logger), tracingMiddleware(tracerProvider))
	r.POST("/api/calc", handler.Handle)
	r.NoRoute(func(c *gin.Context) {
		c.JSON(404, gin.H{"error": "not found"})
	})
	return r
}

func corsMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	}
}

func requestLogger(logger logr.Logger) gin.HandlerFunc {
	return func(c *gin.Context) {
		start := time.Now()
		c.Next()
		logger.Info("request complete",
			"method", c.Request.Method,
			"path", c.FullPath(),
			"status", c.Writer.Status(),
			"duration", time.Since(start).String(),
		)
	}
}

func tracingMiddleware(tracerProvider *trace.TracerProvider) gin.HandlerFunc {
	tracer := tracerProvider.Tracer("calculator-back/http")
	return func(c *gin.Context) {
		ctx, span := tracer.Start(c.Request.Context(), c.FullPath())
		defer span.End()
		c.Request = c.Request.WithContext(ctx)
		c.Next()
	}
}
