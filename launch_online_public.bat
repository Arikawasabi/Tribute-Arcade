@echo off
setlocal
cd /d "%~dp0"

echo.
echo Tribute Arcade public online launch
echo ===================================
echo.
echo This deploys the game to Cloudflare so invite links work across networks.
echo The first run will install Wrangler and ask you to log into Cloudflare.
echo.

call "%~dp0cloudflare\host_online.bat"
