@echo off
title ✈️ 智能旅行规划师 - 项目管理器
chcp 65001 >nul
cls

======================================"
echo "  🗂️  旅游规划项目"
echo "======================================"
echo.

REM 检查前端服务
netstat -ano | findstr :3000 >nul
if %errorlevel%==0 (
    echo [✓] 前端服务已运行
) else (
    echo [🚀] 正在启动前端服务...
    start /min cmd /k "cd /d E:\ob存放\旅游规划\frontend ^&^& npm run dev"
    timeout /t 2 /nobreak >nul
    echo [✓] 服务已启动
)

echo.
echo ======================================
echo 🔗 访问地址:
echo    → 主界面：http://localhost:3000/itinerary
echo    → API 文档：http://localhost:8000/docs
echo ======================================
echo.

start http://localhost:3000/itinerary

echo.
echo ✅ 界面已打开!
echo 💡 提示：可以在 Hermes 的"主页→建立旅游规划项目"中找到这个对话记录
pause
