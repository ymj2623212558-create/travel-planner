#!/bin/bash

# 旅游规划项目快速启动脚本

echo "======================================"
echo "  Travel Planner - 启动服务"
echo "======================================"
echo ""

# 启动后端
echo "🚀 启动后端服务..."
cd "$(dirname "$0")/backend"
uvicorn main:app --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!

# 等待后端启动
sleep 3

# 启动前端
echo "🎨 启动前端服务..."
cd "$(dirname "$0")/frontend"
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ 所有服务已启动！"
echo ""
echo "访问地址："
echo "  - 前端主页：http://localhost:3000"
echo "  - API 文档：http://localhost:8000/docs"
echo ""
echo "按 Ctrl+C 停止所有服务"
echo "======================================"
