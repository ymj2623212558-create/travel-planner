# 🧳 智能旅行规划师

基于 AI 的全栈旅行规划应用 —— 输入起终点和天数，AI 生成完整行程（每日时间线、费用明细、出行准备、实时天气/汇率）。

![Next.js](https://img.shields.io/badge/Next.js-14-black) ![FastAPI](https://img.shields.io/badge/FastAPI-Python-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-✅-blue)

---

## ✨ 功能特性

| 功能 | 说明 |
|------|------|
| 🌍 **全球城市搜索** | 国内 6,673 行政区 + 462 著名景区 + 全球 722 中文词条 + 156,282 英文城市 |
| 🤖 **AI 行程生成** | 每日 6 活动时间线（08:00-22:00）、主题化安排、兴趣驱动（美食/历史/自然/购物/文化/冒险）|
| 📖 **详情展开** | 每个活动可展开查看：介绍、游玩建议、推荐理由（AI 按需补全）|
| ✏️ **行程编辑** | 手动编辑活动（名称/时间/费用/描述）+ AI 调整（输入需求自动改行程）|
| 📤 **导出行程** | Markdown 复制 / 下载 .md / 打印存 PDF |
| 🎫 **官方门票价** | 140 个全球热门景点官方参考价（AI 估算自动覆盖）|
| 📝 **众包花费** | 用户报告实际花费，帮助后来者 |
| 🧳 **出行准备** | 24 国 + 34 省：证件/签证/货币/插头/健康/贴士 |
| 🌦️ **实时数据** | 天气（Open-Meteo）+ 汇率（Frankfurter），免费 API 双源互备 |
| 🕐 **历史记录** | localStorage 保存，随时回看/回填 |

## 🎨 视觉

多巴胺渐变（粉 #FF6B9D → 橙 #FFA62B → 黄），圆润卡片，极简 Apple 风。

---

## 🚀 本地运行

### 环境要求
- Node.js 18+
- Python 3.10+

### 1. 后端（FastAPI，端口 8000）

```bash
cd backend
pip install -r requirements.txt
# 配置 .env（见下方）
python main.py
```

### 2. 前端（Next.js，端口 3000）

```bash
cd frontend
npm install
npm run dev
```

打开 http://localhost:3000/itinerary

### 3. 配置 `backend/.env`

```env
API_KEY=你的OpenAI兼容API密钥
API_BASE=https://api.dogrouter.ai/v1
API_MODEL=deepseek-v4-flash
ENABLE_QUOTA=false
```

> 支持任何 OpenAI 兼容接口（DeepSeek / OpenAI / 通义 / 硅基流动等），URL + Key + 模型须同一服务商。

---

## 📁 项目结构

```
├── frontend/               # Next.js 14 前端
│   ├── pages/itinerary.tsx # 主页面（75KB，全部交互逻辑）
│   ├── components/         # 城市选择器、出行准备卡片
│   ├── data/               # 城市/地区/门票/出行准备数据
│   └── lib/                # 天气/汇率 API 层
└── backend/                # FastAPI 后端
    ├── main.py             # API 接口（生成/修改/详情/搜索）
    ├── ai_planner.py       # AI 生成（多模型回退 + 重试）
    ├── city_search.py      # 城市搜索
    ├── city_translations.py# 全球城市中英对照（722 条）
    ├── scenic_spots.py     # 国内景区映射（462 条）
    ├── ticket_prices.py    # 官方门票价（140 条）
    └── data/               # 城市数据（不入库，需单独下载）
```

---

## ⚠️ 注意

- **API Key 安全**：密钥只在后端 `.env`，从未提交到仓库，前端通过请求头转发
- **城市数据**：`backend/data/cities-all.json`（156MB）超 GitHub 单文件限制，不入库。如需完整数据请自行生成（见 `backend/city_search.py` 注释）

---

## 📜 License

MIT
