@echo off
setlocal
cd /d "%~dp0"
copy /Y "..\tribute_four.html" ".\public\tribute_four.html"
echo Updated public\tribute_four.html
