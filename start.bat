@echo off
echo ========================================
echo  Travel Planner - 快速启动脚本
echo ========================================
echo.

:: 检查后端是否运行
tasklist | findstr "uvicorn" >nul 2>&1
if %errorlevel%==0 (
    echo Backend server is already running!
) else (
    echo Starting backend server...
    start cmd /k "cd backend && uvicorn main:app --port 8000"
    timeout /t 3 /nobreak >nul
)

:: 检查前端是否运行
tasklist | findstr "next" >nul 2>&1
if %errorlevel%==0 (
    echo Frontend server is already running!
) else (
    echo Starting frontend server...
    start cmd /k "cd frontend && npm run dev"
    timeout /t 8 /nobreak >nul
)

echo.
echo Opening application in browser...
start "" http://localhost:3000/itinerary
echo.
echo ========================================
echo ✅ Application started successfully!
echo - Frontend: http://localhost:3000/itinerary
echo - API: http://localhost:8000/docs
echo ========================================
echo.
echo 首次使用前请先完成：
echo   1. cd backend ^&^& pip install -r requirements.txt
echo   2. copy .env.example .env ^&^& 填写 API Key
echo   3. cd frontend ^&^& npm install
echo ========================================

pause
