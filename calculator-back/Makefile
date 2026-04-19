.PHONY: tidy run build test coverage coverage-report generate generate-mocks generate-wire docker-build

tidy:
	go mod tidy

run:
	go run .

build:
	go build -o server .

generate: generate-mocks generate-wire

generate-wire:
	go run -mod=mod github.com/google/wire/cmd/wire .

generate-mocks:
	go generate ./internal/service

test:
	go test ./...

coverage:
	go test -coverprofile=coverageprofile ./internal/domain ./internal/handler ./internal/service

coverage-report: coverage
	go tool cover -func=coverageprofile

docker-build:
	docker build -t calculator-back .
