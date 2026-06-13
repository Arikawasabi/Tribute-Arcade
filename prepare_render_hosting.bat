@echo off
setlocal
cd /d "%~dp0"

echo.
echo Tribute Arcade Render hosting prep
echo ==================================
echo.

set "PACKAGE_DIR=%~dp0render_upload"
set "ZIP_PATH=%~dp0tribute_arcade_render_upload.zip"

if exist "%PACKAGE_DIR%" rmdir /s /q "%PACKAGE_DIR%"
mkdir "%PACKAGE_DIR%"

echo Copying hosting files...
copy /Y "%~dp0tribute_four.html" "%PACKAGE_DIR%\tribute_four.html" >nul
copy /Y "%~dp0multiplayer_server.js" "%PACKAGE_DIR%\multiplayer_server.js" >nul

> "%PACKAGE_DIR%\package.json" (
  echo {
  echo   "name": "tribute-arcade",
  echo   "version": "1.0.0",
  echo   "private": true,
  echo   "scripts": {
  echo     "start": "node multiplayer_server.js"
  echo   },
  echo   "engines": {
  echo     "node": ">=20"
  echo   }
  echo }
)

> "%PACKAGE_DIR%\README.md" (
  echo # Tribute Arcade
  echo.
  echo Render settings:
  echo.
  echo - Build Command: npm install
  echo - Start Command: npm start
  echo - Instance Type: Free
  echo.
  echo After Render deploys, open the Render URL and click Host Game.
)

if exist "%ZIP_PATH%" del /q "%ZIP_PATH%"

echo Creating zip package...
powershell -NoProfile -ExecutionPolicy Bypass -Command "Compress-Archive -Path '%PACKAGE_DIR%\*' -DestinationPath '%ZIP_PATH%' -Force"
if errorlevel 1 (
  echo Failed to create zip package.
  pause
  exit /b 1
)

echo.
echo Package ready:
echo %PACKAGE_DIR%
echo %ZIP_PATH%
echo.
echo Next:
echo 1. Create a GitHub repo.
echo 2. Upload the files from render_upload, or upload/extract the zip contents.
echo 3. Create a Render Web Service from that repo.
echo 4. Use Build Command: npm install
echo 5. Use Start Command: npm start
echo.
echo Opening GitHub and Render...
start "" "https://github.com/new"
start "" "https://dashboard.render.com/new/web"
start "" "%PACKAGE_DIR%"

pause
