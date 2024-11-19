# POC APM TOOLS ( Apache SkyWalking )
POC service using Apache SkyWalking for tracing and logging provides a centralized observability solution that tracks distributed system interactions, monitors application performance, and gathers detailed telemetry data. Apache SkyWalking is an open-source, APM (Application Performance Management) and observability tool designed to help visualize, analyze, and monitor microservices and cloud-native architectures.

## NODEJS
- https://github.com/apache/skywalking-nodejs

Install SkyWalking NodeJS package from npmjs

    npm install --save skywalking-backend-js

Set up NodeJS Agent

    import agent from 'skywalking-backend-js'

    if (process.env.SW_AGENT_COLLECTOR_BACKEND_SERVICES) {
        agent.start()
    }

## GOLANG
- https://skywalking.apache.org/docs/skywalking-go/next/en/setup/gobuild/

Use go get to import the skywalking-go program.

    go get github.com/apache/skywalking-go

Also, import the module to your main package:

    import _ "github.com/apache/skywalking-go"


Using the SkyWalking Go provided image as the base image, perform file copying and other operations in the Dockerfile.

    # import the skywalking go base image
    FROM apache/skywalking-go:<version>-go<go version>

    # Copy application code
    COPY /path/to/project /path/to/project
    # Inject the agent into the project or get dependencies by application self
    RUN skywalking-go-agent -inject /path/to/project
    # Building the project including the agent
    RUN go build -toolexec="skywalking-go-agent" -a /path/to/project

    # More operations
    ...

#### Example Dockerfile

    # Stage 1: Build the Go application
    FROM apache/skywalking-go:0.5.0-go1.23 AS builder

    # Set environment variables
    ENV CGO_ENABLED=0 GOOS=linux GOARCH=amd64

    # Set working directory
    WORKDIR /app

    # Copy go.mod and go.sum files and download dependencies
    COPY go.mod go.sum ./
    RUN go mod download

    # Copy the entire application source code
    COPY . .

    # Inject the agent into the project or get dependencies by application self
    RUN skywalking-go-agent -inject .

    # Build the application
    RUN go build -toolexec="skywalking-go-agent" -a -o myapp .

    # Stage 2: Create a lightweight image with only the binary
    FROM alpine:latest

    # Set working directory
    WORKDIR /root/

    # Copy the binary from the builder stage
    COPY --from=builder /app/myapp .

    # Expose the port that your application will run on
    EXPOSE 8000

    # Command to run the application
    CMD ["./myapp"]


## DOTNET
- https://www.alibabacloud.com/help/en/opentelemetry/user-guide/reporting-net-application-data-through-skytalking?spm=a2c63.p38356.0.0.7ab31b4fvT6BG1

Install the .NET agent. Go to the root directory of the .NET project and run the following commands:

    # Install the .NET agent.
    dotnet add package SkyAPM.Agent.AspNetCore

Create the skyapm.json file in the root directory of the .NET project and copy the following content to the file:

    {
        "SkyWalking": {
            "ServiceName": "dotnet",
            "Logging": {
                "Level": "Information"
            },
            "Transport": {
                "Interval": 3000,
                "ProtocolVersion": "v8",
                "QueueSize": 30000,
                "BatchSize": 3000,
                "gRPC": {
                    "Servers": "oap:11800",
                    "Timeout": 100000,
                    "ConnectTimeout": 100000,
                    "ReportTimeout": 600000
                }
            }
        }
    }

# Getting Started
Change the ownership of the /data/elasticsearch-data directory to ensure it works with the Docker mount volume elasticsearch

- sudo chown -R 1000:1000 /data/elasticsearch-data

Start docker compose
- docker compose up -d --wait

Services
- NodeJS -> use express framework and winston logging
    - start with port 3000
    - GET /
    - GET /golang
- Golang -> use echo framework and zap logging
    - start with port 8000
    - GET /
    - GET /nodejs
- Donet -> MVC boilerplate
    - start with port 5072

Skywalking UI
- start with port 8080