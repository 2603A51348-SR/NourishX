@echo off
title NourishX - AI Nutrition Assistant
echo ========================================================
echo          Starting NourishX Nutrition Platform...
echo ========================================================
echo.

rem Check python
where python >nul 2>nul
if %errorlevel% equ 0 (
    python server.py
    goto end
)

rem Fallback to user AppData python if alias failed
if exist "%LOCALAPPDATA%\Programs\Python\Python314\python.exe" (
    "%LOCALAPPDATA%\Programs\Python\Python314\python.exe" server.py
    goto end
)

rem Direct browser open fallback if python not in path
echo Starting via default browser...
start "" "%~dp0index.html"

:end
pause
