FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
RUN apt-get update && apt-get install -y curl
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY MinM_API/MinM_API.csproj ./MinM_API/
RUN dotnet restore ./MinM_API/MinM_API.csproj

COPY MinM_API/ ./MinM_API/
WORKDIR /src/MinM_API
RUN dotnet publish -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "MinM_API.dll"]
