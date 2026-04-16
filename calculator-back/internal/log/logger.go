package log

import (
	"log"
	"os"

	"github.com/go-logr/logr"
	"github.com/go-logr/stdr"
)

func NewStdLogger() logr.Logger {
	return stdr.New(log.New(os.Stdout, "", log.LstdFlags))
}
