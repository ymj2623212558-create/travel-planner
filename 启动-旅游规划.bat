@echo off
title ✈️ 智能旅行规划师 - 启动器
cls

======================================"
echo "  ✈️ 智能旅行规划师"
echo "======================================"
echo.

REM 检查服务状态
netstat -ano | findstr :3000 >nul
if %errorlevel%==0 (
    echo [✓] 前端服务已运行
) else (
    echo [🚀] 正在启动前端...
    start cmd /k "cd /d E:\ob存放\旅游规划\frontend ^&^& npm run dev"
    timeout /t 3 /nobreak >nul
    echo [✓] 启动完成
)

echo.
echo [🌐] 正在打开浏览器...
start http://localhost:3000/itinerary

echo.
echo ======================================
echo ✅ 旅游规划已就绪!
echo   → 地址：http://localhost:3000/itinerary
echo   → API: http://localhost:8000/docs
echo ======================================
echo.
echo 关闭窗口将停止浏览，如需完全停止请关闭终端窗口
pause
