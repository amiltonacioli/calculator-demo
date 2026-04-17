.PHONY: install dev web backend build test test-web test-back coverage coverage-web coverage-back

install:
	cd calculator-web && npm install
	cd calculator-back && go mod tidy

dev: web

web:
	cd calculator-web && npm run dev

backend:
	cd calculator-back && go run .

build:
	cd calculator-web && npm run build

test: test-web test-back

test-web:
	cd calculator-web && npm test -- --run

test-back:
	cd calculator-back && go test ./...

coverage: coverage-web coverage-back

coverage-web:
	cd calculator-web && npm run test:coverage

coverage-back:
	cd calculator-back && go test -coverprofile=coverageprofile ./...
	cd calculator-back && go tool cover -func=coverageprofile
