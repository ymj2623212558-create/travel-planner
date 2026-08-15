@echo off
echo ========================================
echo  Travel Planner - 快速启动脚本
echo ========================================
echo.

:: Check if backend is already running
tasklist | findstr "uvicorn" >nul 2>&1
if %errorlevel%==0 (
    echo Backend server is already running!
) else (
    echo Starting backend server...
    start cmd /k "cd backend && uvicorn main:app --reload --port 8000"
    timeout /t 3 /nobreak >nul
)

echo.
echo Opening frontend in browser...
start "" http://localhost:5173
echo.
echo ========================================
echo ✅ Application started successfully!
echo - Frontend: http://localhost:5173
echo - API: http://localhost:8000/docs
echo ========================================

pause
