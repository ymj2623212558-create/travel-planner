@echo off
chcp 65001 >nul
cls

======================================"
echo "  ✈️ 智能旅行规划师"
echo "======================================"
echo.

REM 检查端口占用
netstat -ano | findstr :3000 >nul 2>&1
if %errorlevel%==0 (
    echo [✓] 前端服务已在运行
) else (
    echo [🚀] 启动前端服务...
    start cmd /k "cd frontend ^&^& npm run dev"
    timeout /t 3 /nobreak >nul
    echo [✓] 前端已启动
    echo.
)

REM 自动打开浏览器
echo [🌐] 正在打开应用...
start http://localhost:3000/itinerary

echo.
echo ======================================
echo ✅ 旅游规划已启动!
echo   → 访问：http://localhost:3000/itinerary
echo   → API: http://localhost:8000/docs
echo ======================================
echo.
pause
