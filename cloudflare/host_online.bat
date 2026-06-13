@echo off
setlocal
cd /d "%~dp0"

echo.
echo Tribute Arcade online deploy
echo =============================
echo.

if not exist "..\tribute_four.html" (
  echo Could not find ..\tribute_four.html
  pause
  exit /b 1
)

echo Updating hosted game file...
copy /Y "..\tribute_four.html" ".\public\tribute_four.html" >nul
if errorlevel 1 (
  echo Failed to update public\tribute_four.html
  pause
  exit /b 1
)

if not exist "node_modules\.bin\wrangler.cmd" (
  echo.
  echo Installing Cloudflare deploy tool. This only needs to happen once.
  call npm install
  if errorlevel 1 (
    echo npm install failed. Make sure Node.js is installed, then try again.
    pause
    exit /b 1
  )
)

echo.
echo Checking Cloudflare login...
call npx wrangler whoami >nul 2>nul
if errorlevel 1 (
  echo A browser window will open for Cloudflare login.
  call npx wrangler login
  if errorlevel 1 (
    echo Cloudflare login failed.
    pause
    exit /b 1
  )
)

echo.
echo Deploying Tribute Arcade...
call npm run deploy
if errorlevel 1 (
  echo Deploy failed.
  pause
  exit /b 1
)

echo.
echo Done. Open the workers.dev URL shown above, click Host Game, and copy the invite link.
pause
