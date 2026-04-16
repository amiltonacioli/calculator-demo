package main

import (
	"context"
	"log"
	"time"
)

func main() {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	router, logger, shutdown, err := InitializeApp(ctx)
	if err != nil {
		log.Fatalf("failed to initialize app: %v", err)
	}

	logger.Info("starting calculator backend", "addr", ":8080")
	defer func() {
		if err := shutdown(context.Background()); err != nil {
			logger.Error(err, "failed to shutdown telemetry")
		}
	}()

	if err := router.Run(":8080"); err != nil {
		logger.Error(err, "server stopped")
	}
}
