//go:build wireinject
// +build wireinject

package main

import (
	"context"

	httphandler "calculator-back/internal/handler"
	"calculator-back/internal/log"
	"calculator-back/internal/service"

	"github.com/google/wire"
)

func initializeApp(ctx context.Context) (*appComponents, error) {
	wire.Build(
		log.NewStdLogger,
		newTelemetryResources,
		provideTracerProvider,
		provideTelemetryShutdown,
		service.NewCalculatorService,
		httphandler.NewCalculatorHandler,
		newRouter,
		newAppComponents,
		wire.Value("calculator-back"),
	)

	return nil, nil
}
