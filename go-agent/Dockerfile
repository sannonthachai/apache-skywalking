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

ENV SW_AGENT_REPORTER_GRPC_BACKEND_SERVICE="oap:11800"
ENV SW_AGENT_NAME="golang"
ENV SW_AGENT_INSTANCE_NAME="golang-$(openssl rand -hex 4)"

# Expose the port that your application will run on
EXPOSE 8000

# Command to run the application
CMD ["./myapp"]
