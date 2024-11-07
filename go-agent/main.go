package main

import (
	"fmt"
	"io"
	"log"
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

	e.GET("/nodejs", func(c echo.Context) error {
		fmt.Printf("Method: Get, Path: '/nodejs', Date: %s", time.Now().Format("2006-01-02 15:04:05"))

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
