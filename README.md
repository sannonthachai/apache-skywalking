# POC APM TOOLS ( Apache SkyWalking )
POC service using Apache SkyWalking for tracing and logging provides a centralized observability solution that tracks distributed system interactions, monitors application performance, and gathers detailed telemetry data. Apache SkyWalking is an open-source, APM (Application Performance Management) and observability tool designed to help visualize, analyze, and monitor microservices and cloud-native architectures.

## NODEJS
- https://github.com/apache/skywalking-nodejs

## GOLANG
- https://skywalking.apache.org/docs/skywalking-go/next/en/setup/gobuild/

## DOTNET
- https://www.alibabacloud.com/help/en/opentelemetry/user-guide/reporting-net-application-data-through-skytalking?spm=a2c63.p38356.0.0.7ab31b4fvT6BG1

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