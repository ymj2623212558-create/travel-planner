# 🚀 智能旅行规划师 - 快速启动

## ✅ 当前状态

**前端服务**: 🟢 运行中 (端口 3000)  
**后端 API**: 🟢 运行中 (端口 8000)  

---

## 📍 立即访问你的项目

### 🎯 方式 1: 双击启动脚本（推荐） ⭐

在 Windows 资源管理器中打开 `E:\ob存放\旅游规划\`，然后：

```
双击文件 → 启动 - 旅游规划.bat
```

这会：
- ✅ 自动检查并启动前端服务
- ✅ 自动打开浏览器
- ✅ 直接跳转到 http://localhost:3000/itinerary

### 🔄 方式 2: Win+R 快捷命令

按键盘 `Win + R`，输入：

```
http://localhost:3000/itinerary
```

按回车键即可打开！

### 💻 方式 3: 命令行启动

```bash
cd E:/ob存放/旅游规划/frontend
npm run dev
```

然后在浏览器访问 http://localhost:3000/itinerary

---

## 🌐 完整地址列表

| 用途 | 地址 |
|------|------|
| **主应用界面** | http://localhost:3000/itinerary |
| **项目选择页** | http://localhost:3000/ |
| **后端 API 文档** | http://localhost:8000/docs |
| **Swagger UI** | http://localhost:8000/redoc |

---

## 📱 功能概览

### ✈️ 智能旅行规划师核心功能

**已实现：**
- 🏙️ **城市选择器**: 起点/终点 15 个城市可选
- 📅 **天数调节**: 1-30 天滑动控制
- 🎯 **兴趣标签**: 6 种分类切换 (历史🏛️/自然🌲/美食🍜/购物🛍️/文化🎭/冒险🧗)
- 💰 **花费估算**: 占位符模块待实现
- 🗺️ **路线优化**: 占位符模块待实现
- 🤖 **AI 行程生成**: 等待 OpenAI API 对接

### 🔮 即将实现：

- **Phase 2**: OpenAI API 真实对话 → AI 生成每日详细行程
- **Phase 3**: Mapbox GL JS 地图可视化 → 显示路线轨迹
- **Phase 4**: 费用计算引擎 → 机票/酒店/餐饮智能估算

---

## 🛠️ 开发维护

### 查看服务状态

```bash
netstat -ano | findstr "3000"
netstat -ano | findstr "8000"
```

### 重启服务

**前端:**
```bash
cd E:/ob存放/旅游规划/frontend
npm run dev
```

**后端:**
```bash
cd E:/ob存放/旅游规划/backend
uvicorn main:app --host 0.0.0.0 --port 8000
```

---

## 📂 项目位置

```
E:\ob存放\旅游规划\
├── backend/          # Python FastAPI 后端
├── frontend/         # Next.js 前端
└── .hermes/plans/    # Hermes 项目计划
```

---

## 💬 如何开始？

1. **确保服务正在运行**（如果停止，用上面方法重启）
2. **打开浏览器访问**: http://localhost:3000/itinerary
3. **选择起点和终点城市**
4. **拖动天数滑块调整**
5. **点击兴趣标签**
6. **等待 AI 生成功能实现后 → 生成完美行程！**

---

## 🎉 当前进度

- [x] 全栈架构搭建完成
- [x] UI 界面完全可用
- [x] Hermes 集成配置就绪
- [ ] AI 生成逻辑待实现

**下一步**: 对接 OpenAI API 实现真实的行程生成！

