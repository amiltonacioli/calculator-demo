# Calculator Demo

A full-stack calculator application with a React + TypeScript frontend and a Go backend microservice. The frontend calls the backend REST API to perform basic and advanced arithmetic operations.

## Features

- Calculator-style React UI with keyboard and button input
- Backend-powered calculations through a Go REST API
- Basic operations: addition, subtraction, multiplication, division
- Advanced operations: exponentiation, square root, percentage
- Input validation and user-facing error messages
- Responsive layout with mobile support
- Unit tests for frontend and backend layers

## Tech Stack

- Frontend: React, TypeScript, Vite, Vitest, React Testing Library
- Backend: Go, Gin, Google Wire, Testify, Gomock
- Architecture: domain, service, handler, dto, mocks

## Project Structure

```text
calculator-demo/
  calculator-back/      Go backend API
  calculator-web/       React frontend
  calculator-prompts/   Prompt history used during development
  Makefile              Root project commands
  README.md             Project documentation
```

## Prerequisites

- Go installed
- Node.js and npm installed
- Docker and Docker Compose installed, if running with containers
- `make` optional, because equivalent commands are listed below

## Setup

Install frontend dependencies:

```bash
npm install --prefix calculator-web
```

Prepare backend dependencies:

```bash
cd calculator-back
go mod tidy
```

## Run The App

Start the backend from the repository root:

```bash
cd calculator-back
go run .
```

The backend runs at:

```text
http://localhost:8080
```

Start the frontend from another terminal:

```bash
npm run dev --prefix calculator-web
```

The frontend runs at:

```text
http://localhost:5173
```

## Run With Docker

Build and start the full stack from the repository root:

```bash
docker compose up --build
```

Or use the Make target:

```bash
make rebuild
```

The Docker setup exposes:

```text
Frontend: http://localhost:3000
Backend:  http://localhost:8080
```

The frontend container serves the production Vite build with nginx and proxies API requests from `/api` to the backend service inside Docker Compose.

Common Docker commands:

```bash
docker compose up
docker compose down
docker compose logs -f
```

Equivalent Make targets:

```bash
make up
make down
make logs
```

## API Usage

Endpoint:

```http
POST /calculate
```

Example request:

```json
{
  "operation": "ADD",
  "a": 10,
  "b": 5
}
```

Example curl:

```bash
curl -X POST http://localhost:8080/calculate \
  -H "Content-Type: application/json" \
  -d '{"operation":"ADD","a":10,"b":5}'
```

Example response:

```json
{
  "result": 15
}
```

Error response example:

```json
{
  "error": "division by zero"
}
```

## Operations

- `ADD`: `a + b`
- `SUBTRACT`: `a - b`
- `MULTIPLY`: `a * b`
- `DIVIDE`: `a / b`
- `EXPONENT`: `a ^ b`
- `SQRT`: square root of `a`
- `PERCENTAGE`: percentage calculation using `a` and `b`

## Tests

Run frontend tests:

```bash
npm test -- --run --prefix calculator-web
```

Run backend tests:

```bash
cd calculator-back
go test ./...
```

Run all tests with Make:

```bash
make test
```

## Coverage

Run frontend coverage:

```bash
npm run test:coverage --prefix calculator-web
```

Run backend coverage:

```bash
cd calculator-back
go test -coverprofile=coverageprofile ./internal/domain ./internal/handler ./internal/service
go tool cover -func=coverageprofile
```

Run all coverage commands with Make:

```bash
make coverage
```

## Design Decisions

- The backend owns calculation behavior and exposes it through a thin HTTP handler.
- The frontend keeps parsing and validation close to the UI, then sends normalized API requests.
- The backend service uses a strategy map for operations, making new operations easy to add.
- Handler tests use Gomock so HTTP behavior can be tested without real service logic.
- Frontend API calls are isolated in `calculator-web/src/calculatorApi.ts` to keep the component testable.

## Prompt History

The prompts used during development are saved under:

```text
calculator-prompts/
```

## Future Improvements

- Add CI/CD with test and coverage checks
- Add a backend health endpoint
- Expand OpenTelemetry tracing and metrics
