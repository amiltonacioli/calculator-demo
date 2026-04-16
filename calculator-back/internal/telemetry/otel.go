package telemetry

import (
	"context"

	"go.opentelemetry.io/otel/sdk/trace"
)

func NewTracerProvider(ctx context.Context, serviceName string) (*trace.TracerProvider, func(context.Context) error, error) {
	// Scaffold: OpenTelemetry wiring is prepared here, but the exporter and tracing details
	// will be connected in the next implementation step.
	return trace.NewTracerProvider(), func(context.Context) error { return nil }, nil
}
