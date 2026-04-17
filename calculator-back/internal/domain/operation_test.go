package domain

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestOperation_IsValid(t *testing.T) {
	tests := []struct {
		name     string
		operation Operation
		expected bool
	}{
		{"ADD is valid", ADD, true},
		{"SUBTRACT is valid", SUBTRACT, true},
		{"MULTIPLY is valid", MULTIPLY, true},
		{"DIVIDE is valid", DIVIDE, true},
		{"EXPONENT is valid", EXPONENT, true},
		{"SQRT is valid", SQRT, true},
		{"PERCENTAGE is valid", PERCENTAGE, true},
		{"invalid operation", Operation("invalid"), false},
		{"empty string", Operation(""), false},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			assert.Equal(t, tt.expected, tt.operation.IsValid())
		})
	}
}