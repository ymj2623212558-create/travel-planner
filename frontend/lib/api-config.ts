// 统一的 API 基础地址配置
// 单项目部署（前后端同源）：不设 NEXT_PUBLIC_API_URL → API_BASE 为空 → 请求 /api/...（无跨域）
// 本地开发：.env.local 设 NEXT_PUBLIC_API_URL=http://localhost:8000 覆盖
export const API_BASE = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/+$/, '');
