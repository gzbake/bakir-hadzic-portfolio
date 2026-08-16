# Run this script after installing Node.js and Git
# https://nodejs.org/  |  https://git-scm.com/

$ErrorActionPreference = "Stop"
$ProjectRoot = $PSScriptRoot

Set-Location $ProjectRoot

Write-Host "Installing dependencies..." -ForegroundColor Cyan
npm install

Write-Host "Building project..." -ForegroundColor Cyan
npm run build

Write-Host "Initializing git repository..." -ForegroundColor Cyan
if (-not (Test-Path ".git")) {
    git init
    git branch -M main
}

git add -A
git status

$commit = Read-Host "Create initial commit? (y/n)"
if ($commit -eq "y") {
    git commit -m "Initial commit: Bakir Hadzic premium portfolio website"
}

$push = Read-Host "Push to GitHub? (y/n)"
if ($push -eq "y") {
    $repoName = Read-Host "GitHub repo name (e.g. bakir-hadzic-portfolio)"
    gh repo create $repoName --public --source=. --remote=origin --push
    Write-Host "Done! Repository pushed to GitHub." -ForegroundColor Green
} else {
    Write-Host "To push manually:" -ForegroundColor Yellow
    Write-Host "  gh repo create bakir-hadzic-portfolio --public --source=. --remote=origin --push"
}

Write-Host "`nTo preview locally: npm run dev" -ForegroundColor Cyan
