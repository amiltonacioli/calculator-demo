package main

import (
	"context"
	"time"

	httphandler "calculator-back/internal/handler"
	"calculator-back/internal/telemetry"
	"github.com/gin-gonic/gin"
	"github.com/go-logr/logr"
	"go.opentelemetry.io/otel/sdk/trace"
)

type appComponents struct {
	router   *gin.Engine
	logger   logr.Logger
	shutdown func(context.Context) error
}

func InitializeApp(ctx context.Context) (*gin.Engine, logr.Logger, func(context.Context) error, error) {
	app, err := initializeApp(ctx)
	if err != nil {
		return nil, logr.Logger{}, nil, err
	}

	return app.router, app.logger, app.shutdown, nil
}

func newAppComponents(router *gin.Engine, logger logr.Logger, shutdown func(context.Context) error) *appComponents {
	return &appComponents{
		router:   router,
		logger:   logger,
		shutdown: shutdown,
	}
}

type telemetryResources struct {
	tracerProvider *trace.TracerProvider
	shutdown       func(context.Context) error
}

func newTelemetryResources(ctx context.Context, serviceName string) (*telemetryResources, error) {
	tracerProvider, shutdown, err := telemetry.NewTracerProvider(ctx, serviceName)
	if err != nil {
		return nil, err
	}

	return &telemetryResources{
		tracerProvider: tracerProvider,
		shutdown:       shutdown,
	}, nil
}

func provideTracerProvider(resources *telemetryResources) *trace.TracerProvider {
	return resources.tracerProvider
}

func provideTelemetryShutdown(resources *telemetryResources) func(context.Context) error {
	return resources.shutdown
}

func newRouter(handler *httphandler.CalculatorHandler, logger logr.Logger, tracerProvider *trace.TracerProvider) *gin.Engine {
	router := gin.New()

	router.Use(
		gin.Recovery(),
		corsMiddleware(),
		requestLogger(logger),
		tracingMiddleware(tracerProvider),
	)

	handler.RegisterRoutes(router)

	router.NoRoute(func(c *gin.Context) {
		c.JSON(404, gin.H{"error": "not found"})
	})

	return router
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

		logger.Info(
			"request complete",
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
