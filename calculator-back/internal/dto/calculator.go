package dto

type CalculateRequest struct {
	Operation string   `json:"operation" binding:"required"`
	A         *float64 `json:"a" binding:"required"`
	B         *float64 `json:"b" binding:"required"`
}

type CalculateResponse struct {
	Result float64 `json:"result"`
}

type ErrorResponse struct {
	Error string `json:"error"`
}
