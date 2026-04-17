# Go Calculator API

A clean, testable HTTP calculator service built with Go and Gin. The API exposes calculator operations through a REST endpoint while keeping business logic isolated in the service layer.

## Features

Supported operations:

- `ADD`
- `SUBTRACT`
- `MULTIPLY`
- `DIVIDE`
- `EXPONENT`
- `SQRT`
- `PERCENTAGE`

## Tech Stack

- Go
- Gin
- Testify
- Gomock

## Project Structure

```text
.
├── cmd/
│   └── api/
│       └── main.go
├── internal/
│   ├── domain/
│   │   └── operation.go
│   ├── service/
│   │   └── calculator_service.go
│   ├── handler/
│   │   └── calculator_handler.go
│   ├── dto/
│   │   └── calculator.go
│   └── mocks/
│       └── mock_calculator.go
├── go.mod
├── go.sum
└── README.md
```

### Folder Responsibilities

- `cmd/api`: Application entrypoint.
- `internal/domain`: Core domain types, including calculator operation enums and validation.
- `internal/service`: Business logic and calculator service interface.
- `internal/handler`: HTTP handlers using Gin.
- `internal/dto`: Request and response payload definitions.
- `internal/mocks`: Generated mocks used by tests.

## Getting Started

### Prerequisites

- Go installed

### Installation

```bash
git clone <repo>
cd <repo>
go mod tidy
```

### Run the Application

from calculator-back folder

```bash
go run .
```

## API Usage

### Endpoint

```http
POST /calculate
```

### Example Request

```json
{
  "operation": "ADD",
  "a": 10,
  "b": 5
}
```

### Example curl

```bash
curl -X POST http://localhost:8080/calculate \
  -H "Content-Type: application/json" \
  -d '{"operation":"ADD","a":10,"b":5}'
```

### Example Response

```json
{
  "result": 15
}
```

## Error Handling

The API returns `400 Bad Request` for validation and calculation errors.

### Invalid Operation

```json
{
  "error": "invalid operation"
}
```

### Division by Zero

```json
{
  "error": "division by zero"
}
```

## Running Tests

```bash
go test ./...
```

## Generate Mocks

```bash
go generate ./...
```

This runs the `mockgen` directive and regenerates mocks for service interfaces used in handler tests.

## Future Improvements

- Add more operations
- Add observability with OpenTelemetry
- Add Docker support
