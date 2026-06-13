@echo off
setlocal

set "PORT=8770"

echo.
echo Tribute Arcade firewall helper
echo ==============================
echo.
echo This allows other PCs on your private network to reach the local game server.
echo If Windows asks for administrator permission, allow it.
echo.

net session >nul 2>nul
if errorlevel 1 (
  powershell -NoProfile -ExecutionPolicy Bypass -Command "Start-Process -FilePath '%~f0' -Verb RunAs"
  exit /b
)

netsh advfirewall firewall add rule name="Tribute Arcade Local Server" dir=in action=allow protocol=TCP localport=%PORT% profile=private
if errorlevel 1 (
  echo Failed to add firewall rule.
  pause
  exit /b 1
)

echo Firewall rule added for TCP port %PORT% on private networks.
pause
