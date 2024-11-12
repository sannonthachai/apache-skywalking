package main

import (
	"io"
	"log"
	"net/http"

	"github.com/labstack/echo/v4"
	"go.uber.org/zap"

	// This is an important step. DON'T MISS IT.
	_ "github.com/apache/skywalking-go"
)

func main() {
	e := echo.New()
	logger := zap.Must(zap.NewProduction())
	defer logger.Sync()

	e.GET("/", func(c echo.Context) error {
		logger.Info("Method: Get, Path: '/'")
		return c.String(http.StatusOK, "Hello, World!")
	})

	e.GET("/nodejs", func(c echo.Context) error {
		logger.Info("Method: Get, Path: '/nodejs'")

		resp, err := http.Get("http://nodejs:3000")
		if err != nil {
			log.Fatalln(err)
		}

		body, err := io.ReadAll(resp.Body)
		if err != nil {
			log.Fatalln(err)
		}

		return c.String(http.StatusOK, string(body))
	})

	e.Logger.Fatal(e.Start(":8000"))
}
