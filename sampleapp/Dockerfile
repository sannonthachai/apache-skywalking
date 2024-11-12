# Use the official .NET SDK image for building
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# Set the working directory in the container
WORKDIR /app

# Copy the .csproj file and restore dependencies
COPY *.csproj ./
RUN dotnet restore

# Copy the rest of the application files and build the app
COPY . ./
RUN dotnet publish -c Release -o out

# Use a runtime-only image for the final, smaller deployment image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime

# Set the working directory and copy the built application from the build stage
WORKDIR /app
COPY --from=build /app/out .

ENV ASPNETCORE_HOSTINGSTARTUPASSEMBLIES="SkyAPM.Agent.AspNetCore"

EXPOSE 8080
# Set the entrypoint to run the application
ENTRYPOINT ["dotnet", "sampleapp.dll"]
