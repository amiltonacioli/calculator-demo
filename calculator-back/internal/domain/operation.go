package domain

type Operation string

const (
	ADD        Operation = "add"
	SUBTRACT   Operation = "subtract"
	MULTIPLY   Operation = "multiply"
	DIVIDE     Operation = "divide"
	EXPONENT   Operation = "exponent"
	SQRT       Operation = "sqrt"
	PERCENTAGE Operation = "percentage"
)

func (op Operation) IsValid() bool {
	switch op {
	case ADD, SUBTRACT, MULTIPLY, DIVIDE, EXPONENT, SQRT, PERCENTAGE:
		return true
	default:
		return false
	}
}
