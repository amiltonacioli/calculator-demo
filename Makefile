.PHONY: install dev web backend build test test-web test-back coverage coverage-web coverage-back up down logs rebuild

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

up:
	docker compose up

down:
	docker compose down

logs:
	docker compose logs -f

rebuild:
	docker compose up --build
