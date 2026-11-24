$projectPath = $PSScriptRoot

# Move into project directory
Set-Location $projectPath

Write-Host "Starting Docker containers..." -ForegroundColor Green

# Start Docker Compose
docker compose up -d

if ($LASTEXITCODE -ne 0) {
    Write-Host "Failed to start Docker containers." -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "Opening VS Code..." -ForegroundColor Green

# Open project in a dedicated VS Code window
code --new-window --wait "$projectPath"

Write-Host "VS Code closed. Stopping Docker containers..." -ForegroundColor Yellow

# Stop Docker Compose
docker compose stop

Write-Host "Docker containers stopped." -ForegroundColor Green
