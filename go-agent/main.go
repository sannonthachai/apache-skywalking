package main

import (
	"fmt"
	"net/http"
	"time"

	"github.com/labstack/echo/v4"

	// This is an important step. DON'T MISS IT.
	_ "github.com/apache/skywalking-go"
)

func main() {
	e := echo.New()
	e.GET("/", func(c echo.Context) error {
		fmt.Printf("Method: Get, Path: '/', Date: %s", time.Now().Format("2006-01-02 15:04:05"))
		return c.String(http.StatusOK, "Hello, World!")
	})
	e.Logger.Fatal(e.Start(":8000"))
}
