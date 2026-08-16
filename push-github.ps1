# Push portfolio to GitHub — run once after GitHub login
$ErrorActionPreference = "Stop"
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
Set-Location $PSScriptRoot

$authStatus = gh auth status 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "GitHub login required. Opening browser..." -ForegroundColor Yellow
    Start-Process "https://github.com/login/device"
    gh auth login --web --git-protocol https
}

Write-Host "Creating GitHub repository and pushing..." -ForegroundColor Cyan
gh repo create bakir-hadzic-portfolio --public --source=. --remote=origin --push --description "Premium personal portfolio — Social Media Marketing & Digital Content Specialist"

if ($LASTEXITCODE -eq 0) {
    $url = gh repo view --json url -q .url
    Write-Host "Done! Repository: $url" -ForegroundColor Green
} else {
    Write-Host "Repo may already exist. Trying push..." -ForegroundColor Yellow
    git remote add origin https://github.com/bake2905/bakir-hadzic-portfolio.git 2>$null
    git push -u origin main
}
