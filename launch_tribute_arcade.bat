@echo off
setlocal
cd /d "%~dp0"

set "PORT=8770"
set "BUNDLED_NODE=C:\Users\tombe\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"

echo.
echo Tribute Arcade
echo ==============
echo.

if exist "%BUNDLED_NODE%" (
  set "NODE_EXE=%BUNDLED_NODE%"
) else (
  where node >nul 2>nul
  if errorlevel 1 (
    echo Node.js was not found.
    echo Install Node.js or run this from Codex where the bundled Node runtime exists.
    pause
    exit /b 1
  )
  set "NODE_EXE=node"
)

for /f "usebackq delims=" %%A in (`powershell -NoProfile -ExecutionPolicy Bypass -Command "$ip = Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.IPAddress -notlike '127.*' -and $_.IPAddress -notlike '169.254.*' -and $_.InterfaceOperationalStatus -eq 'Up' } | Sort-Object @{Expression={ if ($_.InterfaceAlias -match 'Wi-Fi|Ethernet') { 0 } else { 1 } }} | Select-Object -First 1 -ExpandProperty IPAddress; if (-not $ip) { $ip = '127.0.0.1' }; Write-Output $ip"`) do set "HOST_IP=%%A"
set "GAME_URL=http://%HOST_IP%:%PORT%/tribute_four.html"
set "LOCAL_URL=http://127.0.0.1:%PORT%/tribute_four.html"

echo Starting local multiplayer server on port %PORT%...
start "Tribute Arcade Server" /D "%~dp0" /min "%NODE_EXE%" multiplayer_server.js

echo Waiting for server...
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$url='%LOCAL_URL%';" ^
  "$ready=$false;" ^
  "for($i=0;$i -lt 40;$i++){" ^
  "  try{ $r=Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 1; if($r.StatusCode -eq 200){$ready=$true; break} }catch{}" ^
  "  Start-Sleep -Milliseconds 250" ^
  "}" ^
  "if(-not $ready){ exit 1 }"

if errorlevel 1 (
  echo Server did not respond. Check the server window for errors.
  pause
  exit /b 1
)

echo Opening game...
start "" "%GAME_URL%"

echo.
echo Game launched: %GAME_URL%
echo.
echo LAN address:   %GAME_URL%
echo Local address: %LOCAL_URL%
echo.
echo Use the LAN address/invite links only for PCs on the same network.
echo For a PC on another network, use launch_online_public.bat instead.
echo If same-network PCs still cannot connect, run allow_local_firewall.bat as administrator.
echo Leave the small server window open while playing online locally.
timeout /t 3 >nul
