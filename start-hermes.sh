#!/usr/bin/env bash

# 旅游规划 - Hermes 项目启动脚本
# 自动检测服务状态并启动

echo "======================================"
echo "  ✈️ 智能旅行规划师"
echo "======================================"
echo ""

# 检查前端是否运行
FRONTEND_PID=$(lsof -ti:3000 2>/dev/null || echo "")
if [ -z "$FRONTEND_PID" ]; then
    echo "🚀 启动前端服务..."
    cd "$(dirname "$0")/frontend"
    npm run dev &
    echo "✅ 前端已启动 (端口 3000)"
else
    echo "✅ 前端已在运行 (PID: $FRONTEND_PID)"
fi

# 检查后端是否运行
BACKEND_PID=$(lsof -ti:8000 2>/dev/null || echo "")
if [ -z "$BACKEND_PID" ]; then
    echo "🚀 启动后端服务..."
    cd "$(dirname "$0")/backend"
    uvicorn main:app --host 0.0.0.0 --port 8000 &
    echo "✅ 后端已启动 (端口 8000)"
else
    echo "✅ 后端已在运行 (PID: $BACKEND_PID)"
fi

sleep 3

echo ""
echo "======================================"
echo " 🌐 访问地址:"
echo "   → http://localhost:3000/itinerary"
echo "   → http://localhost:8000/docs"
echo "======================================"
echo ""
echo "🔧 按 Ctrl+C 停止所有服务"
echo ""
