package main

import (
	"net/http"

	"github.com/labstack/echo/v4"

	// This is an important step. DON'T MISS IT.
	_ "github.com/apache/skywalking-go"
)

func main() {
	e := echo.New()
	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World!")
	})
	e.Logger.Fatal(e.Start(":8000"))
}
